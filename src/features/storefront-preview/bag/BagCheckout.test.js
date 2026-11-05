import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import BagPage from "./BagPage";
import { products } from "../products";

beforeEach(() => {
  window.scrollTo = jest.fn();
});

const bagWith = (overrides) => ({
  items: [{ id: "black", quantity: 1, product: products[0] }],
  count: 1,
  total: 1790,
  add: () => {},
  remove: () => {},
  setQuantity: () => {},
  ...overrides,
});

const openCheckout = () =>
  fireEvent.click(screen.getAllByRole("button", { name: "Express checkout" })[0]);

test("a guest is asked to sign in before paying", () => {
  render(<BagPage bag={bagWith({ signedIn: false })} />);
  openCheckout();
  expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "#sign-in");
  expect(screen.queryByRole("button", { name: "Place order" })).toBeNull();
});

test("a refused order explains why, and a placed one confirms it", async () => {
  const checkout = async () => {
    throw new Error("Only 0 of Form 01 left in stock");
  };
  const { rerender } = render(<BagPage bag={bagWith({ signedIn: true, checkout })} />);
  openCheckout();
  fireEvent.click(screen.getByRole("button", { name: "Place order" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Only 0 of Form 01 left in stock");

  rerender(<BagPage bag={bagWith({ signedIn: true, checkout: async () => ({ id: 42, total_ore: 179000 }) })} />);
  fireEvent.click(screen.getByRole("button", { name: "Place order" }));
  expect(await screen.findByText(/Order 42 is placed/)).toBeInTheDocument();
});
