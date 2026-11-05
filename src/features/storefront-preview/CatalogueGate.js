import React, { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { products, setCatalogue } from "./products";
import StorefrontStyles from "./StorefrontStyles";

// The storefront renders once the catalogue is in, so nothing below this has to
// handle a missing product list.
export default function CatalogueGate({ children }) {
  const [status, setStatus] = useState(products.length ? "ready" : "loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      setCatalogue(await api("GET", "/products"));
      setStatus(products.length ? "ready" : "empty");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!products.length) load();
  }, [load]);

  if (status === "ready") return children;
  return (
    <>
      <StorefrontStyles />
      <main className="storefront-status">
        {status === "loading" && <p role="status">Loading the collection…</p>}
        {status === "empty" && <p role="status">The collection is empty right now. Please check back soon.</p>}
        {status === "error" && (
          <div role="alert">
            <p>We could not load the collection.</p>
            <button type="button" className="rx-btn" onClick={load}>
              Try again
            </button>
          </div>
        )}
      </main>
    </>
  );
}
