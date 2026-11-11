import { collectionHref } from "./collections/collections";
import { products } from "./products";
import { productHref } from "./usePreviewRoute";
import { paths } from "./routes";

const models = (category) =>
  products
    .filter((product) => product.image.category === category)
    .map((product) => [product.name, productHref(product.id)]);

// Global navigation flyouts: one large primary column, then two quieter ones.
export const getFlyouts = () => ({
  store: [
    [
      "Shop",
      [
        ["Shop the collection", paths.store],
        ["Over-ear", collectionHref("over-ear")],
        ["In-ear", collectionHref("in-ear")],
        ["Compare models", paths.compare],
      ],
    ],
    [
      "Quick links",
      [
        ["Your bag", paths.bag],
        ["Sign in", paths.signIn],
        ["Create an account", paths.signUp],
      ],
    ],
    [
      "Discover",
      [
        ["Listening journal", paths.journal],
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
        ["Listening journal", paths.journal],
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
        ["Listening journal", paths.journal],
        ["Discover Over-ear", collectionHref("over-ear")],
      ],
    ],
  ],
});
