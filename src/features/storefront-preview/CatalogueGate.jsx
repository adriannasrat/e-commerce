import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { products, setCatalogue } from "./products";
import StorefrontStyles from "./StorefrontStyles";

// The catalogue does not change while someone shops, so it loads once. The
// shared products list stays the synchronous read model for the storefront.
async function loadCatalogue() {
  setCatalogue(await api("GET", "/products"));
  return products.slice();
}

// The storefront renders once the catalogue is in, so nothing below this has to
// handle a missing product list.
export default function CatalogueGate({ children }) {
  const catalogue = useQuery({
    queryKey: ["catalogue"],
    queryFn: loadCatalogue,
    initialData: products.length ? products.slice() : undefined,
    staleTime: Infinity,
  });

  if (catalogue.data?.length) return children;
  const status = catalogue.isFetching
    ? "loading"
    : catalogue.isError
      ? "error"
      : "empty";
  return (
    <>
      <StorefrontStyles />
      <main className="storefront-status">
        {status === "loading" && <p role="status">Loading the collection…</p>}
        {status === "empty" && <p role="status">The collection is empty right now. Please check back soon.</p>}
        {status === "error" && (
          <div role="alert">
            <p>We could not load the collection.</p>
            <button type="button" className="rx-btn" onClick={() => catalogue.refetch()}>
              Try again
            </button>
          </div>
        )}
      </main>
    </>
  );
}
