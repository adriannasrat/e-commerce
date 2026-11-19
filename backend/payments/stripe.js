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

const payments = {
  assertReady() {
    stripe();
  },

  async openCheckout({ order, origin }) {
    const lineItems = order.items.map((item) => ({
      quantity: item.amount,
      price_data: { currency: 'sek', unit_amount: item.unit_price_ore, product_data: { name: item.title } },
    }));
    if (order.delivery_ore) {
      lineItems.push({
        quantity: 1,
        price_data: { currency: 'sek', unit_amount: order.delivery_ore, product_data: { name: 'Express delivery' } },
      });
    }
    const session = await stripe().checkout.sessions.create(
      {
        mode: 'payment',
        line_items: lineItems,
        client_reference_id: String(order.id),
        metadata: { order_id: String(order.id) },
        expires_at: Math.floor(Date.now() / 1000) + HOLD_MINUTES * 60,
        success_url: `${origin}/order/${order.id}?payment=done`,
        cancel_url: `${origin}/order/${order.id}`,
      },
      // A retried request for the same order gets the same session.
      { idempotencyKey: `order-${order.id}-checkout` },
    );
    return { id: session.id, url: session.url };
  },

  // The payment page of an unpaid order, or null once it has closed.
  async checkoutUrl(sessionId) {
    const session = await stripe().checkout.sessions.retrieve(sessionId);
    return session.status === 'open' ? session.url : null;
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

module.exports = { payments };
