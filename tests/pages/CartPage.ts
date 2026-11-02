import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  // Locators
  get pageTitle() {
    return this.page.locator('.title');
  }

  get cartItems() {
    return this.page.locator('.cart_item');
  }

  get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  itemName(productName: string) { // Item name inside the cart for a specific product
    return this.page
      .locator('.cart_item', { hasText: productName })
      .locator('.inventory_item_name');
  }

  itemPrice(productName: string) { // Item price inside the cart for a specific product
    return this.page
      .locator('.cart_item', { hasText: productName })
      .locator('.inventory_item_price');
  }

  removeButton(productName: string) { // Remove button inside the cart for a specific product
    return this.page
      .locator('.cart_item', { hasText: productName })
      .locator('button', { hasText: 'Remove' });
  }

  // Actions
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeItem(productName: string) {
    await this.removeButton(productName).click();
  }

  // Assertions
  async expectCartPageVisible() {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async expectItemInCart(productName: string) {
    await expect(this.itemName(productName)).toBeVisible();
  }

  async expectItemNotInCart(productName: string) {
    await expect(this.page.locator('.cart_item', { hasText: productName })).not.toBeVisible();
  }

  async expectItemPrice(productName: string, expectedPrice: string) {
    await expect(this.itemPrice(productName)).toHaveText(expectedPrice);
  }
}
