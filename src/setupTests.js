import { mockApi } from "./features/storefront-preview/testApi";

// Component tests never reach a server. Each test starts signed out.
beforeEach(() => {
  mockApi.reset();
  global.fetch = mockApi.fetch;
});
