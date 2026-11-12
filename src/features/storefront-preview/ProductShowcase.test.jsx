import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import ProductShowcase from "./ProductShowcase";

test("shows one promo tile per category with matching collection links", () => {
  render(<ProductShowcase />);
  expect(screen.getAllByRole("article")).toHaveLength(6);
  ["Over-ear", "In-ear"].forEach((name) => {
    const tile = screen.getByRole("article", { name });
    const learnMore = within(tile).getByRole("link", {
      name: `Learn more about ${name} headphones`,
    });
    const buy = within(tile).getByRole("link", {
      name: `Buy ${name} headphones`,
    });
    expect(learnMore.getAttribute("href")).toBe(
      `/${name.toLowerCase()}`,
    );
    expect(buy.getAttribute("href")).toBe(
      `/${name.toLowerCase()}/models`,
    );
  });
});

test("model tiles link straight to their product pages", () => {
  render(<ProductShowcase />);
  const tile = screen.getByRole("article", { name: "Pocket 06" });
  expect(
    within(tile).getByRole("link", { name: "Buy Pocket 06" }),
  ).toHaveAttribute("href", "/product/pocket-06");
});
