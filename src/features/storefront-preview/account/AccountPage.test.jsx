import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import StorefrontPreview from "../StorefrontPreview";
import { mockApi } from "../testApi";

vi.mock("../theme", async () => {
  const { createTheme } = await import("@mui/material/styles");
  return {
    default: createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    }),
  };
});

const order = (id, status, items) => ({
  id,
  status,
  placed_at: "2026-11-20T12:00:00.000Z",
  paid_at: status === "paid" ? "2026-11-20T12:00:00.000Z" : null,
  delivery: "standard",
  delivery_ore: 0,
  subtotal_ore: items.reduce((sum, item) => sum + item.amount * item.unit_price_ore, 0),
  total_ore: items.reduce((sum, item) => sum + item.amount * item.unit_price_ore, 0),
  items,
});
const atlas = { product_id: 1, title: "Atlas", amount: 2, unit_price_ore: 179000 };

beforeEach(() => {
  window.scrollTo = vi.fn();
  localStorage.clear();
  window.history.replaceState({}, "", "/account");
});

test("a signed-out visitor is asked to sign in and comes back here", async () => {
  render(<StorefrontPreview />);
  expect(
    await screen.findByRole("heading", { name: "Sign in to see your account." }),
  ).toHaveFocus();
  expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
    "href",
    "/sign-in?return=%2Faccount",
  );
});

test("the account lists every order, newest first, each linking to its page", async () => {
  mockApi.on("GET /users/me", 200, { id: 1, email: "ada@example.test" });
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  mockApi.on("GET /orders", 200, [
    order(43, "pending", [atlas]),
    order(42, "paid", [{ ...atlas, amount: 1 }]),
  ]);
  render(<StorefrontPreview />);
  expect(await screen.findByRole("heading", { name: "Your account." })).toHaveFocus();
  expect(screen.getByText("ada@example.test")).toBeInTheDocument();
  expect(screen.queryByText(/demo account/)).toBeNull();

  const list = await screen.findByRole("list", { name: "Your orders, newest first" });
  const orders = within(list).getAllByRole("link");
  expect(orders.map((link) => link.getAttribute("href"))).toEqual(["/order/43", "/order/42"]);
  expect(orders[0]).toHaveTextContent("RS-000043");
  expect(orders[0]).toHaveTextContent("Awaiting payment");
  expect(orders[0]).toHaveTextContent("2 items · 3 580 SEK");
  expect(orders[1]).toHaveTextContent("Paid");
});

test("a demo account with no orders says so and how it ends", async () => {
  mockApi.on("GET /users/me", 200, { id: 2, email: "demo-a1b2c3@resonance.test" });
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  mockApi.on("GET /orders", 200, []);
  render(<StorefrontPreview />);
  expect(await screen.findByText(/No orders yet/)).toBeInTheDocument();
  expect(screen.getByText(/Signing out removes it/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Explore headphones" })).toHaveAttribute("href", "/store");
});
