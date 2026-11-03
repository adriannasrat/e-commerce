import React, { useState } from 'react';
import { productHref } from './usePreviewRoute';
import HeadphoneImage from './HeadphoneImage';
import ProductPlaceholder from './ProductPlaceholder';
import { headphoneImages } from './headphoneImages';

export default function ProductVisual({ selected }) {
  const [failedImages, setFailedImages] = useState({});

  return (
    <a className="preview-product preview-product--photo preview-gallery" href={productHref(selected)} aria-label="View selected headphone details">
      {headphoneImages.map((image) => {
        const { id, finish } = image;
        return (
        <div key={id} className="preview-gallery-slide" data-active={selected === id}
          aria-hidden={selected !== id}>
          {failedImages[id] ? <ProductPlaceholder finish={finish} /> : (
            <HeadphoneImage className="preview-product-photo" image={image}
              onError={() => setFailedImages((previous) => ({ ...previous, [id]: true }))} />
          )}
        </div>
        );
      })}
    </a>
  );
}
