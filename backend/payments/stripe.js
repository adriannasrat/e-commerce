const Stripe = require('stripe');
const { readEnvironment } = require('../config/environment');
const { HttpError } = require('../http');

// Stripe Checkout hosts the payment page, so card details never reach this
// site. Only this module talks to Stripe; tests replace its methods.
let client;
let clientKey;
function stripe() {
  const { secretKey } = readEnvironment().stripe;
  if (!secretKey) throw new HttpError(503, 'Payments are not set up yet');
  if (clientKey !== secretKey) {
    client = new Stripe(secretKey);
    clientKey = secretKey;
  }
  return client;
}

// Unpaid orders hold their stock this long. Stripe allows 30 minutes at least.
const HOLD_MINUTES = 31;

const TEST_MODE_NOTE =
  'Stripe runs in test mode, so no real card is charged. Pay with the test card 4242 4242 4242 4242, any future expiry date and any CVC.';

// What Stripe Checkout shows: every line at the price it was ordered at, with
// its finish and picture, delivery when it costs anything, and how to pay in
// test mode beside the pay button. Stripe fetches the pictures itself, so they
// are only sent from a public https address, never from localhost.
// When the order was placed. Both the hold and the idempotency key follow
// from it, so every request for one order is the same request to Stripe, and
// an order id reused after a database reset never meets an older key.
const placedAt = (order) => new Date(order.placed_at).getTime();

function checkoutParams({ order, origin }) {
  const picture = (path) => (path && origin.startsWith('https://') ? [`${origin}/media/${path}`] : undefined);
  const line = (name, unitAmount, quantity, description, images) => ({
    quantity,
    price_data: { currency: 'sek', unit_amount: unitAmount, product_data: { name, description, images } },
  });
  const lineItems = order.items.map((item) =>
    line(item.title, item.unit_price_ore, item.amount, item.details || undefined, picture(item.image)));
  if (order.delivery_ore) lineItems.push(line('Express delivery', order.delivery_ore, 1));
  return {
    mode: 'payment',
    line_items: lineItems,
    client_reference_id: String(order.id),
    metadata: { order_id: String(order.id) },
    custom_text: { submit: { message: TEST_MODE_NOTE } },
    expires_at: Math.floor(placedAt(order) / 1000) + HOLD_MINUTES * 60,
    success_url: `${origin}/order/${order.id}?payment=done`,
    cancel_url: `${origin}/order/${order.id}`,
  };
}

const payments = {
  assertReady() {
    stripe();
  },

  async openCheckout({ order, origin }) {
    const session = await stripe().checkout.sessions.create(
      checkoutParams({ order, origin }),
      // A retried request for the same order gets the same session.
      { idempotencyKey: `order-${order.id}-${placedAt(order)}` },
    );
    return { id: session.id, url: session.url };
  },

  // The payment page of an unpaid order, or null once it has closed.
  async checkoutUrl(sessionId) {
    const session = await stripe().checkout.sessions.retrieve(sessionId);
    return session.status === 'open' ? session.url : null;
  },

  // Closes an unpaid order's payment page, so it can no longer take a payment.
  // False when Stripe has already completed it.
  async closeCheckout(sessionId) {
    try {
      await stripe().checkout.sessions.expire(sessionId);
      return true;
    } catch (error) {
      // Only an open page can be expired; a closed one says how it ended.
      const { status } = await stripe().checkout.sessions.retrieve(sessionId);
      if (status === 'expired') return true;
      if (status === 'complete') return false;
      throw error;
    }
  },

  // Only events signed with the webhook secret are trusted.
  readEvent(rawBody, signature) {
    const { webhookSecret } = readEnvironment().stripe;
    if (!webhookSecret) throw new HttpError(503, 'Payments are not set up yet');
    try {
      return stripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      if (error.status) throw error;
      throw new HttpError(400, 'Invalid signature');
    }
  },
};

module.exports = { checkoutParams, payments };
