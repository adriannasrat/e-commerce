import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Highlights from "./Highlights";
import PreviewHeader from "../PreviewHeader";

const bag = { count: 0, items: [], total: 0 };

test("a global navigation flyout opens from its keyboard button and closes on Escape", () => {
  render(
    <MemoryRouter>
      <PreviewHeader bag={bag} />
    </MemoryRouter>,
  );
  const toggle = screen.getByRole("button", { name: "Over-ear menu" });
  expect(screen.queryByRole("link", { name: "Explore all Over-ear" })).toBeNull();
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.getByRole("link", { name: "Explore all Over-ear" }),
  ).toHaveAttribute("href", "/over-ear");
  fireEvent.keyDown(window, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("highlights expose one active slide and can be paused or jumped to", () => {
  render(<Highlights />);
  const region = screen.getByRole("region", { name: "Get the highlights." });
  const slides = within(region).getAllByRole("group", { hidden: true });
  expect(slides.filter((slide) => slide.getAttribute("aria-hidden") === "false")).toHaveLength(1);
  fireEvent.click(screen.getByRole("button", { name: "Show highlight 2: Pocket 05" }));
  expect(
    screen.getByRole("button", { name: "Show highlight 2: Pocket 05" }),
  ).toHaveAttribute("aria-current", "true");
  expect(
    within(region).getByRole("link", { name: "Learn more about Pocket 05" }),
  ).toHaveAttribute("href", "/product/pocket-05");
  fireEvent.click(screen.getByRole("button", { name: "Pause highlights" }));
  expect(screen.getByRole("button", { name: "Play highlights" })).toBeInTheDocument();
});
