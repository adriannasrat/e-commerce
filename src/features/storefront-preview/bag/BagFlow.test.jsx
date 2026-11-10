import { products } from "../products";
import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import usePreviewBag from "./usePreviewBag";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BagPage from "./BagPage";
import PreviewHeader from "../PreviewHeader";
import { BAG_STORAGE_KEY } from "./bagState";

const testTheme = createTheme({
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

function BagHarness() {
  const bag = usePreviewBag();
  return (
    <ThemeProvider theme={testTheme}>
      <PreviewHeader bag={bag} />
      <button onClick={() => bag.add("black")}>Add Form 01</button>
      <BagPage bag={bag} />
    </ThemeProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  window.scrollTo = vi.fn();
});

test("adding, changing quantity and removing updates the page, badge and saved bag", () => {
  const { unmount } = render(<BagHarness />);
  fireEvent.click(screen.getByRole("button", { name: "Add Form 01" }));
  expect(
    screen.getByRole("button", { name: "Shopping bag, 1 item" }),
  ).toBeInTheDocument();
  fireEvent.change(
    screen.getByRole("combobox", { name: "Quantity for Form 01" }),
    { target: { value: "3" } },
  );
  expect(
    screen.getByRole("button", { name: "Shopping bag, 3 items" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "5 370 SEK",
  );
  unmount();
  render(<BagHarness />);
  expect(
    screen.getByRole("combobox", { name: "Quantity for Form 01" }),
  ).toHaveValue("3");
  fireEvent.click(screen.getByRole("button", { name: "Remove Form 01" }));
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your bag is empty.",
  );
  expect(JSON.parse(localStorage.getItem(BAG_STORAGE_KEY))).toEqual([]);
});

test("bag icon opens the populated preview with a review-bag link", () => {
  render(<BagHarness />);
  fireEvent.click(screen.getByRole("button", { name: "Add Form 01" }));
  fireEvent.click(screen.getByRole("button", { name: "Shopping bag, 1 item" }));
  const panel = screen.getByRole("dialog", { name: "Bag" });
  expect(within(panel).getByText("Form 01")).toBeInTheDocument();
  expect(
    within(panel).getByRole("link", { name: "Review bag (1)" }),
  ).toHaveAttribute("href", "#bag");
});

test("corrupted saved data falls back to an empty bag", () => {
  localStorage.setItem(BAG_STORAGE_KEY, "{broken");
  render(<BagHarness />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your bag is empty.",
  );
});

test("profile options open the corresponding preview information", async () => {
  render(<BagHarness />);
  fireEvent.click(
    screen.getByRole("button", { name: "Shopping bag, 0 items" }),
  );
  const profile = screen.getByRole("navigation", { name: "My profile" });
  ["Orders", "Your saves", "Account", "Sign in"].forEach((name) => {
    expect(within(profile).getByRole("button", { name })).toBeInTheDocument();
  });
  fireEvent.click(within(profile).getByRole("button", { name: "Orders" }));
  expect(
    await screen.findByRole("dialog", { name: "Orders" }),
  ).toBeInTheDocument();
});

test("adding a suggested product updates the reviewed bag and removes it from suggestions", () => {
  render(<BagHarness />);
  fireEvent.click(screen.getByRole("button", { name: "Add Form 01" }));
  const suggestions = screen.getByRole("region", { name: "You may also like" });
  expect(within(suggestions).getAllByRole("article")).toHaveLength(3);
  fireEvent.click(
    within(suggestions).getByRole("button", { name: "Show more products" }),
  );
  expect(within(suggestions).getAllByRole("article")).toHaveLength(
    products.length - 1,
  );
  fireEvent.click(
    within(suggestions).getByRole("button", { name: "Add Form 02 to bag" }),
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "3 780 SEK",
  );
  expect(
    screen.getByRole("button", { name: "Shopping bag, 2 items" }),
  ).toBeInTheDocument();
  expect(
    within(suggestions).queryByRole("button", { name: "Add Form 02 to bag" }),
  ).not.toBeInTheDocument();
});
