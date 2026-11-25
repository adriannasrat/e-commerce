import { defineConfig, devices } from "@playwright/test";

// The end-to-end tests run the real storefront build, the real API and a real
// database. Only Stripe is replaced, by e2e/fake-stripe.js, so the tests need
// no network or keys. Every server has its own port, so a development server
// can keep running beside them.
const ports = { site: 4173, api: 5101, stripe: 12111 };
const webhookSecret = "whsec_end_to_end";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${ports.site}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "node e2e/fake-stripe.js",
      port: ports.stripe,
      env: {
        FAKE_STRIPE_PORT: String(ports.stripe),
        WEBHOOK_URL: `http://localhost:${ports.api}/api/v1/payments/webhook`,
        STRIPE_WEBHOOK_SECRET: webhookSecret,
      },
      reuseExistingServer: false,
    },
    {
      // Each run starts from a fresh database with every migration.
      command: "node e2e/prepare-database.js && node backend/server.js",
      url: `http://localhost:${ports.api}/health`,
      env: {
        PORT: String(ports.api),
        DB_NAME: process.env.DB_NAME ?? "shop_test",
        STRIPE_SECRET_KEY: "sk_test_end_to_end",
        STRIPE_WEBHOOK_SECRET: webhookSecret,
        STRIPE_API_URL: `http://localhost:${ports.stripe}`,
        LOG_LEVEL: "warn",
      },
      reuseExistingServer: false,
    },
    {
      command: `npm run build && npx vite preview --port ${ports.site} --strictPort`,
      url: `http://localhost:${ports.site}`,
      env: { API_URL: `http://localhost:${ports.api}` },
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
