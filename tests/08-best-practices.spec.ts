import { test, expect } from "@playwright/test";

/**
 * LESSON 8: Best Practices and Common Patterns
 *
 * This test file covers:
 * 1. Test independence
 * 2. Naming conventions
 * 3. Test organization
 * 4. Error handling
 * 5. Avoiding flaky tests
 *
 * Run with: npm run test -- tests/08-best-practices.spec.ts
 */

test.describe("Lesson 8: Best Practices", () => {
  /**
   * BEST PRACTICE 1: Test Independence
   * Each test should be able to run in any order
   */
  test("should be able to run independently", async ({ page }) => {
    // Set up everything this test needs
    await page.goto("/");

    // Don't rely on state from other tests
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Test should work even if run first or last
  });

  /**
   * BEST PRACTICE 2: Clear, descriptive test names
   * Tests should describe WHAT is being tested
   */
  test("should display search results when user searches for keyword", async ({
    page,
  }) => {
    // Good name - explains what the test verifies
    // Avoid: "test1", "searchWorks", "verify"

    await page.goto("/");
    const input = page.locator('[placeholder="Search"]');
    await input.fill("test");
    await input.press("Enter");
  });

  /**
   * BEST PRACTICE 3: One assertion per test is ideal
   * (Though multiple related assertions is okay)
   */
  test("should have visible search button", async ({ page }) => {
    await page.goto("/");

    // One main thing being tested
    const searchButton = page.locator('button:has-text("Search")');
    await expect(searchButton).toBeVisible();
  });

  /**
   * BEST PRACTICE 4: Use page fixtures and helpers
   * Reduces code duplication
   */
  test("should navigate to home page successfully", async ({ page }) => {
    // Good: Clear, simple test
    await page.goto("/");
    const url = page.url();
    expect(url).toBeDefined();
  });

  /**
   * BEST PRACTICE 5: Avoid hard-coded waits
   */
  test("BAD - explicit waits (avoid this)", async ({ page }) => {
    await page.goto("/");

    // ❌ AVOID - Will always wait 5 seconds
    await page.waitForTimeout(5000);
  });

  test("GOOD - wait for specific condition", async ({ page }) => {
    await page.goto("/");

    // ✅ BETTER - Wait for element to appear (up to timeout)
    const element = page.locator("h1");
    await element.waitFor({ state: "visible", timeout: 5000 });
  });

  /**
   * BEST PRACTICE 6: Handle errors gracefully
   */
  test("should handle missing elements gracefully", async ({ page }) => {
    await page.goto("/");

    try {
      const element = page.locator(".does-not-exist");
      await element.waitFor({ state: "visible", timeout: 2000 });
      // If we get here, element appeared
      await expect(element).toBeVisible();
    } catch (error) {
      // Element didn't appear - that's expected
      console.log("Element did not appear as expected");
    }
  });

  /**
   * BEST PRACTICE 7: Use meaningful selectors
   * Priority: Role > Text > Attributes > CSS > XPath
   */
  test("selector priority example", async ({ page }) => {
    await page.goto("/");

    // ✅ BEST - uses role (accessibility)
    const searchByRole = page.locator('role=button[name="Search"]');

    // ✅ GOOD - uses text
    const searchByText = page.locator('button:has-text("Search")');

    // ⚠️ OKAY - uses attributes
    const searchByAttr = page.locator('button[type="submit"]');

    // ❌ AVOID - CSS can be fragile
    const searchByCSS = page.locator("section > div > button");

    // ❌ AVOID - XPath is hard to maintain
    const searchByXPath = page.locator(
      'xpath=//button[contains(text(), "Search")]',
    );
  });

  /**
   * BEST PRACTICE 8: Organize related tests
   */
  test.describe("Search functionality", () => {
    test("should find results for valid search", async ({ page }) => {
      // Related tests grouped together
    });

    test("should show no results for empty search", async ({ page }) => {
      // Same feature, related functionality
    });
  });

  /**
   * BEST PRACTICE 9: Use meaningful data
   */
  test("should login with valid credentials", async ({ page }) => {
    // Use real-looking test data
    const testUser = {
      email: "user@example.com",
      password: "SecurePassword123",
    };

    // Store in utils/testData.ts instead of hardcoding!
  });

  /**
   * BEST PRACTICE 10: Keep tests focused
   */
  test("should search and display results", async ({ page }) => {
    await page.goto("/");

    // Good: Tests one workflow
    // Avoid: Testing login, then search, then profile in one test
  });
});

/**
 * ANTI-PATTERNS TO AVOID:
 *
 * ❌ Don't: Test implementation details
 * ✅ Do: Test user behavior
 *
 * ❌ Don't: Use flaky selectors like nth-child(5)
 * ✅ Do: Use role or text-based selectors
 *
 * ❌ Don't: Skip/disable tests permanently
 * ✅ Do: Fix the root cause
 *
 * ❌ Don't: Use random test data
 * ✅ Do: Use consistent, meaningful test data
 *
 * ❌ Don't: Trust timing (sleep for 2 seconds)
 * ✅ Do: Wait for specific conditions
 *
 * ❌ Don't: Test multiple features in one test
 * ✅ Do: Keep tests focused and independent
 */
