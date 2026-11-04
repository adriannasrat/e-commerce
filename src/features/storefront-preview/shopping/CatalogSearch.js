import React, { useState } from 'react';
import { products, formatPrice } from '../products';
import { productHref } from '../usePreviewRoute';
import HeadphoneImage from '../HeadphoneImage';

export default function CatalogSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const words = query.toLowerCase().replace(/[-\s]+/g, ' ').trim().split(' ');
  const matches = products.filter(model => {
    const text = [model.name, model.finishName, model.image.category].join(' ').toLowerCase().replace(/-/g, ' ');
    return words.every(word => text.includes(word));
  });
  return <div className="shop-search">
    <label>Search headphones<input type="search" value={query} placeholder="Try Form, in-ear or silver" onChange={e => setQuery(e.target.value)} /></label>
    <p role="status">{matches.length ? `${matches.length} matching models` : 'No matching models. Try a different name, finish or fit.'}</p>
    <ul>{matches.map(model => <li key={model.id}><a href={productHref(model.id)} onClick={onSelect}>
      <HeadphoneImage image={model.image} decorative /><span><strong>{model.name}</strong><small>{model.finishName} · {model.image.category}</small></span>
      <span>{formatPrice(model.price)}</span>
    </a></li>)}</ul>
  </div>;
}
