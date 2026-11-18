import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import ProductShowcase from "./ProductShowcase";
import { products } from "./products";

test("shows one tile per model, each linking to its product page", () => {
  render(<ProductShowcase />);
  expect(screen.getAllByRole("article")).toHaveLength(products.length);
  expect(screen.queryByRole("article", { name: "Over-ear" })).toBeNull();
  const tile = screen.getByRole("article", { name: "Pebble" });
  expect(
    within(tile).getByRole("link", { name: "Buy Pebble" }),
  ).toHaveAttribute("href", "/product/pocket-06");
});

test("tiles alternate black and white in a checkerboard, starting black", () => {
  render(<ProductShowcase />);
  const dark = screen
    .getAllByRole("article")
    .map((tile) => tile.classList.contains("product-showcase-dark"));
  expect(dark.slice(0, 4)).toEqual([true, false, false, true]);
});
