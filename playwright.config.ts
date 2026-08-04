import { defineConfig, devices } from "@playwright/test";

/**
 * Main Playwright Configuration
 *
 * This configuration sets up:
 * - Multiple browser testing (Chromium, Firefox, WebKit)
 * - Parallel test execution
 * - Screenshot and video recording on failure
 * - Base URL for easier navigation
 * - Retries for flaky tests
 *
 * See https://playwright.dev/docs/test-configuration for more info
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,

  reporter: [["html", { open: "never" }]],

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    // This workspace uses a local static teaching site for deterministic tests.
    baseURL: "http://127.0.0.1:4173",

    // Collect trace when retrying the failed test.
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on failure
    video: "retain-on-failure",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  webServer: {
    command: "npm run site:serve",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
});
