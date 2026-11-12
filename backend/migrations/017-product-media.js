// Each product's images and films become rows in ProductMedia, so adding or
// changing a picture is data rather than a storefront release. Paths are
// relative to the storefront's media base address.
//
// role: main (the cut-out shown everywhere), gallery (extra views on the
//       product page) or film (the product page film).
// kind: cutout (transparent studio image), photo or film.
// crop: the part of a cut-out the product fills, in image pixels.
// tone: whether a cut-out needs a dark or a light backdrop.
const studio = (path, alt, width, height, crop, tone) => ({
  role: 'main', kind: 'cutout', position: 0, path, alt, width, height, crop, tone,
});
const view = (position, path, label, alt, focus) => ({
  role: 'gallery', kind: 'photo', position, path, label, alt, focus,
});
const formOrbit = (name) => ({
  role: 'film',
  kind: 'film',
  position: 0,
  path: 'films/form-orbit.mp4',
  poster: 'films/form-orbit.jpg',
  label: 'In motion.',
  caption: `The ${name} silhouette, shown here in Titanium.`,
  alt: 'Over-ear headphones in a dark titanium finish turning slowly in the air.',
});

const media = {
  black: [
    studio('products/atlas.webp', 'Graphite over-ear headphones with brushed metal cups', 2400, 1597, [658, 159, 1738, 1437], 'dark'),
    view(1, 'photos/atlas-cup.webp', 'Atlas ear cup up close', 'Close-up of an Atlas ear cup, its brushed metal and woven cushion in low light', '45% 50%'),
    view(2, 'photos/atlas-mesh.webp', 'Atlas mesh and controls', 'Close-up of the knit mesh and control button on an Atlas ear cup', '45% 50%'),
    formOrbit('Atlas'),
  ],
  silver: [
    studio('products/halo.webp', 'Silver over-ear headphones', 1600, 1455, [368, 94, 1368, 1428], 'light'),
    view(1, 'photos/halo-stand-close.jpg', 'Halo in context', 'Close-up of a Halo ear cup and headband', '70% 55%'),
    formOrbit('Halo'),
  ],
  'form-05': [
    studio('products/tide.webp', 'Ocean blue over-ear headphones', 1131, 1536, [136, 226, 1013, 1288], 'dark'),
    formOrbit('Tide'),
  ],
  'form-06': [
    studio('products/grove.webp', 'Sage green over-ear headphones', 1366, 768, [369, 64, 951, 719], 'light'),
    formOrbit('Grove'),
  ],
  'pocket-05': [
    studio('products/pearl.webp', 'Chalk earbuds above their open case', 1104, 1632, [40, 40, 1065, 1593], 'light'),
  ],
  'pocket-06': [
    studio('products/pebble.webp', 'Carbon earbuds beside their open case', 1366, 759, [341, 136, 1022, 642], 'dark'),
    {
      role: 'film',
      kind: 'film',
      position: 0,
      path: 'films/pocket-orbit.mp4',
      poster: 'films/pocket-orbit.jpg',
      label: 'In motion.',
      caption: 'Case and buds, from every side.',
      alt: 'Carbon earbuds floating and turning beside their open case.',
    },
  ],
  'pocket-07': [
    studio('products/prism.webp', 'Slate earbuds floating above their open case', 690, 1186, [120, 262, 572, 932], 'dark'),
    view(1, 'photos/prism-set.webp', 'Prism with its case', 'Prism earbuds beside their slate case on black', '50% 64%'),
    view(2, 'photos/prism-bud.webp', 'Prism earbud up close', 'Close-up of a Prism earbud, its metal shell and soft tip', '50% 45%'),
  ],
  'pocket-08': [
    studio('products/drift.webp', 'Ocean blue earbuds above their open case', 1108, 1664, [40, 40, 1069, 1625], 'light'),
  ],
};

module.exports = {
  up: async ({ context: sequelize }) => {
    await sequelize.query(`CREATE TABLE ProductMedia (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      role VARCHAR(16) NOT NULL,
      kind VARCHAR(16) NOT NULL,
      position INT NOT NULL DEFAULT 0,
      path VARCHAR(255) NOT NULL,
      poster_path VARCHAR(255) NULL,
      alt VARCHAR(255) NOT NULL,
      label VARCHAR(128) NULL,
      caption VARCHAR(255) NULL,
      width INT NULL,
      height INT NULL,
      crop_left INT NULL,
      crop_top INT NULL,
      crop_right INT NULL,
      crop_bottom INT NULL,
      focus VARCHAR(32) NULL,
      tone VARCHAR(8) NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      CONSTRAINT product_media_product FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE,
      CONSTRAINT product_media_role CHECK (role IN ('main', 'gallery', 'film')),
      CONSTRAINT product_media_kind CHECK (kind IN ('cutout', 'photo', 'film')),
      CONSTRAINT product_media_tone CHECK (tone IS NULL OR tone IN ('dark', 'light')),
      CONSTRAINT product_media_one_main CHECK (role <> 'main' OR position = 0),
      CONSTRAINT product_media_slot UNIQUE (product_id, role, position)
    )`);

    for (const [slug, items] of Object.entries(media)) {
      for (const item of items) {
        const [left, top, right, bottom] = item.crop || [];
        await sequelize.query(
          `INSERT INTO ProductMedia (product_id, role, kind, position, path, poster_path, alt, label, caption,
             width, height, crop_left, crop_top, crop_right, crop_bottom, focus, tone, createdAt, updatedAt)
           SELECT id, :role, :kind, :position, :path, :poster, :alt, :label, :caption,
             :width, :height, :left, :top, :right, :bottom, :focus, :tone, NOW(), NOW()
           FROM Products WHERE slug = :slug`,
          {
            replacements: {
              slug,
              role: item.role,
              kind: item.kind,
              position: item.position,
              path: item.path,
              poster: item.poster ?? null,
              alt: item.alt,
              label: item.label ?? null,
              caption: item.caption ?? null,
              width: item.width ?? null,
              height: item.height ?? null,
              left: left ?? null,
              top: top ?? null,
              right: right ?? null,
              bottom: bottom ?? null,
              focus: item.focus ?? null,
              tone: item.tone ?? null,
            },
          },
        );
      }
    }
  },
};
