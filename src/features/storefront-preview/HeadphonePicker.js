import React from 'react';
import HeadphoneImage from './HeadphoneImage';
import './gallery.css';

export default function HeadphonePicker({ images, selected, onSelect }) {
  const selectedIndex = images.findIndex(({ id }) => id === selected);

  return (
    <div className="preview-gallery-picker" style={{ '--image-count': images.length }} role="group" aria-label="Choose headphone image">
      {images.map((image, index) => {
        const { id, label } = image;
        const position = (index - selectedIndex - 1 + images.length) % images.length;
        return (
        <button key={id} type="button" className="preview-gallery-option"
          style={{ '--position': position, zIndex: images.length - position }}
          aria-label={label} aria-pressed={selected === id} onClick={() => onSelect(id)}>
          <HeadphoneImage image={image} decorative />
        </button>
        );
      })}
    </div>
  );
}
