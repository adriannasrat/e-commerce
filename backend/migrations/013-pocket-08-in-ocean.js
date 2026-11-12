// Adds Pocket 08, the in-ear model in Ocean blue.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(
      `INSERT INTO Products (slug, title, finish_name, category, price_ore, tagline, description, imageUrl, stock_quantity, createdAt, updatedAt)
       VALUES ('pocket-08', 'Pocket 08', 'Ocean', 'in-ear', 149000, 'Deep blue, close to you.',
         'A deep Ocean finish from the buds to the case, for a little colour in every day.',
         '/local-preview/pocket-08.webp', 25, NOW(), NOW())`,
    );
  },
};
