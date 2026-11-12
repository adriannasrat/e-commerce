import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";
import { BAG_STORAGE_KEY } from "./bagState";
import usePreviewBag from "./usePreviewBag";
import { mockApi } from "../testApi";
import { createQueryClient } from "../queryClient";

vi.mock("../auth/AuthContext", () => ({ useAuth: vi.fn() }));

// Each test gets its own query cache.
function renderBag() {
  const client = createQueryClient();
  return renderHook(() => usePreviewBag(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    ),
  });
}

const cart = (items) => ({
  id: 1,
  items: items.map(([product_id, amount]) => ({ product_id, amount })),
});

beforeEach(() => {
  localStorage.clear();
  useAuth.mockReturnValue({ user: null });
});

test("a guest's bag moves to the server on sign-in and then leaves the device", async () => {
  const { result, rerender } = renderBag();
  act(() => result.current.add("black"));
  expect(result.current.count).toBe(1);

  let merged;
  mockApi.on("POST /cart/merge", 200, (body) => {
    merged = body.items;
    return cart([[1, 1], [3, 4]]);
  });
  useAuth.mockReturnValue({ user: { id: 7 } });
  rerender();
  await waitFor(() => expect(result.current.count).toBe(5));
  expect(merged).toEqual([{ product_id: 1, amount: 1 }]);
  expect(JSON.parse(localStorage.getItem(BAG_STORAGE_KEY))).toEqual([]);
});

test("signed-in changes follow the server, in order, and report refusals", async () => {
  useAuth.mockReturnValue({ user: { id: 7 } });
  mockApi.on("GET /cart", 200, cart([]));
  let amounts = [];
  mockApi.on("PUT /cart/items/1", 200, ({ amount }) => {
    amounts.push(amount);
    return cart([[1, amount]]);
  });
  const { result } = renderBag();
  await act(async () => {
    result.current.add("black");
    result.current.add("black");
  });
  await waitFor(() => expect(result.current.count).toBe(2));
  expect(amounts).toEqual([1, 2]);

  mockApi.on("PUT /cart/items/1", 409, { error: "Only 2 left in stock" });
  await act(async () => {
    await result.current.setQuantity("black", 3);
  });
  expect(result.current.error).toBe("Only 2 left in stock");
  expect(result.current.count).toBe(2);
});

test("a failed merge keeps the guest bag for the next attempt", async () => {
  const { result, rerender } = renderBag();
  act(() => result.current.add("black"));
  mockApi.on("POST /cart/merge", 500, { error: "Something went wrong" });
  useAuth.mockReturnValue({ user: { id: 7 } });
  rerender();
  await waitFor(() => expect(result.current.error).toBe("Something went wrong"));
  expect(JSON.parse(localStorage.getItem(BAG_STORAGE_KEY))).toHaveLength(1);
});

test("checkout pays the current cart and leaves it empty", async () => {
  useAuth.mockReturnValue({ user: { id: 7 } });
  mockApi.on("GET /cart", 200, cart([[1, 2]]));
  const { result } = renderBag();
  await waitFor(() => expect(result.current.count).toBe(2));

  let paid;
  mockApi.on("POST /cart/checkout", 200, (body) => {
    paid = body.cartId;
    return { id: 1, total_ore: 358000 };
  });
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  let order;
  await act(async () => {
    order = await result.current.checkout();
  });
  expect(paid).toBe(1);
  expect(order.total_ore).toBe(358000);
  await waitFor(() => expect(result.current.count).toBe(0));
});

test("checkout waits for a change that is still on its way to the server", async () => {
  useAuth.mockReturnValue({ user: { id: 7 } });
  mockApi.on("GET /cart", 200, cart([[1, 1]]));
  const { result } = renderBag();
  await waitFor(() => expect(result.current.count).toBe(1));

  const calls = [];
  let release;
  const held = new Promise((resolve) => (release = resolve));
  const reply = globalThis.fetch;
  globalThis.fetch = async (path, init = {}) => {
    calls.push(`${init.method} ${path}`);
    if (init.method === "PUT") await held;
    return reply(path, init);
  };
  mockApi.on("PUT /cart/items/1", 200, ({ amount }) => cart([[1, amount]]));
  mockApi.on("POST /cart/checkout", 200, { id: 9, total_ore: 537000 });
  mockApi.on("GET /cart", 200, { id: null, items: [] });

  let paying;
  act(() => {
    result.current.setQuantity("black", 3);
    paying = result.current.checkout();
  });
  await new Promise((resolve) => setTimeout(resolve, 20));
  expect(calls).toEqual(["PUT /cart/items/1"]);

  release();
  await act(async () => {
    await paying;
  });
  expect(calls).toEqual(["PUT /cart/items/1", "POST /cart/checkout", "GET /cart"]);
});
