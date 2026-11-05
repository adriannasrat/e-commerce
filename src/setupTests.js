import { setCatalogue } from "./features/storefront-preview/products";
import { mockApi } from "./features/storefront-preview/testApi";
import { testCatalogue } from "./features/storefront-preview/testCatalogue";

setCatalogue(testCatalogue);

// Component tests never reach a server. Each test starts signed out.
beforeEach(() => {
  mockApi.reset();
  global.fetch = mockApi.fetch;
});
