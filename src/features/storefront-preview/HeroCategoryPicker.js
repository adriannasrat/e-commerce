import React from 'react';

export default function HeroCategoryPicker({ selected, onSelect }) {
  return (
    <div className="preview-category-picker" role="group" aria-label="Headphone category">
      {['over-ear', 'in-ear'].map((category) => (
        <button key={category} type="button" aria-pressed={selected === category}
          onClick={() => onSelect(category)}>
          {category === 'over-ear' ? 'Over-ear' : 'In-ear'}
        </button>
      ))}
    </div>
  );
}
