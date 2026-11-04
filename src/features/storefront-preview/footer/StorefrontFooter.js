import React from 'react';
import { useMediaQuery } from '@mui/material';
import Disclosure from '../Disclosure';
import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { collectionHref } from '../collections/collections';

const groups = [
  ['Shop', [
    ['All headphones', '#preview-direction'],
    ['Over-ear headphones', collectionHref('over-ear')],
    ['In-ear headphones', collectionHref('in-ear')],
  ]],
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
  const compact = useMediaQuery('(max-width: 600px)');
  return <footer className="res-footer">
    <div className="res-footer-inner">
      <div className="res-footer-location">
        <a href="#preview-home" aria-label="Resonance storefront"><GraphicEqRounded /> RESONANCE</a>
        <ChevronRightRounded aria-hidden="true" /><span>{currentPage}</span>
      </div>
      <nav aria-label="Footer navigation" className="res-footer-directory">
        {groups.map(([label, links]) => {
          const list = <ul>{links.map(([text, href]) => <li key={href}><a href={href}>{text}</a></li>)}</ul>;
          return compact
            ? <Disclosure key={label} label={label} heading="h2">{list}</Disclosure>
            : <div key={label}><h2>{label}</h2>{list}</div>;
        })}
      </nav>
      <div className="res-footer-credit"><span>Designed and built by Adrian Nasrat.</span><span>Sweden · SEK</span></div>
    </div>
  </footer>;
}
