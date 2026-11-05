// A completed purchase keeps the price it was bought at. Carts paid before this
// have no record of that, so they get the current price and last update time.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query('ALTER TABLE CartRows ADD COLUMN unit_price_ore INT NULL');
    await sequelize.query('ALTER TABLE Carts ADD COLUMN paid_at DATETIME NULL');
    await sequelize.query('UPDATE Carts SET paid_at = updatedAt WHERE paid = 1');
    await sequelize.query(`UPDATE CartRows r
      JOIN Carts c ON c.id = r.cart_id
      JOIN Products p ON p.id = r.product_id
      SET r.unit_price_ore = p.price_ore
      WHERE c.paid = 1`);
  },
};
