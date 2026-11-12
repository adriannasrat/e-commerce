// Gives every model in the range its own name. The series, Form for over-ear
// and Pocket for in-ear, is shown beside the name rather than inside it.
const names = {
  black: 'Atlas',
  silver: 'Halo',
  'form-05': 'Tide',
  'form-06': 'Grove',
  'pocket-05': 'Pearl',
  'pocket-06': 'Pebble',
  'pocket-07': 'Prism',
  'pocket-08': 'Drift',
};

module.exports = {
  up: async ({ context: sequelize }) => {
    for (const [slug, title] of Object.entries(names)) {
      await sequelize.query('UPDATE Products SET title = :title WHERE slug = :slug', {
        replacements: { slug, title },
      });
    }
  },
};
