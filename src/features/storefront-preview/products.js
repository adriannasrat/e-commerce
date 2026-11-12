import { productMedia } from "./catalogueMedia";

// Filled from the API before the storefront renders, so every module reads the
// same list. A product needs a main image to be shown, so one without is skipped.
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
      ...productMedia(row.slug, row.category, row.media),
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
  "pocket-08",
];
