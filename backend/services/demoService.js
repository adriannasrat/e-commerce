const { randomBytes } = require('node:crypto');
const { hashPassword } = require('../auth/password');
const sequelize = require('../config/database');
const { User } = require('../models');
const { cancelOpenPayments } = require('./orderService');

// The stock every model starts each day with.
const DEMO_STOCK = 25;

// Each visitor gets an account of their own, so no two share a bag or orders.
// The password is random and never shown: the session is the only way in.
async function createDemoUser() {
  const name = randomBytes(6).toString('hex');
  const password = await hashPassword(randomBytes(32).toString('hex'));
  return User.create({ email: `demo-${name}@resonance.test`, password });
}

const isDemoUser = (user) => /^demo-[a-f0-9]+@resonance\.test$/.test(user.email);

// A demo account lasts one visit. Signing out closes its open payments, which
// puts their stock back on sale, then removes the account with its bag, orders
// and sessions, so the next visit starts fresh.
async function removeDemoUser(user) {
  if (!isDemoUser(user)) return;
  await cancelOpenPayments(user.id);
  await User.destroy({ where: { id: user.id } });
}

// Removes everything visitors have created and refills the stock, so each day
// starts as the first did.
async function resetDemoData() {
  await sequelize.transaction(async (transaction) => {
    for (const table of ['Sessions', 'Ratings', 'OrderLines', 'Orders', 'CartRows', 'Carts', 'Users']) {
      await sequelize.query(`DELETE FROM ${table}`, { transaction });
    }
    await sequelize.query('UPDATE Products SET stock_quantity = :stock WHERE category IS NOT NULL', {
      replacements: { stock: DEMO_STOCK },
      transaction,
    });
  });
}

module.exports = { DEMO_STOCK, createDemoUser, removeDemoUser, resetDemoData };
