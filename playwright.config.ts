import { defineConfig } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests",
  workers: 1,
  retries: isCI ? 1 : 0,
  use: {
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    // CI builds first, so exercise the same production server visitors use.
    // Dev mode can cold-compile a route while a short WebGL assertion runs.
    command: isCI ? "npm run start" : "npm run dev -- --webpack",
    url: "http://localhost:3000",
    reuseExistingServer: !isCI,
    timeout: 120000,
  },
});
