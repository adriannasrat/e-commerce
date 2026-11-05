import React, { useState } from 'react';
import { products, formatPrice } from '../products';
import HeadphoneImage from '../HeadphoneImage';
import { productHref } from '../usePreviewRoute';

export default function ModelCompare() {
  const [selection, setSelection] = useState(['black', 'in-ear-white']);
  const models = selection.map(id => products.find(model => model.id === id));

  function choose(index, id) {
    setSelection(current => current.map((value, slot) => slot === index ? id : value));
  }

  return <section className="shop-compare" aria-labelledby="compare-all-title" data-reveal-group="">
    <small data-reveal="up">The fit guide</small><h2 id="compare-all-title" tabIndex={-1} data-reveal="up">Which pair is yours?</h2>
    <p data-reveal="up">Pick two models from either series to see how they compare.</p>
    <div className="shop-compare-grid">
      {models.map((model, index) => <article key={index} data-reveal="item">
        <label>Headphone {index + 1}
          <select value={model.id} onChange={event => choose(index, event.target.value)}>
            {products.map(option => <option key={option.id} value={option.id} disabled={option.id === selection[1-index]}>{option.name}</option>)}
          </select>
        </label>
        <HeadphoneImage key={model.id} image={model.image} decorative />
        <dl>{[['Fit', model.image.category], ['Finish', model.finishName], ['Price', formatPrice(model.price)]].map(([key, value]) =>
          <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
        <a href={productHref(model.id)}>Explore {model.name}</a>
      </article>)}
    </div>
  </section>;
}
