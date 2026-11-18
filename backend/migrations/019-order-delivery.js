// An order records how it is delivered and what delivery cost, so its total is
// what the buyer was shown. Orders placed before this were delivered free.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query("ALTER TABLE Orders ADD COLUMN delivery VARCHAR(16) NOT NULL DEFAULT 'standard'");
    await sequelize.query('ALTER TABLE Orders ADD COLUMN delivery_ore INT NOT NULL DEFAULT 0');
    await sequelize.query("ALTER TABLE Orders ADD CONSTRAINT orders_delivery CHECK (delivery IN ('standard', 'express'))");
    await sequelize.query('ALTER TABLE Orders ADD CONSTRAINT orders_delivery_not_negative CHECK (delivery_ore >= 0)');
  },
};
