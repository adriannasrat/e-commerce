const { HttpError } = require('../http');
const { Cart, CartRow, Product } = require('../models');

async function findActiveCart(userId) {
  return Cart.findOne({ where: { user_id: userId, payed: false } });
}

const toItem = ({ amount, Product: product }) => ({
  product_id: product.id,
  title: product.title,
  amount,
  price_ore: product.price_ore,
  imageUrl: product.imageUrl,
});

async function getCart(userId) {
  const cart = await findActiveCart(userId);
  if (!cart) return { id: null, items: [] };
  const rows = await CartRow.findAll({ where: { cart_id: cart.id }, include: [Product], order: [['id', 'ASC']] });
  return { id: cart.id, items: rows.map(toItem) };
}

async function setItemAmount(userId, productId, amount) {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new HttpError(400, 'Amount must be a whole number, zero or more');
  }
  const product = await Product.findByPk(productId);
  if (!product) throw new HttpError(404, 'Product not found');
  if (amount > product.stock_quantity) {
    throw new HttpError(409, `Only ${product.stock_quantity} left in stock`);
  }
  const cart = (await findActiveCart(userId)) || (await Cart.create({ user_id: userId, payed: false }));
  if (amount === 0) {
    await CartRow.destroy({ where: { cart_id: cart.id, product_id: productId } });
  } else {
    await CartRow.upsert({ cart_id: cart.id, product_id: productId, amount });
  }
  return getCart(userId);
}

module.exports = { getCart, setItemAmount };
