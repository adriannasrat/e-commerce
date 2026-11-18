import { useMediaQuery } from "@mui/material";
import HeadphoneImage from "./HeadphoneImage";
import { newModels, products } from "./products";
import { productHref } from "./usePreviewRoute";

// Every model has its own tile, alternating over-ear and in-ear. The categories
// have their own sections above, so the grid holds products only. Pearl and
// Drift are cut out of white, so they only show on white: the second and sixth
// tiles are white in both one and two columns.
const order = ["black", "pocket-05", "form-05", "pocket-06", "form-06", "pocket-08", "silver", "pocket-07"];

// Tiles alternate black and white, starting black. In two columns that is a
// checkerboard, so neighbours never share a colour in either direction.
const isDark = (index, columns) =>
  columns === 1 ? index % 2 === 0 : (Math.floor(index / 2) + index) % 2 === 0;

export default function ProductShowcase() {
  const columns = useMediaQuery("(max-width: 833px)", { noSsr: true }) ? 1 : 2;
  const tiles = order
    .map((id) => products.find((item) => item.id === id))
    .filter(Boolean);
  return (
    <section
      className="product-showcase"
      id="preview-showcase"
      aria-labelledby="showcase-title"
    >
      <h2 id="showcase-title" className="preview-sr-only">
        Every model.
      </h2>
      <div className="product-showcase-grid">
        {tiles.map((product, index) => {
          const { id, name, finishName, tagline } = product;
          const dark = isDark(index, columns);
          const href = productHref(id);
          return (
            <article
              key={id}
              className={`product-showcase-tile${dark ? " product-showcase-dark rx-dark" : ""}`}
              aria-labelledby={`showcase-${id}`}
            >
              <div className="product-showcase-copy">
                <p className="product-showcase-category">
                  {newModels.includes(id) ? `New in ${finishName}` : finishName}
                </p>
                <h3 id={`showcase-${id}`}>{name}</h3>
                <p className="product-showcase-caption">{tagline}</p>
                <div className="rx-actions">
                  <a
                    className="rx-btn rx-btn--small"
                    href={href}
                    aria-label={`Learn more about ${name}`}
                  >
                    Learn more
                  </a>
                  <a
                    className="rx-btn rx-btn--small rx-btn--ghost"
                    href={href}
                    aria-label={`Buy ${name}`}
                  >
                    Buy
                  </a>
                </div>
              </div>
              <a
                className="product-showcase-image"
                href={href}
                aria-label={`Explore ${name}`}
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
