import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import ProductDetail from "./ProductDetail";
import { products, formatPrice } from "./products";

beforeEach(() => {
  window.scrollTo = vi.fn();
});

test.each(products)(
  "renders the matching image, finish and price for $name",
  (product) => {
    render(<ProductDetail product={product} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      product.name,
    );
    expect(screen.getByRole("img", { name: product.image.label })).toBeTruthy();
    expect(
      screen.getByText(formatPrice(product.price).replace(/\s/g, " "), {
        exact: false,
      }),
    ).toBeTruthy();
    const variants = screen.getByRole("group", { name: "Product colours" });
    const selected = within(variants).getByRole("button", { pressed: true });
    expect(selected).toHaveAccessibleName(product.finishName);
    expect(selected).toBeEnabled();
    const unavailable = within(variants).getAllByRole("button", {
      pressed: false,
    });
    unavailable.forEach((button) => {
      expect(button).toBeDisabled();
      fireEvent.click(button);
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      product.name,
    );
  },
);

test("opens the enlarged product image in a labelled dialog", () => {
  render(<ProductDetail product={products[0]} />);
  fireEvent.click(
    screen.getByRole("button", { name: "Enlarge Atlas image" }),
  );
  const dialog = screen.getByRole("dialog", { name: "Atlas enlarged image" });
  expect(
    within(dialog).getByRole("img", {
      name: "Graphite over-ear headphones with brushed metal cups",
    }),
  ).toBeTruthy();
  expect(
    within(dialog).getByRole("button", { name: "Close enlarged image" }),
  ).toBeTruthy();
});

test("changing products resets the gallery, scroll and heading focus", () => {
  const { rerender } = render(<ProductDetail product={products[0]} />);
  fireEvent.click(screen.getByRole("button", { name: "Close-up view" }));
  window.scrollTo.mockClear();
  rerender(<ProductDetail product={products[1]} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Halo",
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveFocus();
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  expect(
    screen.getByRole("button", { name: "Full product view" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("purchase controls add the selected model and save it across visits", () => {
  localStorage.clear();
  const onAddToBag = vi.fn();
  const { unmount } = render(
    <ProductDetail product={products[0]} onAddToBag={onAddToBag} />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Add to bag" }));
  expect(onAddToBag).toHaveBeenCalledWith(products[0].id);
  fireEvent.click(screen.getByRole("button", { name: "Save for later" }));
  expect(
    screen.getByRole("button", { name: "Saved for later" }),
  ).toHaveAttribute("aria-pressed", "true");
  unmount();
  render(<ProductDetail product={products[0]} />);
  fireEvent.click(screen.getByRole("button", { name: "Saved for later" }));
  expect(
    screen.getByRole("button", { name: "Save for later" }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("delivery and payment actions explain the demo without starting checkout", () => {
  render(<ProductDetail product={products[0]} />);
  fireEvent.click(screen.getByRole("button", { name: "Express checkout" }));
  expect(
    screen.getByRole("dialog", { name: /Express checkout/ }),
  ).toHaveTextContent("No payment details are collected");
});

test("recommendation navigation exposes other products", () => {
  render(<ProductDetail product={products[0]} />);
  const next = screen.getByRole("button", { name: "Next recommendations" });
  const pages = screen.getAllByRole("button", { name: /Recommendation page/ });
  pages.slice(1).forEach(() => fireEvent.click(next));
  expect(next).toBeDisabled();
  expect(pages[pages.length - 1]).toHaveAttribute("aria-current", "page");
});

test("models with lifestyle photography offer extra gallery views", () => {
  const pocket = products.find((item) => item.id === "pocket-07");
  render(<ProductDetail product={pocket} />);
  const views = screen.getByRole("group", { name: "Product image view" });
  expect(within(views).getAllByRole("button")).toHaveLength(4);
  fireEvent.click(within(views).getByRole("button", { name: "Prism with its case" }));
  expect(
    screen.getByRole("img", { name: "Prism earbuds beside their slate case on black" }),
  ).toBeInTheDocument();
  fireEvent.click(within(views).getByRole("button", { name: "Prism earbud up close" }));
  expect(
    screen.getByRole("img", { name: "Close-up of a Prism earbud, its metal shell and soft tip" }),
  ).toBeInTheDocument();
});
