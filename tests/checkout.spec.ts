import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PRODUCTS, CHECKOUT_DATA, ERROR_MESSAGES } from './data/test-data';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.loginAsStandardUser();
    await inventoryPage.expectInventoryPageVisible();

    await inventoryPage.addProductToCart(PRODUCTS.backpack.name);
    await inventoryPage.goToCart();
    await cartPage.expectCartPageVisible();
    await cartPage.proceedToCheckout();
  });

  test('7 - Complete checkout successfully with valid information', async () => {
    await checkoutPage.expectStep1Visible();

    const { firstName, lastName, postalCode } = CHECKOUT_DATA.valid;
    await checkoutPage.fillCustomerInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    await checkoutPage.expectStep2Visible();
    await checkoutPage.expectItemInSummary(PRODUCTS.backpack.name);
    await checkoutPage.expectItemTotalVisible();
    await checkoutPage.expectOrderTotalVisible();

    await checkoutPage.clickFinish();
    await checkoutPage.expectOrderComplete();
  });

  test('8 - Validation error displayed when mandatory field is missing', async () => {
    await checkoutPage.expectStep1Visible();

    const { firstName, lastName, postalCode } = CHECKOUT_DATA.missingFirstName;
    await checkoutPage.fillCustomerInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    await checkoutPage.expectStep1Visible();
    await checkoutPage.expectErrorMessageVisible(ERROR_MESSAGES.missingFirstName);
  });
});

