import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ProductShowcase from './ProductShowcase';

test('shows one card per category with matching collection links', () => {
  render(<ProductShowcase />);
  expect(screen.getAllByRole('article')).toHaveLength(2);
  ['Over-ear', 'In-ear'].forEach(name => {
    const tile = screen.getByRole('article', { name });
    const learnMore = within(tile).getByRole('link', { name: `Learn more about ${name} headphones` });
    const buy = within(tile).getByRole('link', { name: `Buy ${name} headphones` });
    expect(learnMore.getAttribute('href')).toBe(`#preview-${name.toLowerCase()}`);
    expect(buy.getAttribute('href')).toBe(`#preview-${name.toLowerCase()}`);
  });
});
