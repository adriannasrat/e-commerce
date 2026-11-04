import React from "react";
import StorefrontLink from "./StorefrontLink";
import { formatPrice } from "./products";

export default function HeroProductInfo({ product }) {
  return (
    <div className="preview-hero-bottom">
      <div
        key={product.id}
        className="preview-product-info"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="preview-eyebrow">{product.finishName} / CONCEPT MODEL</p>
        <h2>{product.name}</h2>
        <p>{product.tagline}</p>
        <p className="preview-demo-price">
          {formatPrice(product.price)} <span>Demo price</span>
        </p>
      </div>
      <StorefrontLink href="#preview-direction">
        Explore headphones
      </StorefrontLink>
    </div>
  );
}
