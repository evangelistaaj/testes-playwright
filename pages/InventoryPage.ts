import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly contadorCarrinho: Locator;
  readonly linkCarrinho: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo = page.locator('[data-test="title"]');
    this.contadorCarrinho = page.locator('[data-test="shopping-cart-badge"]');
    this.linkCarrinho = page.locator('[data-test="shopping-cart-link"]');
  }

  async adicionarAoCarrinho(produto: string) {
    await this.page.locator(`[data-test="add-to-cart-${produto}"]`).click();
  }

  async removerDoCarrinho(produto: string) {
    await this.page.locator(`[data-test="remove-${produto}"]`).click();
  }

  async abrirCarrinho() {
    await this.linkCarrinho.click();
  }
}