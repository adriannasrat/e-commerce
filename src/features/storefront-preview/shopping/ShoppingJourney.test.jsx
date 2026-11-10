import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import StorefrontPreview from '../StorefrontPreview';
import { collectionModels } from '../collections/collections';

beforeEach(() => {
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  localStorage.clear();
});

test('catalog filters narrow the grid and adding a model opens its confirmation', async () => {
  window.history.replaceState({}, '', '/#preview-direction');
  render(<StorefrontPreview />);
  const filters = screen.getByRole('group', { name: 'Filter by fit' });
  fireEvent.click(within(filters).getByRole('button', { name: 'In-ear' }));
  expect(screen.getAllByRole('button', { name: /Add Pocket .* to bag/ })).toHaveLength(collectionModels('in-ear').length);
  expect(screen.queryByRole('button', { name: /Add Form .* to bag/ })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add Pocket 03 to bag' }));
  expect(await screen.findByRole('heading', { name: /Added to your bag/i })).toBeInTheDocument();
  expect(window.location.hash).toBe('#added/in-ear-red');
});

test('cross-series comparison links to the chosen model and prevents duplicate choices', () => {
  window.history.replaceState({}, '', '/#compare-headphones');
  render(<StorefrontPreview />);
  const compare = screen.getByRole('region', { name: 'Which pair is yours?' });
  fireEvent.change(within(compare).getByLabelText('Headphone 1'), { target: { value: 'silver' } });
  expect(within(compare).getByRole('link', { name: 'Explore Form 03' })).toHaveAttribute('href', '#product/silver');
  expect(within(within(compare).getByLabelText('Headphone 2')).getByRole('option', { name: 'Form 03' })).toBeDisabled();
});

test('search opens a matching product and offers feedback for an empty result', async () => {
  window.history.replaceState({}, '', '/');
  render(<StorefrontPreview />);
  fireEvent.click(screen.getByRole('button', { name: 'Search products' }));
  const dialog = screen.getByRole('dialog', { name: 'Find your frequency' });
  const field = within(dialog).getByRole('searchbox');
  fireEvent.change(field, { target: { value: 'missing' } });
  expect(within(dialog).getByRole('status')).toHaveTextContent('No matching models');
  fireEvent.change(field, { target: { value: 'silver Over Ear' } });
  fireEvent.click(within(dialog).getByRole('link', { name: /Form 03/ }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Form 03' })).toBeInTheDocument();
});
