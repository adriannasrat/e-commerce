// Prices become whole öre, whatever numeric type the column had before.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query('ALTER TABLE Products ADD COLUMN price_ore INT NULL');
    await sequelize.query('UPDATE Products SET price_ore = ROUND(price * 100)');
    await sequelize.query('UPDATE Products SET stock_quantity = 0 WHERE stock_quantity IS NULL');
    await sequelize.query(`ALTER TABLE Products
      MODIFY price_ore INT NOT NULL,
      MODIFY stock_quantity INT NOT NULL DEFAULT 0,
      DROP COLUMN price,
      ADD CONSTRAINT products_price_ore_not_negative CHECK (price_ore >= 0),
      ADD CONSTRAINT products_stock_not_negative CHECK (stock_quantity >= 0)`);
  },
};
