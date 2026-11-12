// A retired product leaves the catalogue and can no longer be bought, but stays
// in the table so past purchases keep their lines. The original flowers were
// never sold in this store, so they are retired from the start.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query('ALTER TABLE Products ADD COLUMN retired_at DATETIME NULL');
    await sequelize.query('UPDATE Products SET retired_at = NOW() WHERE category IS NULL');
  },
};
