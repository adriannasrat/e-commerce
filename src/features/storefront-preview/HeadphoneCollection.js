import ScrollReveal from "./ScrollReveal";
import React, { useState } from "react";
import ModelCompare from "./shopping/ModelCompare";
import { collectionHref } from "./collections/collections";
import HeadphoneImage from "./HeadphoneImage";
import { products, formatPrice } from "./products";
import { productHref } from "./usePreviewRoute";

export default function HeadphoneCollection({ onAddToBag }) {
  const [fit, setFit] = useState("All");
  const visible = products.filter(
    (model) => fit === "All" || model.image.category === fit,
  );
  return (
    <section
      className="preview-collection"
      id="preview-direction"
      aria-labelledby="preview-direction-title"
    >
      <ScrollReveal as="p" className="preview-eyebrow">
        PERSONAL AUDIO / SIX MODELS
      </ScrollReveal>
      <ScrollReveal className="preview-collection-heading">
        <h1 tabIndex={-1} id="preview-direction-title">
          The collection.
        </h1>
        <p>
          Over-ear or in-ear. Your own rhythm.
          <br />
          Find the one that feels like you.
        </p>
      </ScrollReveal>
      <nav className="shop-shortcuts" aria-label="Shop by collection">
        <a href={collectionHref("over-ear")}>Shop Form</a>
        <a href={collectionHref("in-ear")}>Shop Pocket</a>
        <a href="#compare-headphones">Compare any two</a>
      </nav>
      <div className="shop-filters" role="group" aria-label="Filter by fit">
        {["All", "over-ear", "in-ear"].map((value) => (
          <button
            key={value}
            aria-pressed={fit === value}
            onClick={() => setFit(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="preview-product-grid">
        {visible.map((product, index) => (
          <ScrollReveal
            as="article"
            className="preview-product-card"
            key={product.id}
            id={
              index ===
              visible.findIndex(
                (item) => item.image.category === product.image.category,
              )
                ? `preview-${product.image.category}`
                : undefined
            }
            delay={(index % 3) * 80}
          >
            <a
              className="preview-card-image"
              href={productHref(product.id)}
              aria-label={`Explore ${product.name} in ${product.finishName}`}
            >
              <HeadphoneImage image={product.image} decorative />
            </a>
            <p className="preview-card-finish">{product.finishName}</p>
            <h3>{product.name}</h3>
            <p className="preview-card-description">{product.description}</p>
            <p className="preview-card-price">{formatPrice(product.price)}</p>
            <button
              className="shop-card-add"
              aria-label={`Add ${product.name} to bag`}
              onClick={() => onAddToBag(product.id)}
            >
              Add to bag
            </button>
          </ScrollReveal>
        ))}
      </div>
      <ModelCompare />
      <nav aria-label="Shopping guides" className="shop-shortcuts">
        <a href="#preview-stories">Read the listening journal</a>
        <a href="#bag">Review your bag</a>
      </nav>
      <ScrollReveal as="p" className="preview-collection-note">
        A fictional collection for this design demo. Model names and prices are
        illustrative. No purchases are available.
      </ScrollReveal>
    </section>
  );
}
