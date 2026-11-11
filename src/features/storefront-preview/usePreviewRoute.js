import { useEffect, useState } from "react";
import { paths } from "./routes";

export const productHref = paths.product;

export function productIdFromHash(hash) {
  if (!hash.startsWith("#product/")) return null;
  try {
    return decodeURIComponent(hash.slice(9));
  } catch {
    return "";
  }
}

export default function usePreviewRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const addedId = hash.startsWith("#added/")
    ? productIdFromHash(hash.replace("#added/", "#product/"))
    : null;
  return { hash, productId: productIdFromHash(hash), addedId };
}
