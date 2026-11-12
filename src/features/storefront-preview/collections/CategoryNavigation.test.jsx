import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import StorefrontPreview from "../StorefrontPreview";
import { collectionModels } from "./collections";

beforeEach(() => {
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

test.each([
  ["over-ear", "Over-ear", "Form 03", "silver"],
  ["in-ear", "In-ear", "Pocket 06", "pocket-06"],
])(
  "opens the %s collection, compares its models and navigates to the selected product",
  async (id, title, model, productId) => {
    window.history.replaceState({}, "", "/");
    render(<StorefrontPreview />);
    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    fireEvent.click(within(navigation).getByRole("link", { name: title }));
    expect(
      await screen.findByRole("heading", { level: 1, name: title }),
    ).toHaveFocus();
    const rail = screen.getByRole("navigation", {
      name: title + " collection navigation",
    });
    fireEvent.click(within(rail).getByRole("link", { name: "Compare" }));
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: "Find your model." }),
      ).toHaveFocus(),
    );
    expect(window.location.pathname).toBe("/" + id + "/compare");
    const table = screen.getByRole("table", { name: /Compare the/ });
    expect(within(table).getAllByRole("columnheader")).toHaveLength(
      collectionModels(id).length + 1,
    );
    fireEvent.click(within(table).getByRole("link", { name: model }));
    expect(
      await screen.findByRole("heading", { level: 1, name: model }),
    ).toHaveFocus();
    expect(window.location.pathname).toBe("/product/" + productId);
  },
);

test("the footer opens the full catalog and journal as separate pages", async () => {
  window.history.replaceState({}, "", "/");
  render(<StorefrontPreview />);
  const directory = screen.getByRole("navigation", {
    name: "Footer navigation",
  });
  expect(
    screen.queryByRole("heading", { name: "The collection." }),
  ).not.toBeInTheDocument();
  fireEvent.click(
    within(directory).getByRole("link", { name: "All headphones" }),
  );
  expect(
    await screen.findByRole("heading", { name: "The collection.", level: 1 }),
  ).toHaveFocus();
  fireEvent.click(
    within(directory).getByRole("link", { name: "Listening journal" }),
  );
  expect(
    await screen.findByRole("heading", {
      name: "Listening journal.",
      level: 1,
    }),
  ).toHaveFocus();
  expect(
    screen.queryByRole("heading", { name: "The collection." }),
  ).not.toBeInTheDocument();
});

test("an unknown address shows a not-found page that leads back to the collection", async () => {
  window.history.replaceState({}, "", "/no-such-page");
  render(<StorefrontPreview />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Page not found." }),
  ).toBeInTheDocument();
  expect(document.title).toBe("Page not found — RESONANCE");
  fireEvent.click(screen.getByRole("link", { name: "Back to the collection" }));
  expect(
    await screen.findByRole("heading", { name: "The collection.", level: 1 }),
  ).toHaveFocus();
  expect(window.location.pathname).toBe("/store");
});
