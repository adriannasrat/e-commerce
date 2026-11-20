import { mediaSources, mediaSrcSet } from "./media";

test("an image lists its smaller copies, smallest first, and then the original", () => {
  expect(mediaSources("products/drift.webp")).toEqual([
    { width: 640, src: "/media/products/drift-640w.webp" },
    { width: 1108, src: "/media/products/drift.webp" },
  ]);
  expect(mediaSrcSet("products/drift.webp")).toBe(
    "/media/products/drift-640w.webp 640w, /media/products/drift.webp 1108w",
  );
});

test("an image without copies has no sources and no srcset", () => {
  expect(mediaSources("products/unknown.webp")).toEqual([]);
  expect(mediaSrcSet("products/unknown.webp")).toBeUndefined();
});
