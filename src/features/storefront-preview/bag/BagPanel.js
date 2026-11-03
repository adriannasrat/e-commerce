import React from 'react';
import { Dialog, IconButton, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HeadphoneImage from '../HeadphoneImage';
import { productHref } from '../usePreviewRoute';
import { formatPrice } from '../products';
import BagProfileLinks from './BagProfileLinks';

export default function BagPanel({ open, onClose, bag, onProfile }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  return <Dialog open={open} onClose={onClose} maxWidth={false} fullWidth
    aria-labelledby="bag-panel-title" transitionDuration={reducedMotion ? 0 : 240}
    className="bag-panel-dialog" PaperProps={{ className: 'bag-panel', 'data-open': open }}>
    <div className="bag-panel-inner">
      <IconButton className="bag-panel-close" aria-label="Close bag preview" onClick={onClose}><CloseIcon /></IconButton>
      <div className="bag-panel-heading"><h2 id="bag-panel-title">{bag.count ? 'Bag' : 'Your bag is empty.'}</h2>
        {bag.count > 0 && <a href="#bag" className="bag-button" onClick={onClose}>Review bag ({bag.count})</a>}</div>
      {bag.count ? <>
        <ul className="bag-panel-items">{bag.items.map(({ product, quantity }) => <li key={product.id}>
          <a href={productHref(product.id)} onClick={onClose}><HeadphoneImage image={product.image} decorative />
            <span><strong>{product.name}</strong><small>{product.finishName} · Quantity {quantity}</small></span>
            <span>{formatPrice(product.price * quantity)}</span></a>
        </li>)}</ul>
        <p className="bag-panel-total">Subtotal <strong>{formatPrice(bag.total)}</strong></p>
      </> : <p>Find something that feels like you. <a href="#preview-direction" onClick={onClose}>Explore headphones</a></p>}
      <BagProfileLinks onSelect={onProfile} />
    </div>
  </Dialog>;
}
