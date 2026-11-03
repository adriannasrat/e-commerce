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
].map((product) => ({
  ...product,
  image: headphoneImages.find(({ id }) => id === product.id),
}));

export const formatPrice = (price) =>
  `${new Intl.NumberFormat("en-SE").format(price)} SEK`;
