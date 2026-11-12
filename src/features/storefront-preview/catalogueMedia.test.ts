import { productMedia, type ApiMedia } from "./catalogueMedia";

const row = (overrides: Partial<ApiMedia>): ApiMedia => ({
  role: "main", kind: "cutout", position: 0, path: "products/x.webp", poster: null,
  alt: "X", label: null, caption: null, width: 100, height: 80, crop: [10, 5, 90, 75],
  focus: null, tone: "dark", ...overrides,
});

test("the main cut-out becomes the product image, served from the media folder", () => {
  const { image } = productMedia("x", "in-ear", [row({})]);
  expect(image).toEqual({
    id: "x", category: "in-ear", label: "X", src: "/media/products/x.webp",
    finish: "graphite", width: 100, height: 80, bounds: [10, 5, 90, 75],
  });
  expect(productMedia("x", "in-ear", [row({ tone: "light" })]).image?.finish).toBe("chalk");
});

test("gallery rows become views and the film row becomes the page film", () => {
  const { views, film } = productMedia("x", "over-ear", [
    row({}),
    row({ role: "gallery", kind: "photo", position: 2, path: "photos/b.webp", label: "Back", alt: "Back view", focus: "40% 60%" }),
    row({ role: "film", kind: "film", path: "films/x.mp4", poster: "films/x.jpg", label: "In motion.", caption: "Lead", alt: "Turning" }),
  ]);
  expect(views).toEqual([
    { id: "gallery-2", label: "Back", photo: { src: "/media/photos/b.webp", alt: "Back view", focus: "40% 60%" } },
  ]);
  expect(film).toEqual({
    id: "films/x.mp4", src: "/media/films/x.mp4", poster: "/media/films/x.jpg",
    title: "In motion.", lead: "Lead", description: "Turning",
  });
});

test("a product without a main image has none, so the storefront leaves it out", () => {
  expect(productMedia("x", "in-ear", []).image).toBeUndefined();
  expect(productMedia("x", "in-ear", undefined).film).toBeUndefined();
});
