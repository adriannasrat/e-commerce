import { collectionHref } from "./collections/collections";
import HeadphoneImage from "./HeadphoneImage";
import { products } from "./products";
import { productHref } from "./usePreviewRoute";

// The two-column promo grid: each tile has a headline, a line of copy, two
// actions and the product underneath, alternating light and dark.
const tiles = [
  {
    id: "silver",
    name: "Over-ear",
    kicker: "Form series",
    tone: "light",
    caption: "A little space. Just for you.",
    learn: collectionHref("over-ear"),
    buy: collectionHref("over-ear", "models"),
    label: "Over-ear headphones",
  },
  {
    id: "pocket-07",
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
    name: "Atlas",
    kicker: "Graphite",
    tone: "dark",
    caption: "A little closer to the music.",
    learn: productHref("black"),
    buy: productHref("black"),
    label: "Atlas",
  },
  {
    id: "pocket-06",
    name: "Pebble",
    kicker: "New in Carbon",
    tone: "warm",
    caption: "Round, soft, always ready.",
    learn: productHref("pocket-06"),
    buy: productHref("pocket-06"),
    label: "Pebble",
  },
  {
    id: "form-05",
    name: "Tide",
    kicker: "New in Ocean",
    tone: "light",
    caption: "Deep blue. Deeper listening.",
    learn: productHref("form-05"),
    buy: productHref("form-05"),
    label: "Tide",
  },
  {
    id: "form-06",
    name: "Grove",
    kicker: "New in Sage",
    tone: "light",
    caption: "A breath of green.",
    learn: productHref("form-06"),
    buy: productHref("form-06"),
    label: "Grove",
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
