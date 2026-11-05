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
  fetch: async (path, { method = "GET", body } = {}) => {
    const route = routes[`${method} ${path}`];
    if (!route) throw new Error(`Unexpected request: ${method} ${path}`);
    return route(body === undefined ? undefined : JSON.parse(body));
  },
};
