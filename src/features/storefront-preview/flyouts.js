import { collectionHref } from "./collections/collections";
import { products } from "./products";
import { productHref } from "./usePreviewRoute";

const models = (category) =>
  products
    .filter((product) => product.image.category === category)
    .map((product) => [product.name, productHref(product.id)]);

// Global navigation flyouts: one large primary column, then two quieter ones.
export const flyouts = {
  store: [
    [
      "Shop",
      [
        ["Shop the collection", "#preview-direction"],
        ["Over-ear", collectionHref("over-ear")],
        ["In-ear", collectionHref("in-ear")],
        ["Compare models", "#compare-headphones"],
      ],
    ],
    [
      "Quick links",
      [
        ["Your bag", "#bag"],
        ["Sign in", "#sign-in"],
        ["Create an account", "#sign-up"],
      ],
    ],
    [
      "Discover",
      [
        ["Listening journal", "#preview-stories"],
        ["Form series", collectionHref("over-ear", "models")],
        ["Pocket series", collectionHref("in-ear", "models")],
      ],
    ],
  ],
  "over-ear": [
    [
      "Explore Over-ear",
      [["Explore all Over-ear", collectionHref("over-ear")], ...models("over-ear")],
    ],
    [
      "Shop Over-ear",
      [
        ["Shop Over-ear", collectionHref("over-ear", "models")],
        ["Compare Form models", collectionHref("over-ear", "compare")],
      ],
    ],
    [
      "More from Over-ear",
      [
        ["Listening journal", "#preview-stories"],
        ["Discover In-ear", collectionHref("in-ear")],
      ],
    ],
  ],
  "in-ear": [
    [
      "Explore In-ear",
      [["Explore all In-ear", collectionHref("in-ear")], ...models("in-ear")],
    ],
    [
      "Shop In-ear",
      [
        ["Shop In-ear", collectionHref("in-ear", "models")],
        ["Compare Pocket models", collectionHref("in-ear", "compare")],
      ],
    ],
    [
      "More from In-ear",
      [
        ["Listening journal", "#preview-stories"],
        ["Discover Over-ear", collectionHref("over-ear")],
      ],
    ],
  ],
};
