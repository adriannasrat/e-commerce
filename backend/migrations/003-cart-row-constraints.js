// Duplicate rows are merged and rows without a positive amount, which describe
// nothing in a cart, are removed before the database starts enforcing this.
const duplicates = `SELECT cart_id, product_id, SUM(amount) AS total, MIN(id) AS keep_id
  FROM CartRows GROUP BY cart_id, product_id HAVING COUNT(*) > 1`;

module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query('DELETE FROM CartRows WHERE amount <= 0');
    await sequelize.query(`UPDATE CartRows r JOIN (${duplicates}) d ON r.id = d.keep_id SET r.amount = d.total`);
    await sequelize.query(`DELETE r FROM CartRows r JOIN (${duplicates}) d
      ON r.cart_id = d.cart_id AND r.product_id = d.product_id AND r.id <> d.keep_id`);
    await sequelize.query(`ALTER TABLE CartRows
      ADD CONSTRAINT cart_rows_amount_positive CHECK (amount > 0),
      ADD CONSTRAINT cart_rows_cart_product_unique UNIQUE (cart_id, product_id)`);
  },
};
