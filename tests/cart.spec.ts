import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { PRODUCTS } from './data/test-data';

test.describe('Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.loginAsStandardUser();
    await inventoryPage.expectInventoryPageVisible();
  });

  test('5 - Add product to cart, verify details and remove from cart', async () => {
    const product = PRODUCTS.backpack;

    await inventoryPage.addProductToCart(product.name);
    await inventoryPage.expectCartBadge(1);

    await inventoryPage.goToCart();
    await cartPage.expectCartPageVisible();

    await cartPage.expectItemInCart(product.name);
    await cartPage.expectItemPrice(product.name, product.price);

    await cartPage.removeItem(product.name);
    await cartPage.expectItemNotInCart(product.name);
  });

  test('6 - Add multiple products to cart and verify cart badge count', async () => {
    const item1 = PRODUCTS.backpack;
    const item2 = PRODUCTS.bikeLight;

    await inventoryPage.addProductToCart(item1.name);
    await inventoryPage.addProductToCart(item2.name);

    await inventoryPage.expectCartBadge(2);

    await inventoryPage.goToCart();
    await cartPage.expectItemInCart(item1.name);
    await cartPage.expectItemInCart(item2.name);
  });
});

