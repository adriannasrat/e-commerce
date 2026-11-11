export type CollectionId = "over-ear" | "in-ear";
export type CollectionSection = "models" | "compare";

// Every link and navigation in the storefront is built here, so the address
// scheme can change in one place.
export const paths = {
  home: "#preview-home",
  store: "#preview-direction",
  compare: "#compare-headphones",
  journal: "#preview-stories",
  bag: "#bag",
  signIn: "#sign-in",
  signUp: "#sign-up",
  product: (id: string) => `#product/${encodeURIComponent(id)}`,
  added: (id: string) => `#added/${encodeURIComponent(id)}`,
  collection: (id: CollectionId, section?: CollectionSection) =>
    `#collection/${id}${section ? "/" + section : ""}`,
};
