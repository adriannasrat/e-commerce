// Pocket 05 is now shown in white, so its finish and copy follow the new image.
module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(
      `UPDATE Products
       SET finish_name = 'Chalk',
           imageUrl = '/local-preview/pocket-05.webp',
           description = 'A clean, minimal everyday pair in Chalk. Light, compact and easy to live with.'
       WHERE slug = 'pocket-05'`,
    );
  },
};
