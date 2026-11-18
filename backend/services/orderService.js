const { HttpError } = require('../http');
const { Cart, CartRow, Order, OrderLine, Product } = require('../models');
const { inTransaction } = require('./transaction');

const linesWithProducts = { model: OrderLine, as: 'lines', include: [Product] };

const toOrder = (order) => {
  const items = [...order.lines]
    .sort((a, b) => a.id - b.id)
    .map(({ amount, unit_price_ore: unitPriceOre, Product: product }) => ({
      product_id: product.id,
      title: product.title,
      amount,
      unit_price_ore: unitPriceOre,
    }));
  return {
    id: order.id,
    status: order.status,
    paid_at: order.paid_at,
    total_ore: items.reduce((sum, item) => sum + item.amount * item.unit_price_ore, 0),
    items,
  };
};

const findOrder = (where, transaction) => Order.findOne({ where, include: [linesWithProducts], transaction });

// Stock, prices and the order are written together or not at all, and the
// cart goes with them. A repeated request for the same cart then finds its
// order, so it cannot buy twice. This demo takes no payment, so an order is
// paid as soon as it is placed.
async function placeOrder(userId, cartId) {
  if (!Number.isInteger(cartId)) throw new HttpError(400, 'cartId must be a cart id');
  return inTransaction(async (transaction) => {
    const cart = await Cart.findOne({
      where: { id: cartId, user_id: userId },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    if (!cart) {
      const placed = await findOrder({ cart_id: cartId, user_id: userId }, transaction);
      if (placed) return toOrder(placed);
      throw new HttpError(404, 'Cart not found');
    }

    const rows = await CartRow.findAll({ where: { cart_id: cart.id }, transaction });
    if (!rows.length) throw new HttpError(409, 'Your cart is empty');

    // Locking in id order keeps parallel orders from deadlocking.
    const products = await Product.findAll({
      where: { id: rows.map((row) => row.product_id) },
      order: [['id', 'ASC']],
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    const order = await Order.create(
      { user_id: userId, cart_id: cart.id, status: 'paid', paid_at: new Date() },
      { transaction },
    );
    for (const product of products) {
      const row = rows.find(({ product_id: id }) => id === product.id);
      if (product.retired_at) {
        throw new HttpError(409, `${product.title} is no longer sold. Remove it to check out`);
      }
      if (row.amount > product.stock_quantity) {
        throw new HttpError(409, `Only ${product.stock_quantity} of ${product.title} left in stock`);
      }
      await product.update({ stock_quantity: product.stock_quantity - row.amount }, { transaction });
      await OrderLine.create(
        { order_id: order.id, product_id: product.id, amount: row.amount, unit_price_ore: product.price_ore },
        { transaction },
      );
    }
    await CartRow.destroy({ where: { cart_id: cart.id }, transaction });
    await cart.destroy({ transaction });
    return toOrder(await findOrder({ id: order.id }, transaction));
  });
}

async function getOrders(userId) {
  const orders = await Order.findAll({
    where: { user_id: userId },
    include: [linesWithProducts],
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
  });
  return orders.map(toOrder);
}

module.exports = { getOrders, placeOrder };
