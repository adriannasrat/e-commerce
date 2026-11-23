const { once } = require('node:events');
const { Sequelize } = require('sequelize');
const { createMigrator } = require('../../migrator');
const { readEnvironment } = require('../../config/environment');

// These tests empty their database, so they refuse anything not named *_test.
const config = readEnvironment().database;
if (!config.database.endsWith('_test')) {
  throw new Error('Database tests need DB_NAME to end in _test');
}

// The tests never reach Stripe. Checkout sessions are recorded in memory, and
// webhook events are signed with this secret, so verification runs for real.
process.env.STRIPE_SECRET_KEY = 'sk_test_fake_key_for_tests';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_tests';
const fakeStripe = { sessions: new Map(), fail: false };
function useFakeStripe() {
  const { payments } = require('../../payments/stripe');
  payments.openCheckout = async ({ order, origin }) => {
    if (fakeStripe.fail) throw new Error('Stripe is down');
    const session = { id: `cs_test_${order.id}`, url: `https://checkout.stripe.test/${order.id}`, order, origin, open: true };
    fakeStripe.sessions.set(session.id, session);
    return session;
  };
  payments.checkoutUrl = async (id) => (fakeStripe.sessions.get(id)?.open ? fakeStripe.sessions.get(id).url : null);
  // A session marked `paid` was completed at Stripe and cannot be closed.
  payments.closeCheckout = async (id) => {
    const session = fakeStripe.sessions.get(id);
    if (session.paid) return false;
    session.open = false;
    return true;
  };
}

// A Stripe event for an order's session, signed as Stripe would sign it.
function stripeEvent(type, orderId, { paymentStatus = 'paid', sessionId = `cs_test_${orderId}` } = {}) {
  const Stripe = require('stripe');
  const event = {
    id: `evt_${type}_${orderId}`,
    type,
    data: { object: { id: sessionId, payment_status: paymentStatus, metadata: { order_id: String(orderId) } } },
  };
  const payload = JSON.stringify(event);
  const header = new Stripe(process.env.STRIPE_SECRET_KEY).webhooks.generateTestHeaderString({
    payload,
    secret: process.env.STRIPE_WEBHOOK_SECRET,
  });
  return { event, headers: { 'stripe-signature': header } };
}

async function resetDatabase() {
  const admin = new Sequelize({ ...config, database: undefined });
  await admin.query(`DROP DATABASE IF EXISTS \`${config.database}\``);
  await admin.query(`CREATE DATABASE \`${config.database}\``);
  await admin.close();
}

// One process per test file: reset first, before the app's pool has connected.
async function startApi(t) {
  await resetDatabase();
  const sequelize = require('../../config/database');
  await createMigrator(sequelize).up();
  useFakeStripe();
  const { API_PREFIX, createApp } = require('../../app');
  const server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}${API_PREFIX}`;
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await sequelize.close();
  });

  // A minimal cookie-keeping client, one per simulated visitor.
  return () => {
    let cookie = '';
    return async (method, url, body, headers = {}) => {
      const response = await fetch(base + url, {
        method,
        headers: { 'content-type': 'application/json', cookie, ...headers },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const set = response.headers.get('set-cookie');
      if (set) cookie = set.split(';')[0];
      const isJson = response.headers.get('content-type')?.includes('json');
      return { status: response.status, setCookie: set, body: isJson ? await response.json() : null };
    };
  };
}

module.exports = { config, fakeStripe, resetDatabase, startApi, stripeEvent };
