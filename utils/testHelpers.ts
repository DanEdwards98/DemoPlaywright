import { Page, expect } from "@playwright/test";

/**
 * Common Test Utilities
 *
 * Helper functions for common operations:
 * - Waiting for elements
 * - Taking screenshots
 * - Handling popups
 * - Common assertions
 */

/**
 * Wait for an element to appear and be visible
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout = 5000,
): Promise<void> {
  await page.waitForSelector(selector, { state: "visible", timeout });
}

/**
 * Take a screenshot with a meaningful name
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  await page.screenshot({ path: `./screenshots/${name}-${timestamp}.png` });
}

/**
 * Click element with retry logic
 * Useful for flaky clicks due to timing issues
 */
export async function clickWithRetry(
  page: Page,
  selector: string,
  maxAttempts = 3,
): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await page.click(selector);
      return;
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await page.waitForTimeout(500);
    }
  }
}

/**
 * Handle alert dialogs
 */
export async function acceptAlert(page: Page): Promise<void> {
  page.once("dialog", (dialog) => dialog.accept());
}

export async function dismissAlert(page: Page): Promise<void> {
  page.once("dialog", (dialog) => dialog.dismiss());
}

/**
 * Get all text content from elements matching a selector
 */
export async function getAllText(
  page: Page,
  selector: string,
): Promise<string[]> {
  return await page.locator(selector).allTextContents();
}

/**
 * Check if element exists
 */
export async function elementExists(
  page: Page,
  selector: string,
): Promise<boolean> {
  return (await page.$(selector)) !== null;
}

/**
 * Common assertions
 */
export async function assertElementVisible(
  page: Page,
  selector: string,
): Promise<void> {
  await expect(page.locator(selector)).toBeVisible();
}

export async function assertElementHidden(
  page: Page,
  selector: string,
): Promise<void> {
  await expect(page.locator(selector)).toBeHidden();
}

export async function assertTextPresent(
  page: Page,
  text: string,
): Promise<void> {
  await expect(page.locator("body")).toContainText(text);
}

export async function assertPageTitle(
  page: Page,
  title: string,
): Promise<void> {
  await expect(page).toHaveTitle(title);
}
