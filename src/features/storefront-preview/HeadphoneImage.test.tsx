import { act, render } from "@testing-library/react";
import HeadphoneImage from "./HeadphoneImage";
import type { Cutout } from "./catalogueMedia";

const image: Cutout = {
  id: "x",
  category: "over-ear",
  label: "X",
  src: "/media/products/x.webp",
  sources: [
    { width: 640, src: "/media/products/x-640w.webp" },
    { width: 1280, src: "/media/products/x-1280w.webp" },
    { width: 2000, src: "/media/products/x.webp" },
  ],
  finish: "graphite",
  width: 2000,
  height: 2000,
  bounds: [0, 0, 2000, 2000],
};

// jsdom has no layout, so the drawn width and the observer are stood in for.
let drawnWidth = 0;
let resize = () => {};
beforeEach(() => {
  drawnWidth = 0;
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: () => void) {
        resize = callback;
      }
      observe() {
        resize();
      }
      disconnect() {}
    },
  );
  vi.spyOn(SVGElement.prototype, "getBoundingClientRect").mockImplementation(
    () => ({ width: drawnWidth }) as DOMRect,
  );
  vi.stubGlobal("devicePixelRatio", 2);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const href = (container: HTMLElement) =>
  container.querySelector("image")?.getAttribute("href");

test("loads nothing until the frame has a size, then the smallest sharp copy", () => {
  const { container } = render(<HeadphoneImage image={image} />);
  expect(href(container)).toBeUndefined();

  // About 200 CSS pixels at twice the pixel density need the 640 copy.
  drawnWidth = 200;
  act(() => resize());
  expect(href(container)).toBe("/media/products/x-640w.webp");
});

test("moves to a larger copy when the frame grows, never back to a smaller one", () => {
  drawnWidth = 200;
  const { container } = render(<HeadphoneImage image={image} />);
  drawnWidth = 1200;
  act(() => resize());
  expect(href(container)).toBe("/media/products/x.webp");
  drawnWidth = 100;
  act(() => resize());
  expect(href(container)).toBe("/media/products/x.webp");
});

test("an image without copies uses its original", () => {
  const { container } = render(
    <HeadphoneImage image={{ ...image, sources: [] }} />,
  );
  expect(href(container)).toBe("/media/products/x.webp");
});
