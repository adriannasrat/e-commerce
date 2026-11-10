import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import StorefrontPreview from '../StorefrontPreview';
import { BAG_STORAGE_KEY } from '../bag/bagState';

beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

test('adding opens recommendations, extra items stay on the page, and refresh does not add duplicates', async () => {
  window.history.replaceState(null, '', '#product/black');
  const { unmount } = render(<StorefrontPreview />);
  fireEvent.click(screen.getByRole('button', { name: 'Add to bag' }));
  expect(await screen.findByRole('heading', { name: 'Added to your bag.' })).toBeInTheDocument();
  expect(window.location.hash).toBe('#added/black');
  const white = screen.getByRole('article', { name: 'Form 02' });
  fireEvent.click(within(white).getByRole('button', { name: 'Add to bag' }));
  expect(window.location.hash).toBe('#added/black');
  expect(screen.getByRole('button', { name: 'Shopping bag, 2 items' })).toBeInTheDocument();
  unmount();
  render(<StorefrontPreview />);
  expect(JSON.parse(localStorage.getItem(BAG_STORAGE_KEY))).toEqual([{ id: 'black', quantity: 1 }, { id: 'white', quantity: 1 }]);
  fireEvent.click(screen.getAllByRole('link', { name: 'Review bag (2)' })[0]);
  expect(await screen.findByRole('heading', { name: /Your bag total/ })).toBeInTheDocument();
});
