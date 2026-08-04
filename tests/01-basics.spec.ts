import { test, expect } from "@playwright/test";

/**
 * LESSON 1: Basic Test Structure
 *
 * This test file demonstrates:
 * 1. How to write a basic Playwright test
 * 2. Page navigation
 * 3. Basic assertions
 * 4. Selecting elements
 *
 * Run with: npm run test -- tests/01-basics.spec.ts
 */

test.describe("Lesson 1: Basic Tests", () => {
  // beforeEach runs before each test in this group
  test.beforeEach(async ({ page }) => {
    // TODO: Update this URL to your test application
    // For this example, we'll use the baseURL from playwright.config.ts
    await page.goto("/");
  });

  test("01 - Navigate to page and check title", async ({ page }) => {
    // Assert the page title
    await expect(page).toHaveTitle("Playwright Demo");

    // You can also check the URL path
    await expect(page).toHaveURL(/\/$/);
  });

  test("02 - Find and interact with elements", async ({ page }) => {
    // Find an element by CSS selector
    const searchBox = page.locator('[placeholder="Search"]');

    // Check if element is visible
    await expect(searchBox).toBeVisible();

    // Fill the search box
    await searchBox.fill("getting started");

    // Press Enter to search
    await searchBox.press("Enter");

    // Wait for page to update
    await page.waitForLoadState("networkidle");
  });

  test("03 - Multiple assertions on same element", async ({ page }) => {
    const header = page.locator("h1");

    // Check multiple properties
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/Playwright/);
    await expect(header).toHaveCSS("display", "block");
  });

  test("04 - Working with text content", async ({ page }) => {
    // Get text from an element
    const heading = page.locator("h1");
    const text = await heading.textContent();

    expect(text).toBeDefined();
    expect(text).toContain("Playwright");
  });

  test("05 - Count elements on page", async ({ page }) => {
    // Count how many links are on the page
    const links = page.locator("a");
    const count = await links.count();

    // At least some links should exist
    expect(count).toBeGreaterThan(0);
  });

  test("06 - Check element attributes", async ({ page }) => {
    const link = page.locator("a").first();

    // Get attribute value
    const href = await link.getAttribute("href");

    // Assert the attribute
    expect(href).toBeDefined();
    expect(href).not.toBe("");
  });

  test("07 - Visibility and state checks", async ({ page }) => {
    const searchBox = page.locator('[placeholder="Search"]');

    // Check if enabled
    await expect(searchBox).toBeEnabled();

    // Check if not disabled
    const isDisabled = await searchBox.isDisabled();
    expect(isDisabled).toBe(false);

    // Check if visible
    const isVisible = await searchBox.isVisible();
    expect(isVisible).toBe(true);
  });
});
