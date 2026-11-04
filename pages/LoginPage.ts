import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  // 1. A LISTA dos elementos desta página
  readonly page: Page;
  readonly campoUsername: Locator;
  readonly campoPassword: Locator;
  readonly botaoLogin: Locator;
  readonly mensagemErro: Locator;

  // 2. ONDE encontrar cada elemento
  constructor(page: Page) {
    this.page = page;
    this.campoUsername = page.getByPlaceholder('Username');
    this.campoPassword = page.getByPlaceholder('Password');
    this.botaoLogin = page.getByRole('button', { name: 'Login' });
    this.mensagemErro = page.locator('[data-test="error"]');
  }

  // 3. AÇÕES que se podem fazer nesta página
  async abrir() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fazerLogin(utilizador: string, password: string) {
    await this.campoUsername.fill(utilizador);
    await this.campoPassword.fill(password);
    await this.botaoLogin.click();
  }
}