import { API_PREFIX } from "./api";

// An in-memory stand-in for the API, used by component tests.
const json = (status, data) => ({
  ok: status < 400,
  status,
  headers: { get: () => "application/json" },
  json: async () => data,
});

let routes = {};
export const mockApi = {
  reset() {
    routes = { "GET /users/me": () => json(401, { error: "Sign in required" }) };
  },
  on(route, status, data) {
    routes[route] = (body) => json(status, typeof data === "function" ? data(body) : data);
  },
  fetch: async (url, { method = "GET", body } = {}) => {
    // Requests must use the versioned prefix, as the real API requires.
    if (!url.startsWith(API_PREFIX + "/")) throw new Error(`Unversioned request: ${method} ${url}`);
    const path = url.slice(API_PREFIX.length);
    const route = routes[`${method} ${path}`];
    if (!route) throw new Error(`Unexpected request: ${method} ${path}`);
    return route(body === undefined ? undefined : JSON.parse(body));
  },
};
