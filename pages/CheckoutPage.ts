import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
    // 1. LISTA dos elementos
    readonly page: Page;
    readonly campoNome: Locator;
    readonly campoApelido: Locator;
    readonly campoCodPostal: Locator;
    readonly botaoContinue: Locator;
    readonly subtotalLabel: Locator;
    readonly botaoFinish: Locator;
    readonly completeHeader: Locator;
    readonly mensagemErro: Locator;

    // 2. ONDE encontrar cada elemento
    constructor(page: Page) {
        this.page = page;
        this.campoNome = page.getByPlaceholder('First Name');
        this.campoApelido = page.getByPlaceholder('Last Name');
        this.campoCodPostal = page.getByPlaceholder('Zip/Postal Code');
        this.botaoContinue = page.getByRole('button', { name: 'Continue' });
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.botaoFinish = page.getByRole('button', { name: 'Finish' });
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.mensagemErro = page.locator('[data-test="error"]');
    }

    // 3. AÇÕES
    async finalizar() {
        await this.botaoFinish.click();
    }

    async continuar() {
        await this.botaoContinue.click();
    }

    async preencherCampos(nome: string, apelido: string, codpostal: string) {
        await this.campoNome.fill(nome);
        await this.campoApelido.fill(apelido);
        await this.campoCodPostal.fill(codpostal);
    }
}