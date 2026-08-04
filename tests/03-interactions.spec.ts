import { test, expect } from "@playwright/test";

/**
 * LESSON 3: Interactions and Waits
 *
 * This test file demonstrates:
 * 1. Different ways to interact with elements
 * 2. Waiting strategies
 * 3. Handling dynamic content
 * 4. Common interaction patterns
 *
 * Run with: npm run test -- tests/03-interactions.spec.ts
 */

test.describe("Lesson 3: Interactions and Waits", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("01 - Click interactions", async ({ page }) => {
    const searchInput = page.locator('[placeholder="Search"]');
    const searchButton = page.locator('button:has-text("Search")');

    // Regular click
    await searchInput.click();

    // Double click
    await searchInput.dblclick();

    // Right click
    await searchInput.click({ button: "right" });

    // Click with modifiers
    await searchButton.click({ modifiers: ["Control"] });
  });

  test("02 - Type and fill text", async ({ page }) => {
    const input = page.locator('[placeholder="Search"]');

    // Fill - clears existing and types
    await input.fill("playwright testing");

    // Type - types character by character
    await input.clear();
    await input.type("hello", { delay: 100 });

    // Press keys
    await input.press("Enter");
    await input.press("Control+A");
  });

  test("03 - Wait for element to appear", async ({ page }) => {
    // Wait for element to exist in the DOM.
    const element = page.locator(".results");
    await element.waitFor({ state: "attached", timeout: 5000 });

    // Wait for element to be hidden
    await element.waitFor({ state: "hidden" });

    // Wait for element to be attached (in DOM)
    await element.waitFor({ state: "attached" });
  });

  test("04 - Wait for navigation", async ({ page }) => {
    const link = page.locator("a").first();

    // Wait for navigation to complete
    await Promise.all([page.waitForNavigation(), link.click()]);

    // Wait for specific URL
    // await page.waitForURL('/specific-page');
  });

  test("05 - Wait for specific conditions", async ({ page }) => {
    // Wait for function to return true
    await page.waitForFunction(() => {
      const elements = document.querySelectorAll("li");
      return elements.length > 0;
    });

    // Wait for load state
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
  });

  test("06 - Hover over elements", async ({ page }) => {
    const element = page.locator("button").first();

    // Hover to trigger tooltips or menus
    await element.hover();

    // Wait a bit for animation
    await page.waitForTimeout(500);
  });

  test("07 - Scroll to element", async ({ page }) => {
    const bottomElement = page.locator("a").last();

    // Scroll element into view
    await bottomElement.scrollIntoViewIfNeeded();

    // Then interact
    await bottomElement.click();
  });

  test("08 - Handle dropdowns", async ({ page }) => {
    const select = page.locator("select");

    // Select by value
    await select.selectOption("value1");

    // Select by label
    await select.selectOption({ label: "Option 1" });

    // Get selected option
    const selectedValue = await select.inputValue();
    expect(selectedValue).toBeDefined();
  });

  test("09 - Work with checkboxes and radio buttons", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();

    // Set checked state explicitly for cross-browser reliability
    await checkbox.setChecked(true);
    await expect(checkbox).toBeChecked();

    // Uncheck
    await checkbox.setChecked(false);

    // Assert unchecked state
    await expect(checkbox).not.toBeChecked();

    // Toggle
    const isChecked = await checkbox.isChecked();
    await checkbox.setChecked(!isChecked);
  });

  test("10 - Timeout best practices", async ({ page }) => {
    // Set timeout for specific operation
    const element = page.locator(".slow-element");

    try {
      await element.waitFor({ state: "visible", timeout: 2000 });
    } catch (error) {
      console.log("Element did not appear within 2 seconds");
    }

    // Or use a generous timeout for slow operations
    await page.waitForSelector(".another-element", { timeout: 10000 });
  });
});
