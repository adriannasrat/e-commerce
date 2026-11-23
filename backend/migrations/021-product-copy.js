// Clearer copy where it was vague or wrong. Atlas and Halo say what they are
// made of, and the over-ear film names the finish it actually shows: Graphite,
// not a Titanium finish that is not in the range.
const copy = {
  black: {
    description: 'Brushed graphite cups and a soft woven cushion. Our signature over-ear, made for long listening.',
  },
  silver: {
    tagline: 'Bright metal, quiet focus.',
    description: 'Polished silver cups and a padded band. A bold finish that still sits lightly through a long day.',
  },
};

const FILM_ALT = 'Over-ear headphones in a dark graphite finish turning slowly in the air.';

module.exports = {
  up: async ({ context: sequelize }) => {
    for (const [slug, fields] of Object.entries(copy)) {
      for (const [field, value] of Object.entries(fields)) {
        await sequelize.query(`UPDATE Products SET ${field} = :value WHERE slug = :slug`, {
          replacements: { slug, value },
        });
      }
    }
    await sequelize.query(
      `UPDATE ProductMedia m JOIN Products p ON p.id = m.product_id
       SET m.alt = :alt, m.caption = CONCAT('The ', p.title, ' silhouette, filmed here in Graphite.')
       WHERE m.role = 'film' AND m.path = 'films/form-orbit.mp4'`,
      { replacements: { alt: FILM_ALT } },
    );
  },
};
