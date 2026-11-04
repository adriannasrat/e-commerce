import { useEffect, useReducer } from "react";
import { products } from "../products";
import { BAG_STORAGE_KEY, bagReducer, normaliseBag } from "./bagState";

function readBag() {
  try {
    return normaliseBag(JSON.parse(localStorage.getItem(BAG_STORAGE_KEY)));
  } catch {
    return [];
  }
}
export default function usePreviewBag() {
  const [rows, dispatch] = useReducer(bagReducer, undefined, readBag);
  useEffect(() => {
    try {
      localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(rows));
    } catch {
      /* The bag still works in memory when storage is unavailable. */
    }
  }, [rows]);
  const items = rows.map((row) => ({
    ...row,
    product: products.find((product) => product.id === row.id),
  }));
  return {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    ),
    add: (id) => dispatch({ type: "add", id }),
    remove: (id) => dispatch({ type: "remove", id }),
    setQuantity: (id, quantity) => dispatch({ type: "quantity", id, quantity }),
  };
}
