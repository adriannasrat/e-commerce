// An order remembers the Stripe Checkout session that collects its payment,
// so the webhook can match a payment to exactly one order.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query('ALTER TABLE Orders ADD COLUMN stripe_session_id VARCHAR(255) NULL');
    await sequelize.query('ALTER TABLE Orders ADD CONSTRAINT orders_stripe_session_unique UNIQUE (stripe_session_id)');
  },
};
