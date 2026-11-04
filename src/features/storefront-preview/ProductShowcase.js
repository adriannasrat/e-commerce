import React from "react";
import { collectionHref } from "./collections/collections";
import HeadphoneImage from "./HeadphoneImage";
import { products } from "./products";
import { productHref } from "./usePreviewRoute";

// The two-column promo grid: each tile has a headline, a line of copy, two
// actions and the product underneath, alternating light and dark.
const tiles = [
  {
    id: "white",
    name: "Over-ear",
    kicker: "Form series",
    tone: "light",
    caption: "A little space. Just for you.",
    learn: collectionHref("over-ear"),
    buy: collectionHref("over-ear", "models"),
    label: "Over-ear headphones",
  },
  {
    id: "in-ear-black",
    name: "In-ear",
    kicker: "Pocket series",
    tone: "dark",
    caption: "Your everyday. In your pocket.",
    learn: collectionHref("in-ear"),
    buy: collectionHref("in-ear", "models"),
    label: "In-ear headphones",
  },
  {
    id: "black",
    name: "Form 01",
    kicker: "Graphite",
    tone: "dark",
    caption: "A little closer to the music.",
    learn: productHref("black"),
    buy: productHref("black"),
    label: "Form 01",
  },
  {
    id: "in-ear-red",
    name: "Pocket 03",
    kicker: "New in Crimson",
    tone: "warm",
    caption: "A little colour. A lot of character.",
    learn: productHref("in-ear-red"),
    buy: productHref("in-ear-red"),
    label: "Pocket 03",
  },
];

export default function ProductShowcase() {
  return (
    <section
      className="product-showcase"
      id="preview-showcase"
      aria-labelledby="showcase-title"
    >
      <h2 id="showcase-title" className="preview-sr-only">
        Two ways to listen.
      </h2>
      <div className="product-showcase-grid">
        {tiles.map(({ id, name, kicker, tone, caption, learn, buy, label }) => {
          const product = products.find((item) => item.id === id);
          return (
            <article
              key={id}
              className={`product-showcase-tile product-showcase-${tone}${tone === "dark" ? " rx-dark" : ""}`}
              aria-labelledby={`showcase-${id}`}
            >
              <div className="product-showcase-copy">
                <p className="product-showcase-category">{kicker}</p>
                <h3 id={`showcase-${id}`}>{name}</h3>
                <p className="product-showcase-caption">{caption}</p>
                <div className="rx-actions">
                  <a
                    className="rx-btn rx-btn--small"
                    href={learn}
                    aria-label={`Learn more about ${label}`}
                  >
                    Learn more
                  </a>
                  <a
                    className="rx-btn rx-btn--small rx-btn--ghost"
                    href={buy}
                    aria-label={`Buy ${label}`}
                  >
                    Buy
                  </a>
                </div>
              </div>
              <a
                className="product-showcase-image"
                href={learn}
                aria-label={`Explore ${label}`}
                tabIndex={-1}
              >
                <HeadphoneImage image={product.image} decorative />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
