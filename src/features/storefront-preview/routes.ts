export type CollectionId = "over-ear" | "in-ear";
export type CollectionSection = "models" | "compare";

export type Route =
  | { name: "home" | "store" | "compare" | "journal" | "bag" | "signIn" | "signUp" }
  | { name: "product" | "added"; id: string }
  | { name: "collection"; id: CollectionId; section?: CollectionSection }
  | { name: "notFound" };

// Every link and navigation in the storefront is built here, and matchRoute
// reads the same addresses back, so the scheme lives in one place.
export const paths = {
  home: "/",
  store: "/store",
  compare: "/compare",
  journal: "/journal",
  bag: "/bag",
  signIn: "/sign-in",
  signUp: "/sign-up",
  product: (id: string) => `/product/${encodeURIComponent(id)}`,
  added: (id: string) => `/bag/added/${encodeURIComponent(id)}`,
  collection: (id: CollectionId, section?: CollectionSection) =>
    `/${id}${section ? "/" + section : ""}`,
};

const pages = {
  [paths.home]: "home",
  [paths.store]: "store",
  [paths.compare]: "compare",
  [paths.journal]: "journal",
  [paths.bag]: "bag",
  [paths.signIn]: "signIn",
  [paths.signUp]: "signUp",
} as const;

function decode(segment: string): string | null {
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

export function matchRoute(pathname: string): Route {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const page = pages[path as keyof typeof pages];
  if (page) return { name: page };

  const item = /^\/(product|bag\/added)\/([^/]+)$/.exec(path);
  if (item) {
    const id = decode(item[2]);
    if (id === null) return { name: "notFound" };
    return { name: item[1] === "product" ? "product" : "added", id };
  }

  const collection = /^\/(over-ear|in-ear)(?:\/(models|compare))?$/.exec(path);
  if (collection) {
    const id = collection[1] as CollectionId;
    const section = collection[2] as CollectionSection | undefined;
    return section ? { name: "collection", id, section } : { name: "collection", id };
  }

  return { name: "notFound" };
}
