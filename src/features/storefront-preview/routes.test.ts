import { matchRoute, paths } from "./routes";
import { testCatalogue } from "./testCatalogue";

test("every page address reads back as its own page", () => {
  expect(matchRoute(paths.home)).toEqual({ name: "home" });
  expect(matchRoute(paths.store)).toEqual({ name: "store" });
  expect(matchRoute(paths.compare)).toEqual({ name: "compare" });
  expect(matchRoute(paths.journal)).toEqual({ name: "journal" });
  expect(matchRoute(paths.bag)).toEqual({ name: "bag" });
  expect(matchRoute(paths.signIn)).toEqual({ name: "signIn" });
  expect(matchRoute(paths.signUp)).toEqual({ name: "signUp" });
});

test("product and added-to-bag links round-trip every catalogue slug", () => {
  for (const { slug } of testCatalogue) {
    expect(matchRoute(paths.product(slug))).toEqual({ name: "product", id: slug });
    expect(matchRoute(paths.added(slug))).toEqual({ name: "added", id: slug });
  }
});

test("collection links keep their section", () => {
  expect(matchRoute(paths.collection("over-ear"))).toEqual({
    name: "collection",
    id: "over-ear",
  });
  expect(matchRoute(paths.collection("in-ear", "compare"))).toEqual({
    name: "collection",
    id: "in-ear",
    section: "compare",
  });
});

test("a trailing slash is ignored", () => {
  expect(matchRoute("/store/")).toEqual({ name: "store" });
  expect(matchRoute("/product/black/")).toEqual({ name: "product", id: "black" });
});

test("unknown and malformed addresses are not found instead of throwing", () => {
  expect(matchRoute("/preview")).toEqual({ name: "notFound" });
  expect(matchRoute("/over-ear/colours")).toEqual({ name: "notFound" });
  expect(matchRoute("/product/%")).toEqual({ name: "notFound" });
  expect(matchRoute("/product/a/b")).toEqual({ name: "notFound" });
});
