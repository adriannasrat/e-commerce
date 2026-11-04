import React from 'react';
import HeadphoneImage from '../HeadphoneImage';
import ScrollReveal from '../ScrollReveal';
import { productHref } from '../usePreviewRoute';
import { products } from '../products';
import { collections, collectionHref } from './collections';

export default function Campaign({ category, modelId, title, caption }) {
  const collection = collections[category];
  const model = products.find(product => product.id === (modelId || collection.feature));
  return <ScrollReveal as="article" className={`sound-campaign sound-${category}`}>
    <div className="sound-campaign-copy">
      <small>{collection.series} / {model.finishName}</small>
      <h2>{title || model.name}</h2>
      <p>{caption || collection.line}</p>
      <div className="sound-actions">
        <a href={productHref(model.id)}>Explore {model.name}</a>
        <a href={collectionHref(category, 'models')}>Shop {collection.name.toLowerCase()}</a>
      </div>
    </div>
    <a className="sound-art" href={productHref(model.id)} aria-label={`View ${model.name} in ${model.finishName}`}>
      <HeadphoneImage image={model.image} decorative />
    </a>
  </ScrollReveal>;
}
