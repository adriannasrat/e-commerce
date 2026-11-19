const { payments } = require('../payments/stripe');
const { cancelOrder, markPaid } = require('../services/orderService');

// Stripe reports each payment here. The signature proves the event came from
// Stripe, and the session id must match the order it names. A failure answers
// with an error status so Stripe sends the event again.
async function handlePaymentWebhook(req, res) {
  const event = payments.readEvent(req.body, req.get('stripe-signature'));
  const session = event.data.object;
  const orderId = Number(session.metadata?.order_id);
  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
      if (session.payment_status === 'paid') await markPaid(orderId, session.id);
      break;
    case 'checkout.session.expired':
    case 'checkout.session.async_payment_failed':
      await cancelOrder(orderId, session.id);
      break;
    default:
      break;
  }
  res.json({ received: true });
}

module.exports = { handlePaymentWebhook };
