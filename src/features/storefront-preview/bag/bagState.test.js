import { bagReducer, normaliseBag } from './bagState';

test('merges repeated additions and keeps finishes separate', () => {
  let rows = bagReducer([], { type: 'add', id: 'black' });
  rows = bagReducer(rows, { type: 'add', id: 'black' });
  rows = bagReducer(rows, { type: 'add', id: 'white' });
  expect(rows).toEqual([{ id: 'black', quantity: 2 }, { id: 'white', quantity: 1 }]);
  expect(bagReducer(rows, { type: 'remove', id: 'black' })).toEqual([{ id: 'white', quantity: 1 }]);
});

test('validates saved data and rejects invalid quantities', () => {
  expect(normaliseBag(null)).toEqual([]);
  expect(normaliseBag([{ id: 'unknown', quantity: 1 }, null, { id: 'white', quantity: -1 },
    { id: 'black', quantity: 1000 }, { id: 'black', quantity: 1 }])).toEqual([{ id: 'black', quantity: 99 }]);
  const rows = [{ id: 'black', quantity: 1 }];
  [0, -1, 100, NaN, 1.5].forEach(quantity => expect(bagReducer(rows, { type: 'quantity', id: 'black', quantity })).toBe(rows));
});
