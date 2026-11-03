import React from 'react';

export default function StorefrontLink({ href, onClick, children }) {
  return (
    <a className="preview-storefront-link" href={href} onClick={onClick}>
      {children}
    </a>
  );
}
