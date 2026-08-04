import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

/**
 * Custom Test Fixture
 *
 * Fixtures provide a way to set up and tear down test context.
 * They are run before each test and cleaned up after.
 *
 * Benefits:
 * - Consistent test setup
 * - Reusable across all tests
 * - Automatic cleanup
 * - Type-safe
 */

// Define the shape of our fixtures
type TestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
};

// Create extended test with our fixtures
export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    // Setup
    const homePage = new HomePage(page);

    // Use the fixture in the test
    await use(homePage);

    // Teardown (optional)
    // Any cleanup code here
  },

  loginPage: async ({ page }, use) => {
    // Setup
    const loginPage = new LoginPage(page);

    // Use the fixture in the test
    await use(loginPage);

    // Teardown (optional)
  },
});

export { expect } from "@playwright/test";
