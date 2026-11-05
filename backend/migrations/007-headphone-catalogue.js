// The headphone catalogue. `slug` links a row to the storefront's imagery, and
// only rows with a category are sold, so older products stay in the database.
const models = [
  ['black', 'Form 01', 'Graphite', 'over-ear', 179000, 'A little closer to the music.', 'A dark, sculptural expression for your everyday listening ritual.', '/local-preview/black-headphones.webp'],
  ['white', 'Form 02', 'Chalk', 'over-ear', 199000, 'Make room for your own rhythm.', 'Soft tones and a clean silhouette. A fresh perspective on personal audio.', '/local-preview/white-headphones.png'],
  ['silver', 'Form 03', 'Silver', 'over-ear', 249000, 'Your music. Your moment.', 'A metallic finish with a bold presence, for moments that are yours alone.', '/local-preview/silver-headphones.webp'],
  ['in-ear-black', 'Pocket 01', 'Graphite', 'in-ear', 119000, 'Your rhythm, wherever you go.', 'A compact silhouette in deep graphite. A little space for your own soundtrack.', '/local-preview/black-in-ear-headphones-2.webp'],
  ['in-ear-white', 'Pocket 02', 'Chalk', 'in-ear', 139000, 'Small form. Everyday moments.', 'A bright, minimal expression of personal audio, with a pocket-sized presence.', '/local-preview/white-in-ear-headphones.webp'],
  ['in-ear-red', 'Pocket 03', 'Crimson', 'in-ear', 149000, 'A little colour. A lot of character.', 'A vivid red finish that brings a playful accent to your listening ritual.', '/local-preview/red-in-ear-headphones.webp'],
  ['form-04', 'Form 04', 'Onyx', 'over-ear', 279000, 'Deep focus, all day long.', 'A softly rounded silhouette in matte onyx, shaped for long, unhurried listening sessions.', '/local-preview/form-04.png'],
  ['pocket-04', 'Pocket 04', 'Espresso', 'in-ear', 159000, 'Polished, pocketable, personal.', 'A glossy, deep-toned case with a sculpted oval form that feels good in the hand.', '/local-preview/pocket-04.png'],
  ['pocket-05', 'Pocket 05', 'Onyx', 'in-ear', 109000, 'The essentials, beautifully simple.', 'A matte, minimal everyday pair. Light, compact and easy to live with.', '/local-preview/pocket-05.png'],
  ['form-05', 'Form 05', 'Ocean', 'over-ear', 259000, 'Deep blue. Deeper listening.', 'An anodised blue shell with a woven band, for colour that still feels calm.', '/local-preview/form-05.webp'],
  ['form-06', 'Form 06', 'Sage', 'over-ear', 259000, 'A breath of green.', 'A soft sage finish from cup to band. Quiet colour for slow, unhurried days.', '/local-preview/form-06.webp'],
  ['form-07', 'Form 07', 'Sand', 'over-ear', 219000, 'Warm tones, all the way round.', 'A warm, tonal silhouette with rounded cups, shown with a case in the same shade.', '/local-preview/form-07.webp'],
  ['pocket-06', 'Pocket 06', 'Carbon', 'in-ear', 129000, 'Round, soft, always ready.', 'Rounded buds and a soft-touch case in deep carbon, made for every day.', '/local-preview/pocket-06.webp'],
  ['pocket-07', 'Pocket 07', 'Slate', 'in-ear', 169000, 'Polished metal, pocket-sized.', 'A satin slate case and slim stems. The most refined shape in the Pocket series.', '/local-preview/pocket-07.webp'],
];
const STOCK = 25;

module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(`ALTER TABLE Products
      ADD COLUMN slug VARCHAR(64) NULL UNIQUE,
      ADD COLUMN tagline VARCHAR(255) NULL,
      ADD COLUMN finish_name VARCHAR(64) NULL,
      ADD COLUMN category VARCHAR(16) NULL`);
    for (const [slug, title, finish, category, priceOre, tagline, description, imageUrl] of models) {
      await sequelize.query(
        `INSERT INTO Products (slug, title, finish_name, category, price_ore, tagline, description, imageUrl, stock_quantity, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        { replacements: [slug, title, finish, category, priceOre, tagline, description, imageUrl, STOCK] },
      );
    }
  },
};
