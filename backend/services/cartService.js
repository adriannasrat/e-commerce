const { Transaction } = require('sequelize');
const { HttpError } = require('../http');
const sequelize = require('../config/database');
const { Cart, CartRow, Product } = require('../models');

const findActiveCart = (userId) => Cart.findOne({ where: { user_id: userId, paid: false } });

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

// Row locks do the protecting here. A waiting lock must then see the latest
// committed row, which MariaDB's REPEATABLE READ refuses with error 1020.
const inTransaction = (work) =>
  sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED }, work);

// Changes lock the cart row, so they cannot land in a cart that is being paid.
async function withActiveCart(userId, change) {
  const { id } = await getOrCreateActiveCart(userId);
  return inTransaction(async (transaction) => {
    const cart = await Cart.findOne({
      where: { id, paid: false },
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
  await withActiveCart(userId, async (cart, transaction) => {
    for (const { product_id: productId, amount } of items) {
      const product = await Product.findByPk(productId, { transaction });
      if (!product || product.retired_at) continue;
      const row = await CartRow.findOne({ where: { cart_id: cart.id, product_id: productId }, transaction });
      const merged = Math.min(Math.max(amount, row ? row.amount : 0), product.stock_quantity);
      if (merged > 0) await CartRow.upsert({ cart_id: cart.id, product_id: productId, amount: merged }, { transaction });
      else if (row) await row.destroy({ transaction });
    }
  });
  return getCart(userId);
}

const toOrder = (cart, rows) => {
  const items = rows.map(({ amount, unit_price_ore: unitPriceOre, Product: product }) => ({
    product_id: product.id,
    title: product.title,
    amount,
    unit_price_ore: unitPriceOre,
  }));
  return {
    id: cart.id,
    paid: cart.paid,
    paid_at: cart.paid_at,
    total_ore: items.reduce((sum, item) => sum + item.amount * item.unit_price_ore, 0),
    items,
  };
};

const rowsWithProducts = (cartId, options) =>
  CartRow.findAll({ where: { cart_id: cartId }, include: [Product], order: [['id', 'ASC']], ...options });

// Stock, prices and the paid flag change together or not at all. Paying a paid
// cart returns the same order, so a repeated request cannot buy twice.
async function checkout(userId, cartId) {
  return inTransaction(async (transaction) => {
    const cart = await Cart.findOne({
      where: { id: cartId, user_id: userId },
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    if (!cart) throw new HttpError(404, 'Cart not found');
    if (cart.paid) return toOrder(cart, await rowsWithProducts(cart.id, { transaction }));

    const rows = await CartRow.findAll({ where: { cart_id: cart.id }, transaction });
    if (!rows.length) throw new HttpError(409, 'Your cart is empty');

    // Locking in id order keeps parallel checkouts from deadlocking.
    const products = await Product.findAll({
      where: { id: rows.map((row) => row.product_id) },
      order: [['id', 'ASC']],
      lock: transaction.LOCK.UPDATE,
      transaction,
    });
    for (const product of products) {
      const row = rows.find(({ product_id: id }) => id === product.id);
      if (product.retired_at) {
        throw new HttpError(409, `${product.title} is no longer sold. Remove it to check out`);
      }
      if (row.amount > product.stock_quantity) {
        throw new HttpError(409, `Only ${product.stock_quantity} of ${product.title} left in stock`);
      }
      await product.update({ stock_quantity: product.stock_quantity - row.amount }, { transaction });
      await row.update({ unit_price_ore: product.price_ore }, { transaction });
    }
    await cart.update({ paid: true, paid_at: new Date() }, { transaction });
    return toOrder(cart, await rowsWithProducts(cart.id, { transaction }));
  });
}

async function getOrders(userId) {
  const carts = await Cart.findAll({ where: { user_id: userId, paid: true }, order: [['paid_at', 'DESC']] });
  return Promise.all(carts.map(async (cart) => toOrder(cart, await rowsWithProducts(cart.id))));
}

module.exports = { checkout, getCart, getOrders, mergeGuestItems, setItemAmount };
