import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ScrollReveal from "./ScrollReveal";

let mockReducedMotion = false;
jest.mock("@mui/material", () => ({ useMediaQuery: () => mockReducedMotion }));
const originalObserver = window.IntersectionObserver;
afterEach(() => {
  window.IntersectionObserver = originalObserver;
  mockReducedMotion = false;
});

test("reveals on intersection and disconnects instead of replaying on every scroll", () => {
  let notify;
  const disconnect = jest.fn();
  window.IntersectionObserver = jest.fn((callback) => {
    notify = callback;
    return { observe: jest.fn(), disconnect };
  });
  render(
    <ScrollReveal as="section" aria-label="Collection">
      Products
    </ScrollReveal>,
  );
  expect(screen.getByRole("region").getAttribute("data-phase")).toBe("pending");
  act(() => notify([{ isIntersecting: true }]));
  expect(screen.getByRole("region").getAttribute("data-phase")).toBe(
    "entering",
  );
  expect(disconnect).toHaveBeenCalled();
});

test("keeps content available without observing when reduced motion is requested", () => {
  mockReducedMotion = true;
  window.IntersectionObserver = jest.fn();
  render(<ScrollReveal as="button">Explore</ScrollReveal>);
  expect(screen.getByRole("button").textContent).toBe("Explore");
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
});

test("focus settles the entrance so blur cannot restart it", () => {
  let notify;
  window.IntersectionObserver = jest.fn((callback) => {
    notify = callback;
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
  render(
    <ScrollReveal as="section" aria-label="Cards">
      <button>Explore</button>
    </ScrollReveal>,
  );
  fireEvent.focus(screen.getByRole("button"));
  fireEvent.blur(screen.getByRole("button"));
  act(() => notify([{ isIntersecting: true }]));
  expect(screen.getByRole("region").getAttribute("data-phase")).toBe("settled");
});
