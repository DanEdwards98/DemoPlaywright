import { test, expect } from "@playwright/test";
import { TEST_USERS } from "../utils/testData";
import {
  assertTextPresent,
  assertElementVisible,
  clickWithRetry,
  elementExists,
} from "../utils/testHelpers";

/**
 * LESSON 5: Using Test Utilities and Data
 *
 * This test file demonstrates:
 * 1. Using test data from a centralized location
 * 2. Using helper functions for common operations
 * 3. Reducing code duplication
 * 4. Making tests more maintainable
 *
 * Run with: npm run test -- tests/05-utilities.spec.ts
 */

test.describe("Lesson 5: Test Utilities and Data", () => {
  test("01 - Using test data", async ({ page }) => {
    // Test data is defined in utils/testData.ts
    const user = TEST_USERS.validUser;

    // Navigate to login
    await page.goto("/login");

    // Fill form with test data
    await page.fill('input[type="email"]', user.email);
    await page.fill('input[type="password"]', user.password);

    // Verify we filled correctly
    const emailValue = await page.inputValue('input[type="email"]');
    expect(emailValue).toBe(user.email);
  });

  test("02 - Using helper functions for assertions", async ({ page }) => {
    await page.goto("/");

    // Use helper for common assertion
    await assertTextPresent(page, "Playwright");
    await assertElementVisible(page, "h1");
  });

  test("03 - Retry clicking for flaky elements", async ({ page }) => {
    await page.goto("/");

    // Use helper that retries clicks
    await clickWithRetry(page, 'button:has-text("Search")');

    console.log("Element clicked successfully with automatic retries!");
  });

  test("04 - Check element existence", async ({ page }) => {
    await page.goto("/");

    // Use helper to check if element exists
    const headerExists = await elementExists(page, "h1");
    expect(headerExists).toBeTruthy();

    const nonExistent = await elementExists(page, ".does-not-exist");
    expect(nonExistent).toBeFalsy();
  });

  test("05 - Using multiple test data points", async ({ page }) => {
    // Loop through multiple users
    for (const [userType, user] of Object.entries(TEST_USERS)) {
      console.log(`Testing with ${userType}: ${user.email}`);

      await page.goto("/login");
      await page.fill('input[type="email"]', user.email);

      const value = await page.inputValue('input[type="email"]');
      expect(value).toBe(user.email);

      await page.fill('input[type="email"]', ""); // Clear for next iteration
    }
  });

  test("06 - Combining utilities and data", async ({ page }) => {
    const user = TEST_USERS.validUser;

    await page.goto("/login");

    // Use test data
    await page.fill('input[type="email"]', user.email);
    await page.fill('input[type="password"]', user.password);

    // Use helper
    await clickWithRetry(page, 'button:has-text("Login")');

    // Use assertion helper
    await assertTextPresent(page, "Welcome");
  });
});

/**
 * WHY CENTRALIZE TEST DATA:
 *
 * Problem: Test data scattered throughout tests
 * - Hard to change user credentials
 * - Duplicated data in multiple files
 * - Environment-specific URLs hardcoded
 *
 * Solution: Keep data in utils/testData.ts
 * - One place to update credentials
 * - Environment-specific configuration
 * - Consistent test data across all tests
 */
