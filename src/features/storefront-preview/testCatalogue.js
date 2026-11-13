// The API catalogue, as component tests see it.
export const testCatalogue = [
  {
    id: 1,
    slug: "black",
    title: "Atlas",
    finish_name: "Graphite",
    category: "over-ear",
    price_ore: 179000,
    stock_quantity: 25,
    tagline: "A little closer to the music.",
    description:
      "A dark, sculptural expression for your everyday listening ritual.",
  },
  {
    id: 3,
    slug: "silver",
    title: "Halo",
    finish_name: "Silver",
    category: "over-ear",
    price_ore: 249000,
    stock_quantity: 25,
    tagline: "Your music. Your moment.",
    description:
      "A metallic finish with a bold presence, for moments that are yours alone.",
  },
  {
    id: 9,
    slug: "pocket-05",
    title: "Pearl",
    finish_name: "Chalk",
    category: "in-ear",
    price_ore: 109000,
    stock_quantity: 25,
    tagline: "The essentials, beautifully simple.",
    description:
      "A matte, minimal everyday pair. Light, compact and easy to live with.",
  },
  {
    id: 10,
    slug: "form-05",
    title: "Tide",
    finish_name: "Ocean",
    category: "over-ear",
    price_ore: 259000,
    stock_quantity: 25,
    tagline: "Deep blue. Deeper listening.",
    description:
      "An anodised blue shell with a woven band, for colour that still feels calm.",
  },
  {
    id: 11,
    slug: "form-06",
    title: "Grove",
    finish_name: "Sage",
    category: "over-ear",
    price_ore: 259000,
    stock_quantity: 25,
    tagline: "A breath of green.",
    description:
      "A soft sage finish from cup to band. Quiet colour for slow, unhurried days.",
  },
  {
    id: 13,
    slug: "pocket-06",
    title: "Pebble",
    finish_name: "Carbon",
    category: "in-ear",
    price_ore: 129000,
    stock_quantity: 25,
    tagline: "Round, soft, always ready.",
    description:
      "Rounded buds and a soft-touch case in deep carbon, made for every day.",
  },
  {
    id: 14,
    slug: "pocket-07",
    title: "Prism",
    finish_name: "Slate",
    category: "in-ear",
    price_ore: 169000,
    stock_quantity: 25,
    tagline: "Polished metal, pocket-sized.",
    description:
      "A satin slate case and slim stems. The most refined shape in the Pocket series.",
  },
  {
    id: 15,
    slug: "pocket-08",
    title: "Drift",
    finish_name: "Ocean",
    category: "in-ear",
    price_ore: 149000,
    stock_quantity: 25,
    tagline: "Deep blue, close to you.",
    description:
      "A deep Ocean finish from the buds to the case, for a little colour in every day.",
  },
];

// The media each product carries, as the API returns it after the
// product_media migration.
const studio = (path, alt, width, height, crop, tone) => ({
  role: "main",
  kind: "cutout",
  position: 0,
  path,
  poster: null,
  alt,
  label: null,
  caption: null,
  width,
  height,
  crop,
  focus: null,
  tone,
});
const view = (position, path, label, alt, focus) => ({
  role: "gallery",
  kind: "photo",
  position,
  path,
  poster: null,
  alt,
  label,
  caption: null,
  width: null,
  height: null,
  crop: null,
  focus,
  tone: null,
});
const film = (name, caption, alt) => ({
  role: "film",
  kind: "film",
  position: 0,
  path: `films/${name}.mp4`,
  poster: `films/${name}.jpg`,
  alt,
  label: "In motion.",
  caption,
  width: null,
  height: null,
  crop: null,
  focus: null,
  tone: null,
});
const orbit = (name) =>
  film(
    "form-orbit",
    `The ${name} silhouette, shown here in Titanium.`,
    "Over-ear headphones in a dark titanium finish turning slowly in the air.",
  );

const media = {
  black: [
    studio(
      "products/atlas.webp",
      "Graphite over-ear headphones with brushed metal cups",
      2400,
      1597,
      [658, 159, 1738, 1437],
      "dark",
    ),
    view(
      1,
      "photos/atlas-cup.webp",
      "Atlas ear cup up close",
      "Close-up of an Atlas ear cup, its brushed metal and woven cushion in low light",
      "45% 50%",
    ),
    view(
      2,
      "photos/atlas-mesh.webp",
      "Atlas mesh and controls",
      "Close-up of the knit mesh and control button on an Atlas ear cup",
      "45% 50%",
    ),
    orbit("Atlas"),
  ],
  silver: [
    studio(
      "products/halo.webp",
      "Silver over-ear headphones",
      1600,
      1455,
      [368, 94, 1368, 1428],
      "light",
    ),
    view(
      1,
      "photos/halo-stand-close.jpg",
      "Halo in context",
      "Close-up of a Halo ear cup and headband",
      "70% 55%",
    ),
    orbit("Halo"),
  ],
  "form-05": [
    studio(
      "products/tide.webp",
      "Ocean blue over-ear headphones",
      1131,
      1536,
      [136, 226, 1013, 1288],
      "dark",
    ),
    orbit("Tide"),
  ],
  "form-06": [
    studio(
      "products/grove.webp",
      "Sage green over-ear headphones",
      1366,
      768,
      [369, 64, 951, 719],
      "light",
    ),
    orbit("Grove"),
  ],
  "pocket-05": [
    studio(
      "products/pearl.webp",
      "Chalk earbuds above their open case",
      1104,
      1632,
      [40, 40, 1065, 1593],
      "light",
    ),
  ],
  "pocket-06": [
    studio(
      "products/pebble.webp",
      "Carbon earbuds beside their open case",
      1366,
      759,
      [341, 136, 1022, 642],
      "dark",
    ),
    film(
      "pocket-orbit",
      "Case and buds, from every side.",
      "Carbon earbuds floating and turning beside their open case.",
    ),
  ],
  "pocket-07": [
    studio(
      "products/prism.webp",
      "Slate earbuds floating above their open case",
      690,
      1186,
      [120, 262, 572, 932],
      "dark",
    ),
    view(
      1,
      "photos/prism-set.webp",
      "Prism with its case",
      "Prism earbuds beside their slate case on black",
      "50% 64%",
    ),
    view(
      2,
      "photos/prism-bud.webp",
      "Prism earbud up close",
      "Close-up of a Prism earbud, its metal shell and soft tip",
      "50% 45%",
    ),
  ],
  "pocket-08": [
    studio(
      "products/drift.webp",
      "Ocean blue earbuds above their open case",
      1108,
      1664,
      [40, 40, 1069, 1625],
      "light",
    ),
  ],
};

for (const row of testCatalogue) row.media = media[row.slug];
