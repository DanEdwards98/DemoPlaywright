import { Page } from "@playwright/test";

/**
 * Example: Login Page Object Model
 *
 * This demonstrates common login page interactions:
 * - Input fields
 * - Button clicks
 * - Error message handling
 * - Navigation after login
 */
export class LoginPage {
  constructor(private page: Page) {}

  // Locators - Grouping related elements
  private getEmailInput() {
    return this.page.locator('input[type="email"]');
  }

  private getPasswordInput() {
    return this.page.locator('input[type="password"]');
  }

  private getLoginButton() {
    return this.page.locator('button:has-text("Login")');
  }

  private getErrorMessage() {
    return this.page.locator('[role="alert"]');
  }

  private getForgotPasswordLink() {
    return this.page.locator('a:has-text("Forgot password?")');
  }

  // Public methods - What tests use
  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.getEmailInput().fill(email);
    await this.getPasswordInput().fill(password);
    await this.getLoginButton().click();
  }

  async getErrorText(): Promise<string> {
    return (await this.getErrorMessage().textContent()) ?? "";
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.getErrorMessage().isVisible();
  }

  async clickForgotPassword() {
    await this.getForgotPasswordLink().click();
  }

  async waitForLoginSuccess() {
    // Wait for navigation away from login page
    await this.page.waitForURL("/", { timeout: 5000 });
  }
}
