import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { matchRoute, paths } from "./routes";

export const productHref = paths.product;

export default function usePreviewRoute() {
  const { pathname } = useLocation();
  return useMemo(() => ({ pathname, ...matchRoute(pathname) }), [pathname]);
}
