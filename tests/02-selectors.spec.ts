import { test, expect } from "@playwright/test";

/**
 * LESSON 2: Selectors and Locators
 *
 * This test file demonstrates:
 * 1. Different types of selectors
 * 2. Playwright's powerful locator strategies
 * 3. Text-based selection
 * 4. Role-based selection
 * 5. Complex selectors
 *
 * Run with: npm run test -- tests/02-selectors.spec.ts
 */

test.describe("Lesson 2: Selectors and Locators", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("01 - CSS Selectors", async ({ page }) => {
    // Basic CSS selector
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // CSS with class
    const element = page.locator(".class-name");

    // CSS with id
    const header = page.locator("#header");

    // CSS with attribute
    const input = page.locator('input[placeholder="Search"]');
    await expect(input).toBeVisible();
  });

  test("02 - Text-based Selectors", async ({ page }) => {
    // Find element by exact text
    const link = page.locator('a:has-text("Getting started")');

    // Find element by partial text
    const button = page.locator("button", { hasText: "Search" });

    // Find element with regex
    const heading = page.locator("h1:has-text(/Playwright/)");

    console.log("Text selectors are powerful for selecting by content!");
  });

  test("03 - Role-based Selectors", async ({ page }) => {
    // Find by role (accessibility-based)
    const searchButton = page.locator('role=button[name="Search"]');

    // Find heading by role
    const mainHeading = page.locator('role=heading[level="1"]');

    // Find link by role
    const navLink = page.locator('role=link[name="Getting started"]');

    // This is the BEST approach - it matches how users interact!
  });

  test("04 - Combining Selectors", async ({ page }) => {
    // Selector combining multiple strategies
    const deepElement = page.locator('section >> button:has-text("Click me")');

    // Using >> operator (child combinator)
    const parent = page.locator("div.container");
    const child = parent.locator(">> button");

    // Multiple filters
    const element = page.locator("input").filter({ hasText: "email" });
  });

  test("05 - XPath Selectors", async ({ page }) => {
    // XPath - powerful but less readable
    const element = page.locator('xpath=//button[contains(text(), "Click")]');

    // Relative XPath
    const button = page.locator('xpath=.//button[@type="submit"]');

    console.log(
      "XPath works but is often harder to maintain. Prefer other selectors!",
    );
  });

  test("06 - Filtering Locators", async ({ page }) => {
    // Find all buttons, filter by text
    const buttons = page.locator("button");
    const searchButton = buttons.filter({ hasText: "Search" });

    // Filter by visible
    const visibleElements = page
      .locator("a")
      .filter({ has: page.locator("svg") });
  });

  test("07 - First and Last Elements", async ({ page }) => {
    // Get first element
    const firstLink = page.locator("a").first();

    // Get last element
    const lastLink = page.locator("a").last();

    // Get nth element (0-based)
    const thirdLink = page.locator("a").nth(2);

    await expect(firstLink).toBeVisible();
  });

  test("08 - Chaining Locators", async ({ page }) => {
    // Navigate through DOM
    const list = page.locator("ul");
    const items = list.locator("li");
    const firstItem = items.first();

    const itemText = await firstItem.textContent();
    expect(itemText).toBeDefined();
  });
});
