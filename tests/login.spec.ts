import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login', () => {

  test('login com utilizador válido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.abrir();
    await loginPage.fazerLogin('standard_user', 'secret_sauce');

    await expect(inventoryPage.titulo).toHaveText('Products');
  });

  test('login com utilizador bloqueado mostra erro', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.abrir();
    await loginPage.fazerLogin('locked_out_user', 'secret_sauce');

    await expect(loginPage.mensagemErro).toContainText('locked out');
  });
});