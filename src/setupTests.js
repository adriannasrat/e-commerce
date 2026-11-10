import { configure } from "@testing-library/react";
import { setCatalogue } from "./features/storefront-preview/products";
import { mockApi } from "./features/storefront-preview/testApi";
import { testCatalogue } from "./features/storefront-preview/testCatalogue";

// Many tests render the whole storefront, which is slow in jsdom. CI runners
// are several times slower than a development machine, so the defaults of one
// second per wait and five seconds per test are too tight there.
configure({ asyncUtilTimeout: 5000 });
jest.setTimeout(20000);

setCatalogue(testCatalogue);

// Component tests never reach a server. Each test starts signed out.
beforeEach(() => {
  mockApi.reset();
  global.fetch = mockApi.fetch;
});
