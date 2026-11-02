import { Page, expect } from '@playwright/test';
import { USERS } from '../data/test-data';

export class LoginPage {
  constructor(private readonly page: Page) { }

  // Locators
  get usernameInput() {
    return this.page.locator('#user-name');
  }

  get passwordInput() {
    return this.page.locator('#password');
  }

  get loginButton() {
    return this.page.locator('#login-button');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  // Actions
  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsStandardUser() {
    await this.login(USERS.standard.username, USERS.standard.password);
  }

  // Assertions
  async expectErrorMessageVisible(text?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (text) {
      await expect(this.errorMessage).toContainText(text);
    }
  }
}
