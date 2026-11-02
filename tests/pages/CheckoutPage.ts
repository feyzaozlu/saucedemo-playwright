import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  // Locators
  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  get pageTitle() {
    return this.page.locator('.title');
  }

  get summaryItems() {
    return this.page.locator('.cart_item');
  }

  get itemTotal() {
    return this.page.locator('.summary_subtotal_label');
  }

  get tax() {
    return this.page.locator('.summary_tax_label');
  }

  get orderTotal() {
    return this.page.locator('.summary_total_label');
  }

  get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  get completeHeader() {
    return this.page.locator('.complete-header');
  }

  get completeText() {
    return this.page.locator('.complete-text');
  }

  // Actions
  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  // Assertions
  async expectStep1Visible() {
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
  }

  async expectStep2Visible() {
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  async expectOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async expectErrorMessageVisible(text?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (text) {
      await expect(this.errorMessage).toContainText(text);
    }
  }

  async expectItemInSummary(productName: string) {
    await expect(
      this.page.locator('.cart_item', { hasText: productName })
    ).toBeVisible();
  }

  async expectItemTotalVisible() {
    await expect(this.itemTotal).toBeVisible();
  }

  async expectTaxVisible() {
    await expect(this.tax).toBeVisible();
  }

  async expectOrderTotalVisible() {
    await expect(this.orderTotal).toBeVisible();
  }
}
