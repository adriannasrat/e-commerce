import React from 'react';
import './storefront-link.css';

export default function StorefrontLink({ href, onClick, children }) {
  return (
    <a className="preview-storefront-link" href={href} onClick={onClick}>
      {children}
    </a>
  );
}
