import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    // 1. LISTA dos elementos
    readonly page: Page;
    readonly produtos: Locator;
    readonly botaoCheckout: Locator;


    // 2. ONDE encontrar cada elemento
    constructor(page: Page) {
        this.page = page;
        this.produtos = page.locator('[data-test="inventory-item"]');
        this.botaoCheckout = page.getByRole('button', { name: 'Checkout' });

    }

    // 3. AÇÕES
    async irParaCheckout() {
        await this.botaoCheckout.click();
    }

}