import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { products } from "../products";
import { BAG_STORAGE_KEY, bagReducer, normaliseBag } from "./bagState";

function readBag() {
  try {
    return normaliseBag(JSON.parse(localStorage.getItem(BAG_STORAGE_KEY)));
  } catch {
    return [];
  }
}

const toRows = (cart) =>
  cart.items.flatMap((item) => {
    const product = products.find(({ apiId }) => apiId === item.product_id);
    return product ? [{ id: product.id, quantity: item.amount }] : [];
  });
const apiId = (id) => products.find((product) => product.id === id)?.apiId;

// One bag for the whole storefront: this device's storage for a guest, the
// server's cart when signed in. A guest's bag moves to the server on sign-in.
export default function usePreviewBag() {
  const { user } = useAuth();
  const userId = user?.id;
  const [guestRows, dispatch] = useReducer(bagReducer, undefined, readBag);
  const [serverRows, setServerRows] = useState([]);
  const [error, setError] = useState("");
  const guestRowsRef = useRef(guestRows);
  guestRowsRef.current = guestRows;
  // Updated with each response, ahead of the render that shows it.
  const serverRowsRef = useRef(serverRows);
  const showCart = useCallback((cart) => {
    serverRowsRef.current = toRows(cart);
    setServerRows(serverRowsRef.current);
  }, []);
  // Changes run one at a time, so each builds on the previous result.
  const queue = useRef(Promise.resolve());

  useEffect(() => {
    try {
      localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(guestRows));
    } catch {
      /* The bag still works in memory when storage is unavailable. */
    }
  }, [guestRows]);

  const sync = useCallback((request) => {
    queue.current = queue.current.then(async () => {
      try {
        showCart(await request());
        setError("");
      } catch (failure) {
        setError(failure.message);
        throw failure;
      }
    });
    return queue.current.catch(() => {});
  }, [showCart]);

  useEffect(() => {
    if (!userId) {
      showCart({ items: [] });
      setError("");
      return;
    }
    const guest = guestRowsRef.current;
    if (!guest.length) {
      sync(() => api("GET", "/cart"));
      return;
    }
    const items = guest.map(({ id, quantity }) => ({ product_id: apiId(id), amount: quantity }));
    // The guest bag stays until the server has it, so a failure loses nothing.
    queue.current = queue.current
      .then(() => api("POST", "/cart/merge", { items }))
      .then((cart) => {
        showCart(cart);
        guest.forEach(({ id }) => dispatch({ type: "remove", id }));
      })
      .catch((failure) => setError(failure.message));
  }, [userId, sync, showCart]);

  const setAmount = (id, amount) =>
    sync(() => api("PUT", `/cart/items/${apiId(id)}`, { amount: amount(id) }));
  const current = (id) => serverRowsRef.current.find((row) => row.id === id)?.quantity || 0;

  const rows = userId ? serverRows : guestRows;
  const items = rows.map((row) => ({
    ...row,
    product: products.find((product) => product.id === row.id),
  }));
  return {
    items,
    error,
    refresh: () => (userId ? sync(() => api("GET", "/cart")) : Promise.resolve()),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    ),
    add: (id) =>
      userId ? setAmount(id, () => current(id) + 1) : dispatch({ type: "add", id }),
    remove: (id) =>
      userId ? setAmount(id, () => 0) : dispatch({ type: "remove", id }),
    setQuantity: (id, quantity) =>
      userId ? setAmount(id, () => quantity) : dispatch({ type: "quantity", id, quantity }),
  };
}
