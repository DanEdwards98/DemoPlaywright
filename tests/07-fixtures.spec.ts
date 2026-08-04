import { test, expect } from "../fixtures/testBase";

/**
 * LESSON 7: Test Fixtures and Hooks
 *
 * This test file demonstrates:
 * 1. Using custom fixtures
 * 2. beforeEach and afterEach hooks
 * 3. Test setup and teardown
 * 4. Organizing test lifecycle
 *
 * Run with: npm run test -- tests/07-fixtures.spec.ts
 */

test.describe("Lesson 7: Fixtures and Hooks", () => {
  // This runs before each test
  test.beforeEach(async ({ page }) => {
    console.log("Setting up test...");
    await page.goto("/");
  });

  // This runs after each test
  test.afterEach(async ({ page }) => {
    console.log("Cleaning up after test...");
    // Could take screenshot, logout, clear data, etc.
  });

  test("01 - Using page object from fixture", async ({
    homePage,
    loginPage,
  }) => {
    // These are provided by our custom fixture
    await homePage.goto();

    expect(await homePage.isLoaded()).toBeTruthy();
  });

  test("02 - Test lifecycle with hooks", async ({ page }) => {
    // beforeEach already ran

    // Test code here
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // afterEach will run after this
  });

  test("03 - Multiple beforeEach hooks", async ({ page }) => {
    // All beforeEach hooks run in order
    // Setup 1 (from describe block)
    // Setup 2 (if this test has its own beforeEach)

    const url = page.url();
    expect(url).toContain("127.0.0.1:4173");
  });
});

/**
 * Advanced: Test Scopes
 */
test.describe("Describe Block Scopes", () => {
  // beforeAll runs once before all tests in this describe
  test.beforeAll(async () => {
    console.log("Running once before ALL tests in this describe");
  });

  // afterAll runs once after all tests in this describe
  test.afterAll(async () => {
    console.log("Running once after ALL tests in this describe");
  });

  test("Test 1", async ({ page }) => {
    await page.goto("/");
  });

  test("Test 2", async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Nested describe block", () => {
    test.beforeEach(async ({ page }) => {
      // Only runs for tests in THIS nested describe
      console.log("Nested beforeEach");
    });

    test("Nested test", async ({ page }) => {
      // beforeAll and beforeEach (parent) will run
      // Then beforeEach (this describe) will run
      // Then this test runs
    });
  });
});

/**
 * TEST LIFECYCLE ORDER:
 *
 * For a specific test in a nested structure:
 * 1. test.beforeAll() - once for entire describe
 * 2. test.beforeEach() - parent describe
 * 3. test.beforeEach() - current describe
 * 4. TEST RUNS
 * 5. test.afterEach() - current describe
 * 6. test.afterEach() - parent describe
 * 7. test.afterAll() - once after all tests complete
 */
