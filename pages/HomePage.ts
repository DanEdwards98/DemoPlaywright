import { Page } from "@playwright/test";

/**
 * Page Object Model - HomePage
 *
 * Best Practice: Page Object Models organize your code by encapsulating
 * all interactions with a specific page into a class.
 *
 * Benefits:
 * - Centralized locators and methods
 * - Easy to maintain when UI changes
 * - Reusable across multiple tests
 * - Clear, readable test code
 */
export class HomePage {
  constructor(private page: Page) {}

  // Locators
  private getSearchInput() {
    return this.page.locator('[placeholder="Search"]');
  }

  private getSearchButton() {
    return this.page.locator('button:has-text("Search")');
  }

  private getResultsList() {
    return this.page.locator(".search-results");
  }

  private getFirstResult() {
    return this.page.locator(".search-results li").first();
  }

  // Methods
  async goto() {
    await this.page.goto("/");
  }

  async search(query: string) {
    // Type the search query
    await this.getSearchInput().fill(query);

    // Click search button
    await this.getSearchButton().click();

    // Wait for results to appear
    await this.page.waitForSelector(".search-results", { state: "visible" });
  }

  async getResultsCount(): Promise<number> {
    const results = await this.page.locator(".search-results li").count();
    return results;
  }

  async clickFirstResult() {
    await this.getFirstResult().click();
  }

  async isLoaded(): Promise<boolean> {
    return await this.page
      .locator("h1")
      .first()
      .isVisible()
      .then(() => true)
      .catch(() => false);
  }
}
