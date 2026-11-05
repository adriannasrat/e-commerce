import { headphoneImages } from "./headphoneImages";

// Fictional catalogue content for the design prototype, not manufacturer claims.
export const products = [
  {
    id: "black",
    name: "Form 01",
    finishName: "Graphite",
    price: 1790,
    tagline: "A little closer to the music.",
    description:
      "A dark, sculptural expression for your everyday listening ritual.",
  },
  {
    id: "white",
    name: "Form 02",
    finishName: "Chalk",
    price: 1990,
    tagline: "Make room for your own rhythm.",
    description:
      "Soft tones and a clean silhouette. A fresh perspective on personal audio.",
  },
  {
    id: "silver",
    name: "Form 03",
    finishName: "Silver",
    price: 2490,
    tagline: "Your music. Your moment.",
    description:
      "A metallic finish with a bold presence, for moments that are yours alone.",
  },
  {
    id: "in-ear-black",
    name: "Pocket 01",
    finishName: "Graphite",
    price: 1190,
    tagline: "Your rhythm, wherever you go.",
    description:
      "A compact silhouette in deep graphite. A little space for your own soundtrack.",
  },
  {
    id: "in-ear-white",
    name: "Pocket 02",
    finishName: "Chalk",
    price: 1390,
    tagline: "Small form. Everyday moments.",
    description:
      "A bright, minimal expression of personal audio, with a pocket-sized presence.",
  },
  {
    id: "in-ear-red",
    name: "Pocket 03",
    finishName: "Crimson",
    price: 1490,
    tagline: "A little colour. A lot of character.",
    description:
      "A vivid red finish that brings a playful accent to your listening ritual.",
  },
  {
    id: "form-04",
    name: "Form 04",
    finishName: "Onyx",
    price: 2790,
    tagline: "Deep focus, all day long.",
    description:
      "A softly rounded silhouette in matte onyx, shaped for long, unhurried listening sessions.",
  },
  {
    id: "pocket-04",
    name: "Pocket 04",
    finishName: "Espresso",
    price: 1590,
    tagline: "Polished, pocketable, personal.",
    description:
      "A glossy, deep-toned case with a sculpted oval form that feels good in the hand.",
  },
  {
    id: "pocket-05",
    name: "Pocket 05",
    finishName: "Onyx",
    price: 1090,
    tagline: "The essentials, beautifully simple.",
    description:
      "A matte, minimal everyday pair. Light, compact and easy to live with.",
  },
  {
    id: "form-05",
    name: "Form 05",
    finishName: "Ocean",
    price: 2590,
    tagline: "Deep blue. Deeper listening.",
    description:
      "An anodised blue shell with a woven band, for colour that still feels calm.",
  },
  {
    id: "form-06",
    name: "Form 06",
    finishName: "Sage",
    price: 2590,
    tagline: "A breath of green.",
    description:
      "A soft sage finish from cup to band. Quiet colour for slow, unhurried days.",
  },
  {
    id: "form-07",
    name: "Form 07",
    finishName: "Sand",
    price: 2190,
    tagline: "Warm tones, all the way round.",
    description:
      "A warm, tonal silhouette with rounded cups, shown with a case in the same shade.",
  },
  {
    id: "pocket-06",
    name: "Pocket 06",
    finishName: "Carbon",
    price: 1290,
    tagline: "Round, soft, always ready.",
    description:
      "Rounded buds and a soft-touch case in deep carbon, made for every day.",
  },
  {
    id: "pocket-07",
    name: "Pocket 07",
    finishName: "Slate",
    price: 1690,
    tagline: "Polished metal, pocket-sized.",
    description:
      "A satin slate case and slim stems. The most refined shape in the Pocket series.",
  },
].map((product) => ({
  ...product,
  image: headphoneImages.find(({ id }) => id === product.id),
}));

export const formatPrice = (price) =>
  `${new Intl.NumberFormat("en-SE").format(price)} SEK`;

export const finishColors = {
  Graphite: "#363735",
  Chalk: "#eeede7",
  Silver: "#b6b8ba",
  Crimson: "#a92c38",
  Onyx: "#1f1f21",
  Espresso: "#3b2621",
  Ocean: "#2f4d73",
  Sage: "#71896f",
  Sand: "#c8b8a1",
  Carbon: "#26262a",
  Slate: "#57585c",
};

// Models currently highlighted with a "New" label across the storefront.
export const newModels = [
  "form-05",
  "form-06",
  "form-07",
  "pocket-06",
  "pocket-07",
];
