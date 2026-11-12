import { headphoneImages } from "./headphoneImages";

// Filled from the API before the storefront renders, so every module reads the
// same list. Rows need imagery here to be shown: a slug without any is skipped.
export const products = [];

export function setCatalogue(rows) {
  const loaded = rows
    .map((row) => ({
      id: row.slug,
      apiId: row.id,
      name: row.title,
      finishName: row.finish_name,
      price: row.price_ore / 100,
      stock: row.stock_quantity,
      tagline: row.tagline,
      description: row.description,
      image: headphoneImages.find(({ id }) => id === row.slug),
    }))
    .filter((product) => product.image);
  products.splice(0, products.length, ...loaded);
}

export const formatPrice = (price) =>
  `${new Intl.NumberFormat("en-SE").format(price)} SEK`;

export const finishColors = {
  Graphite: "#363735",
  Chalk: "#eeede7",
  Silver: "#b6b8ba",
  Onyx: "#1f1f21",
  Ocean: "#2f4d73",
  Sage: "#71896f",
  Carbon: "#26262a",
  Slate: "#57585c",
};

// Models currently highlighted with a "New" label across the storefront.
export const newModels = [
  "form-05",
  "form-06",
  "pocket-06",
  "pocket-07",
];
