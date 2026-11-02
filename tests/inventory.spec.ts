import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Inventory Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    await loginPage.goto();
    await loginPage.loginAsStandardUser();
    await inventoryPage.expectInventoryPageVisible();
  });

  test('4 - Sort products by price from low to high', async () => {
    await inventoryPage.sortBy('lohi');

    const actualPrices = await inventoryPage.getPricesAsNumbers();
    expect(actualPrices.length).toBeGreaterThan(0);

    const expectedSortedPrices = [...actualPrices].sort((a, b) => a - b);
    expect(actualPrices).toEqual(expectedSortedPrices);
  });
});

