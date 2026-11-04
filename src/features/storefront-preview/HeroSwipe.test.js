import React, { useState } from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PreviewHero from "./PreviewHero";

function Hero() {
  const [selected, select] = useState("black");
  return <PreviewHero selected={selected} onSelect={select} />;
}

function swipe(link, x, y) {
  fireEvent.touchStart(link, { touches: [{ clientX: 120, clientY: 120 }] });
  fireEvent.touchEnd(link, {
    changedTouches: [{ clientX: 120 + x, clientY: 120 + y }],
  });
}

test("a horizontal swipe wraps within the selected series and consumes its click", () => {
  render(<Hero />);
  const link = screen.getByRole("link", {
    name: "View selected headphone details",
  });
  swipe(link, 70, 4);
  expect(link).toHaveAttribute("href", "#product/silver");
  expect(fireEvent.click(link, { detail: 1 })).toBe(false);
  fireEvent.click(screen.getByRole("button", { name: "In-ear" }));
  swipe(link, -75, 6);
  expect(link).toHaveAttribute("href", "#product/in-ear-white");
  expect(
    screen.getByRole("button", { name: "White in-ear headphones" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("vertical swipes and cancelled gestures leave the current selection in place; taps can navigate", () => {
  render(<Hero />);
  const link = screen.getByRole("link", {
    name: "View selected headphone details",
  });
  swipe(link, 22, 95);
  expect(link).toHaveAttribute("href", "#product/black");
  fireEvent.touchStart(link, { touches: [{ clientX: 20, clientY: 20 }] });
  fireEvent.touchCancel(link);
  fireEvent.touchEnd(link, { changedTouches: [{ clientX: 140, clientY: 20 }] });
  expect(link).toHaveAttribute("href", "#product/black");
  swipe(link, 1, 2);
  expect(fireEvent.click(link, { detail: 1 })).toBe(true);
});
