import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

/**
 * LESSON 4: Page Object Model Pattern
 *
 * This test file demonstrates:
 * 1. Using Page Object Models for better test organization
 * 2. Encapsulating page interactions
 * 3. Reusable methods for common actions
 * 4. Maintainable test code
 *
 * Benefits:
 * - When UI changes, you only update the page object
 * - Tests are more readable
 * - Less code duplication
 * - Better organization
 *
 * Run with: npm run test -- tests/04-page-objects.spec.ts
 */

test.describe("Lesson 4: Page Object Model Pattern", () => {
  test("01 - Using HomePage page object", async ({ page }) => {
    // Create an instance of the page object
    const homePage = new HomePage(page);

    // Use the page object methods
    await homePage.goto();

    // Verify page loaded
    expect(await homePage.isLoaded()).toBeTruthy();
  });

  test("02 - Searching using page object", async ({ page }) => {
    const homePage = new HomePage(page);

    // All the complexity is hidden in the page object
    await homePage.goto();
    await homePage.search("getting started");

    // Verify results
    const count = await homePage.getResultsCount();
    expect(count).toBeGreaterThan(0);
  });

  test("03 - Using LoginPage page object", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login
    await loginPage.goto();

    // Verify page is loaded
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeFalsy();
  });

  test("04 - Attempting invalid login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    // Try to login with invalid credentials
    await loginPage.login("wrong@example.com", "wrongpassword");

    // Check for error message
    const hasError = await loginPage.isErrorVisible();
    expect(hasError).toBeTruthy();

    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain("Invalid");
  });

  test("05 - Clicking forgot password from page object", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    // Use page object method
    await loginPage.clickForgotPassword();

    // Verify navigation
    expect(page.url()).toContain("forgot");
  });

  test("06 - Combining page objects in a workflow", async ({ page }) => {
    const homePage = new HomePage(page);

    // Multi-step workflow
    await homePage.goto();

    // Perform search
    await homePage.search("testing");

    // Get results
    const resultCount = await homePage.getResultsCount();

    // Click first result
    if (resultCount > 0) {
      await homePage.clickFirstResult();
    }

    expect(resultCount).toBeGreaterThan(0);
  });
});

/**
 * KEY TAKEAWAYS - Why Page Object Model is Important:
 *
 * WITHOUT Page Objects (Bad):
 * ```
 * test('search', async ({ page }) => {
 *   await page.goto('/');
 *   await page.fill('[placeholder="Search"]', 'test');
 *   await page.click('button:has-text("Search")');
 *   // If selector changes, ALL tests break!
 * });
 * ```
 *
 * WITH Page Objects (Good):
 * ```
 * test('search', async ({ page }) => {
 *   const homePage = new HomePage(page);
 *   await homePage.goto();
 *   await homePage.search('test');
 *   // If selector changes, only HomePage needs updating!
 * });
 * ```
 */
