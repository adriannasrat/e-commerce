import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
const cartKey = (userId) => ["cart", userId];
// Cart changes and checkout share one scope, so they run one at a time and
// each builds on the previous result.
const cartScope = { id: "cart" };

// One bag for the whole storefront: this device's storage for a guest, the
// server's cart when signed in. A guest's bag moves to the server on sign-in.
export default function usePreviewBag() {
  const { user } = useAuth();
  const userId = user?.id;
  const queryClient = useQueryClient();
  const [guestRows, dispatch] = useReducer(bagReducer, undefined, readBag);
  const [error, setError] = useState("");
  const guestRowsRef = useRef(guestRows);
  guestRowsRef.current = guestRows;

  useEffect(() => {
    try {
      localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(guestRows));
    } catch {
      /* The bag still works in memory when storage is unavailable. */
    }
  }, [guestRows]);

  useEffect(() => setError(""), [userId]);

  // Loading the cart after sign-in also moves the guest bag to the server. The
  // guest bag stays until the server has it, so a failure loses nothing.
  const loadCart = useCallback(async () => {
    const guest = guestRowsRef.current;
    if (!guest.length) return api("GET", "/cart");
    const items = guest.map(({ id, quantity }) => ({ product_id: apiId(id), amount: quantity }));
    const cart = await api("POST", "/cart/merge", { items });
    guest.forEach(({ id }) => dispatch({ type: "remove", id }));
    return cart;
  }, []);

  const cart = useQuery({
    queryKey: cartKey(userId),
    queryFn: loadCart,
    enabled: Boolean(userId),
    // Only this hook changes the cart, and it writes every result back.
    staleTime: Infinity,
  });

  const latestCart = (owner) =>
    queryClient.ensureQueryData({ queryKey: cartKey(owner), queryFn: loadCart });

  const change = useMutation({
    scope: cartScope,
    mutationFn: async ({ owner, id, amount }) => {
      const current = toRows(await latestCart(owner)).find((row) => row.id === id);
      const next = await api("PUT", `/cart/items/${apiId(id)}`, {
        amount: amount(current?.quantity || 0),
      });
      queryClient.setQueryData(cartKey(owner), next);
      return next;
    },
    onSuccess: () => setError(""),
    onError: (failure) => setError(failure.message),
  });

  const pay = useMutation({
    scope: cartScope,
    mutationFn: async ({ owner }) => {
      const current = await latestCart(owner);
      const order = await api("POST", "/cart/checkout", { cartId: current.id });
      queryClient.setQueryData(cartKey(owner), await api("GET", "/cart"));
      return order;
    },
  });

  const setAmount = (id, amount) =>
    change.mutateAsync({ owner: userId, id, amount }).catch(() => {});

  const rows = userId ? toRows(cart.data ?? { items: [] }) : guestRows;
  const items = rows.map((row) => ({
    ...row,
    product: products.find((product) => product.id === row.id),
  }));
  return {
    items,
    error: error || (cart.isError ? cart.error.message : ""),
    signedIn: Boolean(userId),
    checkout: () => pay.mutateAsync({ owner: userId }),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    ),
    add: (id) =>
      userId ? setAmount(id, (quantity) => quantity + 1) : dispatch({ type: "add", id }),
    remove: (id) =>
      userId ? setAmount(id, () => 0) : dispatch({ type: "remove", id }),
    setQuantity: (id, quantity) =>
      userId ? setAmount(id, () => quantity) : dispatch({ type: "quantity", id, quantity }),
  };
}
