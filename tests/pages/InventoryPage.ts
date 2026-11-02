import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  // Locators
  get pageTitle() {
    return this.page.locator('.title');
  }

  get productList() {
    return this.page.locator('.inventory_list');
  }

  get productItems() {
    return this.page.locator('.inventory_item');
  }

  get productNames() {
    return this.page.locator('.inventory_item_name');
  }

  get productPrices() {
    return this.page.locator('.inventory_item_price');
  }

  get sortDropdown() {
    return this.page.locator('.product_sort_container');
  }

  get cartIcon() {
    return this.page.locator('.shopping_cart_link');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  // Actions
  addToCartButton(productName: string) { // filters the 'Add to cart' button by product's name. otherwise there would be 6 buttons with 'Add to cart' text
    return this.page
      .locator('.inventory_item', { hasText: productName })
      .locator('button', { hasText: 'Add to cart' });
  }

  removeButton(productName: string) { // same applies for remove buttons
    return this.page
      .locator('.inventory_item', { hasText: productName })
      .locator('button', { hasText: 'Remove' });
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async addProductToCart(productName: string) {
    await this.addToCartButton(productName).click();
  }

  async removeProductFromCart(productName: string) {
    await this.removeButton(productName).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getPricesAsNumbers(): Promise<number[]> { // returns all displayed prices as numbers
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map((t) => parseFloat(t.replace('$', '')));
  }

  // Assertions
  async expectInventoryPageVisible() {
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.productList).toBeVisible();
  }

  async expectCartBadge(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectCartBadgeGone() {
    await expect(this.cartBadge).not.toBeVisible();
  }
}
