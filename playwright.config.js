const { defineConfig } = require("@playwright/test");

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const webServer =
  process.env.PLAYWRIGHT_START_WEBSERVER === "1"
    ? {
        command: "npm run dev -- --host 127.0.0.1 --port 4173",
        url: "http://127.0.0.1:4173/index.html",
        reuseExistingServer: true,
        timeout: 120000,
      }
    : undefined;

module.exports = defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  ...(webServer ? { webServer } : {}),
  reporter: [["list"], ["html", { open: "never" }]],
});
