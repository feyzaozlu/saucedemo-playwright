import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';
import { USERS, ERROR_MESSAGES } from './data/test-data';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => { // fresh state for each test
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('1 - Successful login redirects to products page', async () => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectInventoryPageVisible();
  });

  test('2 - Login with invalid credentials displays error message', async () => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.expectErrorMessageVisible(ERROR_MESSAGES.invalidCredentials);
  });

  test('3 - Login with locked out user displays locked out error', async () => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectErrorMessageVisible(ERROR_MESSAGES.lockedOut);
  });
});

