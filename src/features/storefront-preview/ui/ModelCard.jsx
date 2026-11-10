import React from "react";
import HeadphoneImage from "../HeadphoneImage";
import { finishColors, formatPrice, newModels } from "../products";
import { productHref } from "../usePreviewRoute";

// A model in a lineup: product image, finish swatch, name, one line of copy,
// price and two actions.
export default function ModelCard({ product, onAddToBag, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const href = productHref(product.id);
  return (
    <article className="rx-model" aria-labelledby={`model-${product.id}`}>
      <a
        className="rx-model-image"
        href={href}
        aria-label={`Explore ${product.name} in ${product.finishName}`}
      >
        <HeadphoneImage image={product.image} decorative />
      </a>
      <span
        className="rx-model-swatch"
        style={{ "--finish": finishColors[product.finishName] }}
        aria-hidden="true"
      />
      {newModels.includes(product.id) ? (
        <p className="rx-new">New</p>
      ) : (
        <p className="rx-new" aria-hidden="true">
          &nbsp;
        </p>
      )}
      <Heading id={`model-${product.id}`}>{product.name}</Heading>
      <p className="rx-model-finish">{product.finishName}</p>
      <p className="rx-model-tagline">{product.tagline}</p>
      <p className="rx-model-price">From {formatPrice(product.price)}</p>
      <div className="rx-model-actions">
        <a className="rx-btn rx-btn--small" href={href}>
          Learn more
        </a>
        {onAddToBag ? (
          <button
            type="button"
            className="rx-model-add"
            aria-label={`Add ${product.name} to bag`}
            onClick={() => onAddToBag(product.id)}
          >
            Add to bag
          </button>
        ) : (
          <a className="rx-link rx-model-buy" href={href}>
            Buy
          </a>
        )}
      </div>
    </article>
  );
}
