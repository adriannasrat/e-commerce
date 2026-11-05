const { QueryTypes } = require('sequelize');

// `active_user_id` is set only on unpaid carts, so its unique index lets the
// database guarantee one active cart per user while keeping any number of paid.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query('UPDATE Carts SET payed = 0 WHERE payed IS NULL');
    await sequelize.query('ALTER TABLE Carts CHANGE payed paid TINYINT(1) NOT NULL DEFAULT 0');

    const extras = await sequelize.query(
      `SELECT c.id AS extra, k.keep FROM Carts c
       JOIN (SELECT user_id, MAX(id) AS keep FROM Carts WHERE paid = 0 GROUP BY user_id) k
         ON c.user_id = k.user_id AND c.id <> k.keep
       WHERE c.paid = 0`,
      { type: QueryTypes.SELECT },
    );
    for (const { extra, keep } of extras) {
      const replacements = { extra, keep };
      await sequelize.query(
        `UPDATE CartRows kept JOIN CartRows other ON kept.product_id = other.product_id
         SET kept.amount = kept.amount + other.amount WHERE kept.cart_id = :keep AND other.cart_id = :extra`,
        { replacements },
      );
      await sequelize.query(
        `DELETE other FROM CartRows other JOIN CartRows kept ON kept.product_id = other.product_id
         WHERE kept.cart_id = :keep AND other.cart_id = :extra`,
        { replacements },
      );
      await sequelize.query('UPDATE CartRows SET cart_id = :keep WHERE cart_id = :extra', { replacements });
      await sequelize.query('DELETE FROM Carts WHERE id = :extra', { replacements });
    }

    await sequelize.query(`ALTER TABLE Carts
      ADD COLUMN active_user_id INT AS (IF(paid = 0, user_id, NULL)) VIRTUAL,
      ADD CONSTRAINT carts_one_active_per_user UNIQUE (active_user_id)`);
  },
};
