import { useState } from 'react';
import HeadphoneImage from '../HeadphoneImage';
import { formatPrice } from '../products';
import { productHref } from '../usePreviewRoute';

export default function RecommendationCard({ product, bag }) {
  const [expanded, setExpanded] = useState(false);
  const quantity = bag.items.find(item => item.id === product.id)?.quantity || 0;
  return <article className="recommendation-card" aria-labelledby={`recommend-${product.id}`} data-reveal="item">
    <a className="recommendation-image" href={productHref(product.id)} aria-label={`View ${product.name}`}><HeadphoneImage image={product.image} decorative /></a>
    <p className="recommendation-label">{product.image.category} / Concept model</p>
    <h3 id={`recommend-${product.id}`}><a href={productHref(product.id)}>{product.name}</a></h3>
    <p className="recommendation-description">{product.tagline}</p>
    <button className="recommendation-more" aria-expanded={expanded} aria-controls={`recommend-description-${product.id}`} onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Show more'}</button>
    <p id={`recommend-description-${product.id}`} hidden={!expanded}>{product.description}</p>
    <p className="recommendation-finish">Finish — {product.finishName}</p>
    <div className="recommendation-purchase"><strong>{formatPrice(product.price)}</strong><span>Demo price</span>
      <button className="bag-button" disabled={quantity >= 99} onClick={() => bag.add(product.id)}>{quantity >= 99 ? 'Bag limit reached' : 'Add to bag'}</button>
      <small role="status">{quantity ? `${quantity} in your bag` : 'Explore this design'}</small>
    </div>
  </article>;
}
