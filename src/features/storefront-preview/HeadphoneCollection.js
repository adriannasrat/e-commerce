import ScrollReveal from './ScrollReveal';
import React from 'react';
import HeadphoneImage from './HeadphoneImage';
import { products, formatPrice } from './products';
import { productHref } from './usePreviewRoute';

export default function HeadphoneCollection() {
  return (
    <section className="preview-collection" id="preview-direction" aria-labelledby="preview-direction-title">
      <ScrollReveal as="p" className="preview-eyebrow">01 / FIND YOUR FREQUENCY</ScrollReveal>
      <ScrollReveal className="preview-collection-heading">
        <h2 id="preview-direction-title">Good sound.<br />Individual taste.</h2>
        <p>Over-ear or in-ear. Your own rhythm.<br />Find the one that feels like you.</p>
      </ScrollReveal>
      <div className="preview-product-grid">
        {products.map((product, index) => (
          <ScrollReveal as="article" className="preview-product-card" key={product.id}
            id={index === products.findIndex(item => item.image.category === product.image.category) ? `preview-${product.image.category}` : undefined} delay={(index % 3) * 80}>
            <a className="preview-card-image" href={productHref(product.id)}
              aria-label={`Explore ${product.name} in ${product.finishName}`}>
              <HeadphoneImage image={product.image} decorative />
            </a>
            <p className="preview-card-finish">{product.finishName}</p>
            <h3>{product.name}</h3>
            <p className="preview-card-description">{product.description}</p>
            <p className="preview-card-price">{formatPrice(product.price)}</p>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal as="p" className="preview-collection-note">A fictional collection for this design demo. Model names and prices are illustrative. No purchases are available.</ScrollReveal>
    </section>
  );
}
