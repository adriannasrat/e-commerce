// Narrows the range to five over-ear and three in-ear models. Retired models
// leave every open cart, so nobody is left holding something they cannot buy,
// while paid carts keep them as history. Form 01 gets its new studio image.
const retired = ['form-04', 'form-07', 'in-ear-black', 'in-ear-white', 'in-ear-red', 'pocket-04'];

module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(
      'UPDATE Products SET retired_at = NOW() WHERE slug IN (:retired) AND retired_at IS NULL',
      { replacements: { retired } },
    );
    await sequelize.query(`DELETE r FROM CartRows r
      JOIN Carts c ON c.id = r.cart_id
      JOIN Products p ON p.id = r.product_id
      WHERE c.paid = 0 AND p.retired_at IS NOT NULL`);
    await sequelize.query(
      "UPDATE Products SET imageUrl = '/local-preview/form-01.webp' WHERE slug = 'black'",
    );
  },
};
