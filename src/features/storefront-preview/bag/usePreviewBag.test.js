import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuth } from "../auth/AuthContext";
import { BAG_STORAGE_KEY } from "./bagState";
import usePreviewBag from "./usePreviewBag";
import { mockApi } from "../testApi";

jest.mock("../auth/AuthContext", () => ({ useAuth: jest.fn() }));

const cart = (items) => ({
  id: 1,
  items: items.map(([product_id, amount]) => ({ product_id, amount })),
});

beforeEach(() => {
  localStorage.clear();
  useAuth.mockReturnValue({ user: null });
});

test("a guest's bag moves to the server on sign-in and then leaves the device", async () => {
  const { result, rerender } = renderHook(() => usePreviewBag());
  act(() => result.current.add("black"));
  expect(result.current.count).toBe(1);

  let merged;
  mockApi.on("POST /cart/merge", 200, (body) => {
    merged = body.items;
    return cart([[1, 1], [2, 4]]);
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
  const { result } = renderHook(() => usePreviewBag());
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
  const { result, rerender } = renderHook(() => usePreviewBag());
  act(() => result.current.add("black"));
  mockApi.on("POST /cart/merge", 500, { error: "Something went wrong" });
  useAuth.mockReturnValue({ user: { id: 7 } });
  rerender();
  await waitFor(() => expect(result.current.error).toBe("Something went wrong"));
  expect(JSON.parse(localStorage.getItem(BAG_STORAGE_KEY))).toHaveLength(1);
});
