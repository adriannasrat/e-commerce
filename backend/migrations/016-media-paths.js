// Product images now live in the storefront's tracked /media folder, named
// after each model, instead of the local-only /local-preview folder.
const paths = {
  black: '/media/products/atlas.webp',
  silver: '/media/products/halo.webp',
  'form-05': '/media/products/tide.webp',
  'form-06': '/media/products/grove.webp',
  'pocket-05': '/media/products/pearl.webp',
  'pocket-06': '/media/products/pebble.webp',
  'pocket-07': '/media/products/prism.webp',
  'pocket-08': '/media/products/drift.webp',
};

module.exports = {
  up: async ({ context: sequelize }) => {
    for (const [slug, imageUrl] of Object.entries(paths)) {
      await sequelize.query('UPDATE Products SET imageUrl = :imageUrl WHERE slug = :slug', {
        replacements: { slug, imageUrl },
      });
    }
  },
};
