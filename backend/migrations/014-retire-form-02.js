// Retires Form 02. Like earlier retirements, it leaves every open cart while
// paid carts keep it as history.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(
      "UPDATE Products SET retired_at = NOW() WHERE slug = 'white' AND retired_at IS NULL",
    );
    await sequelize.query(`DELETE r FROM CartRows r
      JOIN Carts c ON c.id = r.cart_id
      JOIN Products p ON p.id = r.product_id
      WHERE c.paid = 0 AND p.slug = 'white'`);
  },
};
