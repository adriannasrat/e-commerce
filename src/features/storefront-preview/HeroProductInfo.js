import React from "react";
import { collectionHref } from "./collections/collections";
import { formatPrice, newModels } from "./products";
import { productHref } from "./usePreviewRoute";

export default function HeroProductInfo({ product }) {
  return (
    <div className="preview-hero-copy">
      <div
        key={product.id}
        className="preview-product-info"
        aria-live="polite"
        aria-atomic="true"
      >
        {newModels.includes(product.id) && <p className="rx-new">New</p>}
        <h2 className="rx-hero-title">{product.name}</h2>
        <p className="rx-hero-sub">{product.tagline}</p>
        <p className="preview-demo-price">
          From {formatPrice(product.price)}
        </p>
      </div>
      <div className="rx-actions">
        <a className="rx-btn" href={productHref(product.id)}>
          Learn more
        </a>
        <a
          className="rx-btn rx-btn--ghost"
          href={collectionHref(product.image.category, "models")}
        >
          Shop {product.image.category === "over-ear" ? "Over-ear" : "In-ear"}
        </a>
      </div>
    </div>
  );
}
