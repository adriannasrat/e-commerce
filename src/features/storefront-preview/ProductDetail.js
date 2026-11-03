import React, { useLayoutEffect, useRef, useState } from 'react';
import { Dialog, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HeadphoneImage from './HeadphoneImage';
import ProductPlaceholder from './ProductPlaceholder';
import ScrollReveal from './ScrollReveal';
import { products, formatPrice } from './products';
import { productHref } from './usePreviewRoute';
import ProductPurchaseOptions from './ProductPurchaseOptions';
import ProductInformation from './ProductInformation';
import RelatedProducts from './RelatedProducts';

const finishColors = { Graphite: '#363735', Chalk: '#eeede7', Silver: '#b6b8ba', Crimson: '#a92c38' };

export default function ProductDetail({ product, onAddToBag }) {
  const title = useRef(null);
  const [imageView, setImageView] = useState('full');
  const [zoom, setZoom] = useState(false);
  const [failedImages, setFailedImages] = useState({});
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const category = product.image.category === 'over-ear' ? 'Over-ear' : 'In-ear';
  const alternatives = products.filter(item => item.image.category === product.image.category);

  useLayoutEffect(() => {
    title.current.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const photo = failedImages[product.id] ? <ProductPlaceholder finish={product.image.finish} /> :
    <HeadphoneImage image={product.image} onError={() => setFailedImages(previous => ({ ...previous, [product.id]: true }))} />;

  return (
    <div className="product-detail">
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <a href="#preview-direction">The collection</a><span aria-hidden="true">/</span><span>{product.name}</span>
      </nav>
      <div className="product-detail-layout">
        <ScrollReveal className="product-detail-summary" delay={80}>
          <p className="product-detail-eyebrow">RESONANCE / {category.toUpperCase()}</p>
          <h1 ref={title} tabIndex={-1}>{product.name}</h1>
          <p className="product-detail-tagline">{product.tagline}</p>
          <p className="product-detail-price">{formatPrice(product.price)} <span>Demo price</span></p>
          <div className="product-detail-finishes">
            <h2>Find your finish.</h2>
            <p>{product.finishName} <span>— {product.name}</span></p>
            <nav aria-label="Explore models and finishes">
              {alternatives.map(item => <a key={item.id} href={productHref(item.id)}
                aria-current={item.id === product.id ? 'page' : undefined}
                aria-label={`${item.finishName}, ${item.name}, ${formatPrice(item.price)}`}>
                <span className="product-detail-swatch" style={{ '--finish-color': finishColors[item.finishName] }} />
                <span>{item.finishName}</span>
              </a>)}
            </nav>
            <small>Each finish is a separate concept model, with its own price.</small>
          </div>
          <ProductPurchaseOptions product={product} onAddToBag={onAddToBag} />
        </ScrollReveal>
        <ScrollReveal className="product-detail-gallery">
          <button className="product-detail-photo" data-view={imageView} onClick={() => setZoom(true)} aria-label={`Enlarge ${product.name} image`} aria-haspopup="dialog">
            {photo}<span className="product-detail-enlarge">Take a closer look <span aria-hidden="true">+</span></span>
          </button>
          <div className="product-detail-thumbnails" role="group" aria-label="Product image view">
            {['full', 'detail'].map(view => <button key={view} aria-label={view === 'full' ? 'Full product view' : 'Close-up view'} aria-pressed={imageView === view} onClick={() => setImageView(view)}>
              <span className={`product-detail-thumbnail-${view}`}><HeadphoneImage image={product.image} decorative /></span>
            </button>)}
          </div>
          <p>{product.name} / {product.finishName}</p>
        </ScrollReveal>
      </div>
      <ProductInformation product={product} category={category} />
      <RelatedProducts product={product} />
      <Dialog open={zoom} onClose={() => setZoom(false)} fullWidth maxWidth="md"
        aria-labelledby="product-zoom-title" transitionDuration={reducedMotion ? 0 : 250}
        PaperProps={{ className: 'product-detail-zoom' }}>
        <IconButton aria-label="Close enlarged image" onClick={() => setZoom(false)}><CloseIcon /></IconButton>
        <h2 id="product-zoom-title">{product.name} enlarged image</h2>
        {photo}
      </Dialog>
    </div>
  );
}
