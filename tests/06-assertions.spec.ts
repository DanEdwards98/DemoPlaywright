import { test, expect } from "@playwright/test";

/**
 * LESSON 6: Assertions
 *
 * This test file demonstrates:
 * 1. Common Playwright assertions
 * 2. Async assertions
 * 3. Custom assertion messages
 * 4. Soft assertions (continue on failure)
 *
 * Run with: npm run test -- tests/06-assertions.spec.ts
 */

test.describe("Lesson 6: Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("01 - Assertions on locators", async ({ page }) => {
    const heading = page.locator("h1");

    // Check visibility
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeHidden();

    // Check if element exists in DOM
    await expect(heading).toBeAttached();

    // Check if enabled
    const input = page.locator('[placeholder="Search"]');
    await expect(input).toBeEnabled();
    await expect(input).not.toBeDisabled();
  });

  test("02 - Text content assertions", async ({ page }) => {
    const heading = page.locator("h1");

    // Exact text match
    await expect(heading).toHaveText("Playwright");

    // Partial text match with regex
    await expect(heading).toContainText(/Playwright/i);

    // Check page contains text
    await expect(page.locator("body")).toContainText("Playwright");
  });

  test("03 - Attribute assertions", async ({ page }) => {
    const input = page.locator('[placeholder="Search"]');

    // Check attribute value
    await expect(input).toHaveAttribute("type", "text");

    // Check attribute exists
    const href = page.locator("a").first();
    const hrefValue = await href.getAttribute("href");
    expect(hrefValue).toBeDefined();
  });

  test("04 - CSS and class assertions", async ({ page }) => {
    const element = page.locator("h1");

    // Check CSS property
    await expect(element).toHaveCSS("display", "block");

    // Check class
    // (Note: not a direct toHaveClass, but can use getAttribute)
    const classes = await element.getAttribute("class");
    expect(classes ?? "").toEqual(expect.any(String));
  });

  test("05 - Count and list assertions", async ({ page }) => {
    const links = page.locator("a");

    // Check count
    await expect(links).toHaveCount(5);

    // Or get count and assert
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(100);
  });

  test("06 - Page and URL assertions", async ({ page }) => {
    // Check page URL
    await expect(page).toHaveURL("http://127.0.0.1:4173/");

    // Check URL with regex
    await expect(page).toHaveURL(/127\.0\.0\.1:4173/);

    // Check page title
    await expect(page).toHaveTitle("Playwright Demo");
  });

  test("07 - Value assertions", async ({ page }) => {
    const input = page.locator('[placeholder="Search"]');

    // Type something
    await input.fill("test value");

    // Assert input value
    await expect(input).toHaveValue("test value");

    // Get and assert
    const value = await input.inputValue();
    expect(value).toBe("test value");
  });

  test("08 - Soft assertions (continue on failure)", async ({ page }) => {
    // Soft assertions don't stop the test immediately
    await expect.soft(page.locator("h1")).toBeVisible();
    await expect.soft(page.locator("body")).toBeVisible();
    await expect.soft(page.locator("a")).toHaveCount(5); // Still runs

    // Test continues even if some assertions failed
    console.log("Test continues despite failed soft assertions");
  });

  test("09 - Assertions with custom messages", async ({ page }) => {
    const heading = page.locator("h1");

    // Use regular Jest assertions with messages
    const text = await heading.textContent();
    expect(text, "Heading should contain Playwright").toContain("Playwright");
  });

  test("10 - Timeout assertions", async ({ page }) => {
    const element = page.locator(".might-appear-slowly");

    // Default timeout is 5 seconds
    await expect(element).toBeVisible({ timeout: 10000 });
  });

  test("11 - Negation assertions", async ({ page }) => {
    const heading = page.locator("h1");

    // Check negation
    await expect(heading).not.toBeHidden();
    await expect(heading).not.toHaveText("Wrong Text");

    const disabled = page.locator("button:disabled");
    await expect(disabled).not.toBeVisible(); // Usually true
  });

  test("12 - Multiple assertions in sequence", async ({ page }) => {
    const button = page.locator("button").first();

    // Chain multiple assertions
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await expect(button).not.toHaveAttribute("disabled");

    // All must pass
  });
});

/**
 * COMMON ASSERTION PATTERNS:
 *
 * Visibility:
 * - toBeVisible() / toBeHidden()
 * - toBeAttached() / not.toBeAttached()
 * - toBeEnabled() / toBeDisabled()
 *
 * Text:
 * - toHaveText(string)
 * - toContainText(string | regex)
 *
 * Attributes:
 * - toHaveAttribute(name, value)
 * - toHaveValue(value)
 *
 * Page:
 * - toHaveURL(url | regex)
 * - toHaveTitle(title)
 * - toContainText(text)
 *
 * Collections:
 * - toHaveCount(count)
 *
 * TIPS:
 * - Use soft() for assertions that shouldn't stop the test
 * - Add custom messages for clarity
 * - Prefer toContainText over exact text when possible
 */
