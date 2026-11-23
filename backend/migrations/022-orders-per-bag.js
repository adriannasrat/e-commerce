// The bag now stays until its order is paid, so a bag whose payment was
// cancelled or expired can check out again with a new order. A bag may have
// many orders over time, and the code keeps it to one open order at a time.
// Each statement changes one thing, which TiDB requires.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query('CREATE INDEX orders_cart ON Orders (cart_id)');
    await sequelize.query('ALTER TABLE Orders DROP INDEX orders_cart_unique');
  },
};
