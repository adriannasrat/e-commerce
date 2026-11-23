const { HttpError } = require('../http');
const { Cart, CartRow, Product } = require('../models');
const { inTransaction } = require('./transaction');

// A cart is the bag being filled. Placing an order removes it.
const findActiveCart = (userId) => Cart.findOne({ where: { user_id: userId } });

async function getOrCreateActiveCart(userId) {
  const existing = await findActiveCart(userId);
  if (existing) return existing;
  try {
    return await Cart.create({ user_id: userId });
  } catch (error) {
    // A parallel request created it first; the unique index kept it to one.
    if (error.name === 'SequelizeUniqueConstraintError') return findActiveCart(userId);
    throw error;
  }
}

// Changes lock the cart row, so they cannot land in a cart that is being ordered.
async function withActiveCart(userId, change) {
  const { id } = await getOrCreateActiveCart(userId);
  return inTransaction(async (transaction) => {
    const cart = await Cart.findOne({
      where: { id },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    if (!cart) throw new HttpError(409, 'This cart was just checked out');
    return change(cart, transaction);
  });
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
  // A retired product can still be removed, but not added or increased.
  if (amount > 0 && product.retired_at) {
    throw new HttpError(409, `${product.title} is no longer sold`);
  }
  if (amount > product.stock_quantity) {
    throw new HttpError(409, `Only ${product.stock_quantity} left in stock`);
  }
  await withActiveCart(userId, async (cart, transaction) => {
    if (amount === 0) {
      await CartRow.destroy({ where: { cart_id: cart.id, product_id: productId }, transaction });
    } else {
      await CartRow.upsert({ cart_id: cart.id, product_id: productId, amount }, { transaction });
    }
  });
  return getCart(userId);
}

// Takes the larger of the two amounts rather than their sum, so a repeated
// request after a lost response cannot double the cart. Stock caps the result.
async function mergeGuestItems(userId, items) {
  const valid = Array.isArray(items) && items.every(
    ({ product_id: id, amount }) => Number.isInteger(id) && Number.isInteger(amount) && amount > 0,
  );
  if (!valid) throw new HttpError(400, 'Items must list product_id and a positive amount');
  await withActiveCart(userId, (cart, transaction) => mergeItems(cart, items, transaction));
  return getCart(userId);
}

// Takes the larger of each item's amounts in the cart and in `items`, capped
// by stock. Retired products are left out.
async function mergeItems(cart, items, transaction) {
  for (const { product_id: productId, amount } of items) {
    const product = await Product.findByPk(productId, { transaction });
    if (!product || product.retired_at) continue;
    const row = await CartRow.findOne({ where: { cart_id: cart.id, product_id: productId }, transaction });
    const merged = Math.min(Math.max(amount, row ? row.amount : 0), product.stock_quantity);
    if (merged > 0) await CartRow.upsert({ cart_id: cart.id, product_id: productId, amount: merged }, { transaction });
    else if (row) await row.destroy({ transaction });
  }
}

module.exports = { getCart, mergeGuestItems, mergeItems, setItemAmount, withActiveCart };
