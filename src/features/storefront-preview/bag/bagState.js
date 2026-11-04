import { products } from "../products";

export const BAG_STORAGE_KEY = "resonance.preview.bag.v1";
export const MAX_QUANTITY = 99;
export function normaliseBag(value) {
  if (!Array.isArray(value)) return [];
  const quantities = new Map();
  value.forEach((row) => {
    if (
      !row ||
      !products.some((product) => product.id === row.id) ||
      !Number.isInteger(row.quantity) ||
      row.quantity < 1
    )
      return;
    quantities.set(
      row.id,
      Math.min(MAX_QUANTITY, (quantities.get(row.id) || 0) + row.quantity),
    );
  });
  return [...quantities].map(([id, quantity]) => ({ id, quantity }));
}
export function bagReducer(rows, action) {
  if (action.type === "add")
    return normaliseBag([...rows, { id: action.id, quantity: 1 }]);
  if (action.type === "remove")
    return rows.filter((row) => row.id !== action.id);
  if (
    action.type === "quantity" &&
    Number.isInteger(action.quantity) &&
    action.quantity >= 1 &&
    action.quantity <= MAX_QUANTITY
  ) {
    return rows.map((row) =>
      row.id === action.id ? { ...row, quantity: action.quantity } : row,
    );
  }
  return rows;
}
