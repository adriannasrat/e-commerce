import React from 'react';
import './menu-glyph.css';

export default function MenuGlyph({ open }) {
  return <span className="preview-menu-glyph" data-open={open} aria-hidden="true"><span><i /></span><span><i /></span></span>;
}
