import React from 'react';
import { useMediaQuery } from '@mui/material';
import Disclosure from '../Disclosure';
import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { collectionHref } from '../collections/collections';
import { products } from '../products';
import { productHref } from '../usePreviewRoute';

const series = (category) => products
  .filter((product) => product.image.category === category)
  .map((product) => [product.name, productHref(product.id)]);

const getGroups = () => [
  ['Shop and learn', [
    ['All headphones', '#preview-direction'],
    ['Over-ear headphones', collectionHref('over-ear')],
    ['In-ear headphones', collectionHref('in-ear')],
    ['Shop the Form series', collectionHref('over-ear', 'models')],
    ['Shop the Pocket series', collectionHref('in-ear', 'models')],
  ]],
  ['Form series', series('over-ear')],
  ['Pocket series', series('in-ear')],
  ['Discover', [
    ['Listening journal', '#preview-stories'],
    ['Compare any two headphones', '#compare-headphones'],
    ['Compare Form models', collectionHref('over-ear', 'compare')],
    ['Compare Pocket models', collectionHref('in-ear', 'compare')],
  ]],
  ['Your space', [
    ['Review your bag', '#bag'],
    ['Account sign-in', '#sign-in'],
    ['Create an account', '#sign-up'],
  ]],
];

export default function StorefrontFooter({ currentPage }) {
  const compact = useMediaQuery('(max-width: 733px)');
  return <footer className="res-footer">
    <div className="rx-wrap">
      <div className="res-footer-notes">
        <p>RESONANCE is a fictional storefront built as a design and engineering portfolio project. Model names, finishes and prices are illustrative, and no purchases, deliveries or payments are processed.</p>
        <p>The bag and saved models are stored only in this browser.</p>
      </div>
      <div className="res-footer-location">
        <a href="#preview-home" aria-label="Resonance storefront"><GraphicEqRounded /></a>
        <ChevronRightRounded aria-hidden="true" /><span>{currentPage}</span>
      </div>
      <nav aria-label="Footer navigation" className="res-footer-directory">
        {getGroups().map(([label, links]) => {
          const list = <ul>{links.map(([text, href]) => <li key={href}><a href={href}>{text}</a></li>)}</ul>;
          return compact
            ? <Disclosure key={label} label={label} heading="h2">{list}</Disclosure>
            : <div key={label}><h2>{label}</h2>{list}</div>;
        })}
      </nav>
      <p className="res-footer-more">
        More ways to shop: <a href="#compare-headphones">compare any two models</a> or <a href="#preview-stories">read the listening journal</a>.
      </p>
      <div className="res-footer-credit">
        <span>Copyright © 2026 RESONANCE concept. Designed and built by Adrian Nasrat.</span>
        <span>Sweden · SEK</span>
      </div>
    </div>
  </footer>;
}
