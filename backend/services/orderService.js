const { HttpError } = require('../http');
const { Cart, CartRow, Order, OrderLine, Product, ProductMedia } = require('../models');
const { payments } = require('../payments/stripe');
const { inTransaction } = require('./transaction');

// The server sets the price of delivery, never the request.
const DELIVERY_ORE = { standard: 0, express: 14900 };

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
  const subtotal = items.reduce((sum, item) => sum + item.amount * item.unit_price_ore, 0);
  return {
    id: order.id,
    status: order.status,
    placed_at: order.createdAt,
    paid_at: order.paid_at,
    delivery: order.delivery,
    delivery_ore: order.delivery_ore,
    subtotal_ore: subtotal,
    total_ore: subtotal + order.delivery_ore,
    items,
  };
};

const findOrder = (where, transaction) => Order.findOne({ where, include: [linesWithProducts], transaction });

// The bag's rows, or an order's lines, as product id → amount.
const contents = (rows) => new Map(rows.map((row) => [row.product_id, row.amount]));
const sameContents = (a, b) => a.size === b.size && [...a].every(([id, amount]) => b.get(id) === amount);

// Stock is reserved, prices are frozen and the bag gets a pending order,
// together or not at all. The bag itself stays until the payment goes
// through. While it is unchanged, a repeated request finds its open order, and
// once paid the bag is gone and the request finds the paid order, so nothing
// is ever bought twice.
async function reserveOrder(userId, cartId, delivery) {
  return inTransaction(async (transaction) => {
    const cart = await Cart.findOne({
      where: { id: cartId, user_id: userId },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    if (!cart) {
      const placed = await Order.findOne({
        where: { cart_id: cartId, user_id: userId },
        order: [['id', 'DESC']],
        transaction,
      });
      if (placed) return placed;
      throw new HttpError(404, 'Cart not found');
    }

    const rows = await CartRow.findAll({ where: { cart_id: cart.id }, transaction });
    if (!rows.length) throw new HttpError(409, 'Your cart is empty');

    const open = await Order.findOne({
      where: { cart_id: cart.id, status: 'pending' },
      include: [{ model: OrderLine, as: 'lines' }],
      transaction,
    });
    if (open) {
      if (open.delivery === delivery && sameContents(contents(open.lines), contents(rows))) return open;
      throw new HttpError(409, 'Your bag changed while its payment was open. Please try again.');
    }

    // Locking in id order keeps parallel orders from deadlocking.
    const products = await Product.findAll({
      where: { id: rows.map((row) => row.product_id) },
      order: [['id', 'ASC']],
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    const order = await Order.create(
      { user_id: userId, cart_id: cart.id, status: 'pending', delivery, delivery_ore: DELIVERY_ORE[delivery] },
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
    return order;
  });
}

// What the payment page shows for each line besides its name and price: the
// model's finish and tagline, and the path of its main picture.
async function describeItems(items) {
  const products = await Product.findAll({
    where: { id: items.map((item) => item.product_id) },
    include: [{ model: ProductMedia, as: 'media', where: { role: 'main' }, required: false }],
  });
  const byId = new Map(products.map((product) => [product.id, product]));
  return items.map((item) => {
    const product = byId.get(item.product_id);
    return {
      ...item,
      details: [product.finish_name, product.tagline].filter(Boolean).join(' · '),
      image: product.media[0]?.path,
    };
  });
}

// Payment is collected by Stripe Checkout, opened only after the order is
// committed: no payment call runs inside a database transaction. Only the
// webhook marks an order paid, never the visitor returning from Stripe.
async function placeOrder(userId, { cartId, delivery = 'standard' } = {}, origin) {
  if (!Number.isInteger(cartId)) throw new HttpError(400, 'cartId must be a cart id');
  if (!Object.hasOwn(DELIVERY_ORE, delivery)) throw new HttpError(400, 'delivery must be standard or express');
  // Checked first, so the bag stays as it is when payments are not set up.
  payments.assertReady();
  // A payment opened for a different bag or delivery is closed first.
  const open = await Order.findOne({
    where: { cart_id: cartId, user_id: userId, status: 'pending' },
    include: [{ model: OrderLine, as: 'lines' }],
  });
  if (open) {
    const rows = await CartRow.findAll({ where: { cart_id: cartId } });
    if (open.delivery !== delivery || !sameContents(contents(open.lines), contents(rows))) {
      await cancelPayment(userId, open.id);
    }
  }

  let { id } = await reserveOrder(userId, cartId, delivery);
  let placed = await Order.findByPk(id);
  if (placed.status === 'pending' && placed.stripe_session_id) {
    const url = await payments.checkoutUrl(placed.stripe_session_id);
    if (url) return { ...toOrder(await findOrder({ id })), checkout_url: url };
    // Its page has closed without a payment, so the bag gets a new order.
    await cancelPayment(userId, id);
    ({ id } = await reserveOrder(userId, cartId, delivery));
    placed = await Order.findByPk(id);
  }
  const order = toOrder(await findOrder({ id }));
  if (order.status !== 'pending') return order;
  let session;
  try {
    session = await payments.openCheckout({ order: { ...order, items: await describeItems(order.items) }, origin });
  } catch (error) {
    // Without a payment page the order could never be paid, so it is undone.
    await cancelOrder(id);
    if (error.status) throw error;
    throw new HttpError(502, 'Payment could not be started, so nothing was ordered. Please try again.');
  }
  await placed.update({ stripe_session_id: session.id });
  return { ...order, checkout_url: session.url };
}

// The payment page again, for an order whose visitor left Stripe unpaid.
async function resumePayment(userId, orderId) {
  const order = Number.isInteger(orderId) && await Order.findOne({ where: { id: orderId, user_id: userId } });
  if (!order) throw new HttpError(404, 'Order not found');
  const url = order.status === 'pending' && order.stripe_session_id
    ? await payments.checkoutUrl(order.stripe_session_id)
    : null;
  if (!url) throw new HttpError(409, 'This order can no longer be paid');
  return { checkout_url: url };
}

// Called for Stripe's confirmation. Repeats and late events change nothing.
async function markPaid(orderId, sessionId) {
  await inTransaction(async (transaction) => {
    const order = await Order.findOne({ where: { id: orderId }, lock: transaction.LOCK.UPDATE, transaction });
    if (!order || order.stripe_session_id !== sessionId || order.status !== 'pending') return;
    await order.update({ status: 'paid', paid_at: new Date() }, { transaction });
    // The bag has been bought, so it is emptied now and not before.
    await CartRow.destroy({ where: { cart_id: order.cart_id }, transaction });
    await Cart.destroy({ where: { id: order.cart_id, user_id: order.user_id }, transaction });
  });
}

// Cancels a pending order and puts its stock back on sale.
async function releaseOrder(order, transaction) {
  const lines = await OrderLine.findAll({ where: { order_id: order.id }, order: [['product_id', 'ASC']], transaction });
  for (const line of lines) {
    const product = await Product.findByPk(line.product_id, { lock: transaction.LOCK.UPDATE, transaction });
    await product.update({ stock_quantity: product.stock_quantity + line.amount }, { transaction });
  }
  await order.update({ status: 'cancelled' }, { transaction });
}

// An unpaid order is cancelled and its stock goes back on sale. Only a pending
// order is touched, so a paid order is never undone.
async function cancelOrder(orderId, sessionId) {
  await inTransaction(async (transaction) => {
    const order = await Order.findOne({ where: { id: orderId }, lock: transaction.LOCK.UPDATE, transaction });
    if (!order || order.status !== 'pending') return;
    if (sessionId && order.stripe_session_id !== sessionId) return;
    await releaseOrder(order, transaction);
  });
}

// The visitor stops paying. Stripe's page is closed first, outside any
// transaction, so it can no longer take a payment. Then the order is cancelled
// and its stock goes back on sale. The bag was never emptied, so it still
// holds everything. A paid order stays paid.
async function cancelPayment(userId, orderId) {
  const order = Number.isInteger(orderId) && await Order.findOne({ where: { id: orderId, user_id: userId } });
  if (!order) throw new HttpError(404, 'Order not found');
  if (order.status === 'paid') throw new HttpError(409, 'This order is already paid');
  if (order.status !== 'pending') return;
  if (order.stripe_session_id && !(await payments.closeCheckout(order.stripe_session_id))) {
    throw new HttpError(409, 'This order was just paid');
  }
  await cancelOrder(order.id);
}

// Every open payment of a visitor is closed, as when the bag changes, so a
// payment always matches the bag it was opened for.
async function cancelOpenPayments(userId) {
  const open = await Order.findAll({ where: { user_id: userId, status: 'pending' } });
  for (const order of open) await cancelPayment(userId, order.id);
}

async function getOrders(userId) {
  const orders = await Order.findAll({
    where: { user_id: userId },
    include: [linesWithProducts],
    order: [['createdAt', 'DESC'], ['id', 'DESC']],
  });
  return orders.map(toOrder);
}

async function getOrder(userId, orderId) {
  const order = Number.isInteger(orderId) && await findOrder({ id: orderId, user_id: userId });
  if (!order) throw new HttpError(404, 'Order not found');
  return toOrder(order);
}

module.exports = {
  cancelOpenPayments,
  cancelOrder,
  cancelPayment,
  getOrder,
  getOrders,
  markPaid,
  placeOrder,
  resumePayment,
};
