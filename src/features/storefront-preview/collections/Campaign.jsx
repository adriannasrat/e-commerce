import HeadphoneImage from "../HeadphoneImage";
import { productHref } from "../usePreviewRoute";
import { products, formatPrice } from "../products";
import { collections, collectionHref } from "./collections";

// A full-width product hero: centred copy, two actions, the product below.
export default function Campaign({ category, modelId, title, caption, tone }) {
  const collection = collections[category];
  const model = products.find(
    (product) => product.id === (modelId || collection.feature),
  );
  const theme = tone || (category === "over-ear" ? "dark" : "light");
  return (
    <article
      className={`sound-campaign sound-campaign--${theme} sound-${category}${theme === "dark" ? " rx-dark" : ""}`}
      aria-labelledby={`campaign-${category}`}
    >
      <div className="sound-campaign-copy">
        <small>{collection.series}</small>
        <h2 className="rx-hero-title" id={`campaign-${category}`}>
          {title || model.name}
        </h2>
        <p className="rx-hero-sub">{caption || collection.line}</p>
        <p className="sound-campaign-price">From {formatPrice(model.price)}</p>
        <div className="rx-actions sound-actions">
          <a className="rx-btn" href={productHref(model.id)}>
            Learn more
          </a>
          <a
            className="rx-btn rx-btn--ghost"
            href={collectionHref(category, "models")}
          >
            Shop {collection.name}
          </a>
        </div>
      </div>
      <a
        className="sound-art"
        href={productHref(model.id)}
        aria-label={`View ${model.name} in ${model.finishName}`}
        tabIndex={-1}
      >
        <HeadphoneImage image={model.image} decorative />
      </a>
    </article>
  );
}
