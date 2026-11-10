import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";
import { setCatalogue } from "./features/storefront-preview/products";
import { mockApi } from "./features/storefront-preview/testApi";
import { testCatalogue } from "./features/storefront-preview/testCatalogue";

// Many tests render the whole storefront, which is slow in jsdom. CI runners
// are several times slower than a development machine, so the default of one
// second per wait is too tight there. The per-test limit is in vite.config.mjs.
configure({ asyncUtilTimeout: 5000 });

setCatalogue(testCatalogue);

// Component tests never reach a server. Each test starts signed out.
beforeEach(() => {
  mockApi.reset();
  globalThis.fetch = mockApi.fetch;
});
