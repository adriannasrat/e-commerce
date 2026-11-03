import React from 'react';

export default function ProductPlaceholder({ finish }) {
  return (
    <div className={`preview-product preview-product--${finish}`} aria-hidden="true">
      <div className="preview-product-guide" />
      <div className="preview-headphones">
        <div className="preview-headband" />
        <div className="preview-earcup preview-earcup--left"><span /></div>
        <div className="preview-earcup preview-earcup--right"><span /></div>
      </div>
      <div className="preview-product-shadow" />
    </div>
  );
}
