import React, { useRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ScrollReveal from "./ScrollReveal";
import useReveal, { revealDelays } from "./ui/useReveal";

const originalObserver = window.IntersectionObserver;
const originalMatchMedia = window.matchMedia;
afterEach(() => {
  window.IntersectionObserver = originalObserver;
  window.matchMedia = originalMatchMedia;
  jest.useRealTimers();
});

function Page() {
  const root = useRef(null);
  useReveal(root, "page");
  return (
    <main ref={root}>
      <ScrollReveal as="h2">Heading</ScrollReveal>
      <ScrollReveal variant="item" aria-label="First">One</ScrollReveal>
      <ScrollReveal variant="item" aria-label="Second">
        <button>Two</button>
      </ScrollReveal>
    </main>
  );
}

function mockObserver() {
  const observer = { notify: null, observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
  window.IntersectionObserver = jest.fn((callback) => {
    observer.notify = callback;
    return observer;
  });
  return observer;
}

test("hides marked content until it scrolls into view, then staggers cards after the heading", () => {
  jest.useFakeTimers();
  const observer = mockObserver();
  render(<Page />);
  const heading = screen.getByRole("heading");
  const first = screen.getByLabelText("First");
  const second = screen.getByLabelText("Second");
  expect(heading.dataset.revealState).toBe("pending");
  act(() =>
    observer.notify([heading, first, second].map((target) => ({ isIntersecting: true, target }))),
  );
  expect(heading.dataset.revealState).toBe("in");
  expect(heading.style.getPropertyValue("--reveal-delay")).toBe("0ms");
  expect(first.style.getPropertyValue("--reveal-delay")).toBe("300ms");
  expect(second.style.getPropertyValue("--reveal-delay")).toBe("450ms");
  act(() => jest.advanceTimersByTime(2000));
  expect(second.dataset.revealState).toBe("done");
});

test("shows everything immediately when reduced motion is requested", () => {
  window.matchMedia = () => ({ matches: true });
  window.IntersectionObserver = jest.fn();
  render(<Page />);
  expect(screen.getByRole("heading").dataset.revealState).toBe("done");
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
});

test("focus reveals pending content at once so keyboard users never wait", () => {
  mockObserver();
  render(<Page />);
  fireEvent.focusIn(screen.getByRole("button"));
  expect(screen.getByLabelText("Second").dataset.revealState).toBe("done");
});

test("icon rows fade on a short step and long rows stop growing their delay", () => {
  const fades = Array.from({ length: 3 }, () => ({ dataset: { reveal: "fade" } }));
  expect(revealDelays(fades)).toEqual([0, 50, 100]);
  const items = Array.from({ length: 10 }, () => ({ dataset: { reveal: "item" } }));
  expect(revealDelays(items).slice(-2)).toEqual([900, 900]);
});
