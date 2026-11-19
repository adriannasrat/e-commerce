import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import StorefrontPreview from "../StorefrontPreview";
import { mockApi } from "../testApi";
import { BAG_STORAGE_KEY } from "../bag/bagState";
import { goToPayment } from "./payment";

// Leaving for Stripe is recorded instead of followed.
vi.mock("./payment", async (original) => ({
  ...(await original()),
  goToPayment: vi.fn(),
}));

vi.mock("../theme", async () => {
  const { createTheme } = await import("@mui/material/styles");
  return {
    default: createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    }),
  };
});

const user = { id: 1, email: "demo@example.com" };
const cart = { id: 3, items: [{ product_id: 1, amount: 2 }] };
const order = (delivery, deliveryOre, status = "paid") => ({
  id: 42,
  status,
  placed_at: "2026-11-18T12:00:00.000Z",
  paid_at: status === "paid" ? "2026-11-18T12:00:00.000Z" : null,
  delivery,
  delivery_ore: deliveryOre,
  subtotal_ore: 358000,
  total_ore: 358000 + deliveryOre,
  items: [{ product_id: 1, title: "Atlas", amount: 2, unit_price_ore: 179000 }],
});

beforeEach(() => {
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  localStorage.clear();
  goToPayment.mockClear();
});

test("the bag leads to checkout", async () => {
  localStorage.setItem(
    BAG_STORAGE_KEY,
    JSON.stringify([{ id: "black", quantity: 1 }]),
  );
  window.history.replaceState({}, "", "/bag");
  render(<StorefrontPreview />);
  fireEvent.click(
    (await screen.findAllByRole("link", { name: "Check out" }))[0],
  );
  expect(
    await screen.findByRole("heading", {
      name: "Sign in for faster checkout.",
    }),
  ).toHaveFocus();
  expect(window.location.pathname).toBe("/checkout");
});

test("a guest signs in with email, then password, and stays in checkout", async () => {
  localStorage.setItem(
    BAG_STORAGE_KEY,
    JSON.stringify([{ id: "black", quantity: 2 }]),
  );
  window.history.replaceState({}, "", "/checkout");
  render(<StorefrontPreview />);
  const form = await screen.findByRole("form", {
    name: "Sign in to check out",
  });
  fireEvent.click(screen.getByRole("button", { name: "Forgot password?" }));
  expect(
    screen.getByText(/Password recovery is not available yet/),
  ).toBeInTheDocument();
  const checkout = screen.getByRole("region", {
    name: "Sign in for faster checkout.",
  });
  expect(
    within(checkout).getByRole("link", { name: "Create an account" }),
  ).toHaveAttribute("href", "/sign-up?return=%2Fcheckout");

  fireEvent.change(within(form).getByLabelText("Email address"), {
    target: { value: user.email },
  });
  fireEvent.click(within(form).getByRole("button", { name: "Continue" }));
  fireEvent.change(within(form).getByLabelText("Password"), {
    target: { value: "secret-password" },
  });
  mockApi.on("POST /users/signin", 200, user);
  mockApi.on("POST /cart/merge", 200, cart);
  fireEvent.click(within(form).getByRole("button", { name: "Sign in" }));
  expect(
    await screen.findByRole("heading", { name: "Checkout." }),
  ).toBeInTheDocument();
  expect(window.location.pathname).toBe("/checkout");
});

test("express delivery is added to the total, and the order goes to Stripe to be paid", async () => {
  mockApi.on("GET /users/me", 200, user);
  mockApi.on("GET /cart", 200, cart);
  window.history.replaceState({}, "", "/checkout");
  render(<StorefrontPreview />);
  const summary = await screen.findByRole("complementary", {
    name: "Order summary",
  });
  expect(summary).toHaveTextContent("Total3 580 SEK");
  expect(screen.getByText("4242 4242 4242 4242")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("radio", { name: /Express delivery/ }));
  expect(summary).toHaveTextContent("Delivery149 SEK");
  expect(summary).toHaveTextContent("Total3 729 SEK");

  mockApi.on("POST /orders", 409, { error: "Only 1 of Atlas left in stock" });
  fireEvent.click(screen.getByRole("button", { name: "Continue to payment" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Only 1 of Atlas left in stock",
  );

  let sent;
  mockApi.on("POST /orders", 201, (body) => {
    sent = body;
    return { ...order("express", 14900, "pending"), checkout_url: "https://checkout.stripe.com/c/pay/cs_test_42" };
  });
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  fireEvent.click(screen.getByRole("button", { name: "Continue to payment" }));
  await waitFor(() =>
    expect(goToPayment).toHaveBeenCalledWith("https://checkout.stripe.com/c/pay/cs_test_42"),
  );
  expect(sent).toEqual({ cartId: 3, delivery: "express" });
});

test("back from Stripe, the order page waits for the confirmation", async () => {
  mockApi.on("GET /users/me", 200, user);
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  mockApi.on("GET /orders/42", 200, order("express", 14900, "pending"));
  window.history.replaceState({}, "", "/order/42?payment=done");
  render(<StorefrontPreview />);
  expect(
    await screen.findByRole("heading", { name: "Confirming your payment." }),
  ).toBeInTheDocument();

  mockApi.on("GET /orders/42", 200, order("express", 14900));
  expect(
    await screen.findByRole("heading", { name: "Your order is placed." }, { timeout: 4000 }),
  ).toBeInTheDocument();
  expect(screen.getByText("RS-000042")).toBeInTheDocument();
  expect(screen.getByText(/Express delivery to/)).toBeInTheDocument();
  expect(screen.getByText("3 729 SEK")).toBeInTheDocument();
});

test("an unpaid order can go back to Stripe, and a cancelled one says why", async () => {
  mockApi.on("GET /users/me", 200, user);
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  mockApi.on("GET /orders/42", 200, order("standard", 0, "pending"));
  window.history.replaceState({}, "", "/order/42");
  const { unmount } = render(<StorefrontPreview />);
  expect(
    await screen.findByRole("heading", { name: "Complete your payment." }),
  ).toBeInTheDocument();
  mockApi.on("POST /orders/42/payment", 200, { checkout_url: "https://checkout.stripe.com/c/pay/cs_test_42" });
  fireEvent.click(screen.getByRole("button", { name: "Continue to payment" }));
  await waitFor(() =>
    expect(goToPayment).toHaveBeenCalledWith("https://checkout.stripe.com/c/pay/cs_test_42"),
  );
  unmount();

  mockApi.on("GET /orders/42", 200, order("standard", 0, "cancelled"));
  render(<StorefrontPreview />);
  expect(
    await screen.findByRole("heading", { name: "This order was cancelled." }),
  ).toBeInTheDocument();
  expect(screen.getByText(/nothing was charged/)).toBeInTheDocument();
});

test("an order is shown only to a signed-in owner", async () => {
  window.history.replaceState({}, "", "/order/42");
  const { unmount } = render(<StorefrontPreview />);
  expect(
    await screen.findByRole("heading", { name: "Sign in to see this order." }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
    "href",
    "/sign-in?return=%2Forder%2F42",
  );
  unmount();

  mockApi.on("GET /users/me", 200, user);
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  mockApi.on("GET /orders/42", 404, { error: "Order not found" });
  render(<StorefrontPreview />);
  expect(
    await screen.findByRole("heading", { name: "Order not found." }),
  ).toBeInTheDocument();
});

test("signing in from checkout returns there", async () => {
  window.history.replaceState({}, "", "/sign-in?return=%2Fcheckout");
  render(<StorefrontPreview />);
  expect(
    await screen.findByRole("link", { name: "Back to checkout" }),
  ).toHaveAttribute("href", "/checkout");
  expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
    "href",
    "/sign-up?return=%2Fcheckout",
  );
  fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
    target: { value: user.email },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "secret-password" },
  });
  mockApi.on("POST /users/signin", 200, user);
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
  await waitFor(() => expect(window.location.pathname).toBe("/checkout"));
});

test("a return address off this site is ignored", async () => {
  window.history.replaceState({}, "", "/sign-in?return=%2F%2Fevil.example");
  render(<StorefrontPreview />);
  fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
    target: { value: user.email },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "secret-password" },
  });
  mockApi.on("POST /users/signin", 200, user);
  mockApi.on("GET /cart", 200, { id: null, items: [] });
  fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
  await waitFor(() => expect(window.location.pathname).toBe("/"));
});
