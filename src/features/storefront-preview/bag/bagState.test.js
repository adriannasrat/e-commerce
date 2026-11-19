import { MAX_QUANTITY, bagReducer, normaliseBag, quantityLimit } from "./bagState";

test("merges repeated additions and keeps finishes separate", () => {
  let rows = bagReducer([], { type: "add", id: "black" });
  rows = bagReducer(rows, { type: "add", id: "black" });
  rows = bagReducer(rows, { type: "add", id: "silver" });
  expect(rows).toEqual([
    { id: "black", quantity: 2 },
    { id: "silver", quantity: 1 },
  ]);
  expect(bagReducer(rows, { type: "remove", id: "black" })).toEqual([
    { id: "silver", quantity: 1 },
  ]);
});

test("validates saved data and rejects invalid quantities", () => {
  expect(normaliseBag(null)).toEqual([]);
  expect(
    normaliseBag([
      { id: "unknown", quantity: 1 },
      null,
      { id: "silver", quantity: -1 },
      { id: "black", quantity: 1000 },
      { id: "black", quantity: 1 },
    ]),
  ).toEqual([{ id: "black", quantity: 99 }]);
  const rows = [{ id: "black", quantity: 1 }];
  [0, -1, 100, NaN, 1.5].forEach((quantity) =>
    expect(bagReducer(rows, { type: "quantity", id: "black", quantity })).toBe(
      rows,
    ),
  );
});

test("offers no more than the stock, but keeps the amount already chosen", () => {
  expect(quantityLimit({ stock: 3 }, 1)).toBe(3);
  expect(quantityLimit({ stock: 3 }, 5)).toBe(5);
  expect(quantityLimit({ stock: 500 }, 1)).toBe(MAX_QUANTITY);
});
