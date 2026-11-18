export type CollectionId = "over-ear" | "in-ear";
export type CollectionSection = "models" | "compare";

export type Route =
  | { name: "home" | "store" | "compare" | "journal" | "bag" | "signIn" | "signUp" | "checkout" }
  | { name: "product" | "added" | "order"; id: string }
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
  checkout: "/checkout",
  order: (id: string | number) => `/order/${encodeURIComponent(id)}`,
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
  [paths.checkout]: "checkout",
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

  const item = /^\/(product|bag\/added|order)\/([^/]+)$/.exec(path);
  if (item) {
    const id = decode(item[2]);
    if (id === null) return { name: "notFound" };
    const name = item[1] === "bag/added" ? "added" : (item[1] as "product" | "order");
    return { name, id };
  }

  const collection = /^\/(over-ear|in-ear)(?:\/(models|compare))?$/.exec(path);
  if (collection) {
    const id = collection[1] as CollectionId;
    const section = collection[2] as CollectionSection | undefined;
    return section ? { name: "collection", id, section } : { name: "collection", id };
  }

  return { name: "notFound" };
}

// Where to go after signing in, from ?return=. Only paths on this site count,
// so a crafted link cannot send a visitor elsewhere.
export function returnPath(search: string): string | null {
  const target = new URLSearchParams(search).get("return");
  return target && target.startsWith("/") && !target.startsWith("//") ? target : null;
}

export const withReturn = (path: string, target: string | null) =>
  target ? `${path}?return=${encodeURIComponent(target)}` : path;
