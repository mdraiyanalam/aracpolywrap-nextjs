import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

// `true` when testing the static export (GitHub Pages build in out/) instead of the Node server.
const staticExport = process.env.E2E_STATIC_EXPORT === "true";

// Lets sandboxes with a pre-installed Chromium skip `npx playwright install`.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;

/**
 * End-to-end tests run against a production artefact: by default the standalone server that
 * also ships in the Docker image; with E2E_STATIC_EXPORT=true the static export in out/, served
 * the way GitHub Pages serves it (`npm run test:e2e:static`).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], launchOptions: { executablePath } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], launchOptions: { executablePath } },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: staticExport ? "node scripts/serve-static.mjs" : "node .next/standalone/server.js",
        env: { PORT: String(PORT), HOSTNAME: "127.0.0.1" },
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
