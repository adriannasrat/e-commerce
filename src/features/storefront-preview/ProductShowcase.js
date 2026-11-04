import React from 'react';
import { collectionHref } from './collections/collections';
import HeadphoneImage from './HeadphoneImage';
import ScrollReveal from './ScrollReveal';
import { products } from './products';

const tiles = [
  { id: 'white', category: 'over-ear', name: 'Over-ear', tone: 'chalk', caption: 'A little space. Just for you.' },
  { id: 'in-ear-black', category: 'in-ear', name: 'In-ear', tone: 'dark', caption: 'Your everyday. In your pocket.' },
];

export default function ProductShowcase() {
  return (
    <section className="product-showcase" id="preview-showcase" aria-labelledby="showcase-title">
      <ScrollReveal className="product-showcase-heading">
        <p>SHOP BY CATEGORY</p>
        <h2 id="showcase-title">Two ways to listen.</h2>
      </ScrollReveal>
      <div className="product-showcase-grid">
        {tiles.map(({ id, category, name, tone, caption }, index) => {
          const product = products.find(item => item.id === id);
          return (
            <ScrollReveal as="article" key={id} delay={(index % 2) * 80}
              className={`product-showcase-tile product-showcase-${tone}`}
              aria-labelledby={`showcase-${id}`}>
              <div className="product-showcase-copy">
                <p className="product-showcase-category">{category === 'over-ear' ? 'FORM SERIES' : 'POCKET SERIES'}</p>
                <h3 id={`showcase-${id}`}>{name}</h3>
                <p className="product-showcase-caption">{caption}</p>
                <div className="product-showcase-actions">
                  <a className="product-showcase-primary" href={collectionHref(category)} aria-label={`Learn more about ${name} headphones`}>Learn more</a>
                  <a className="product-showcase-secondary" href={collectionHref(category, 'models')} aria-label={`Buy ${name} headphones`}>Buy</a>
                </div>
              </div>
              <a className="product-showcase-image" href={collectionHref(category)} aria-label={`Explore ${name} headphones`}>
                <HeadphoneImage image={product.image} decorative />
              </a>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
