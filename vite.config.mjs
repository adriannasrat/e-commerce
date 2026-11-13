import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The API runs separately. In development, Vite forwards its routes so the
// browser sees one origin and the session cookie stays same-site.
const api = "http://localhost:5001";

// One prefix for every API call, so page paths never reach the API.
const proxy = { "/api": api };

export default defineConfig({
  plugins: [react()],
  // The root .env configures the API. The storefront reads no variables, and
  // loading that file would let its NODE_ENV turn a build into development mode.
  envDir: false,
  server: {
    port: 3000,
    proxy,
  },
  preview: {
    port: 3000,
    proxy,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    // Many tests render the whole storefront, which is slow in jsdom, and CI
    // runners are several times slower than a development machine.
    testTimeout: 20000,
  },
});
