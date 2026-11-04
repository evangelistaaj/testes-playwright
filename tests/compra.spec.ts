import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// "describe" agrupa testes relacionados, como uma pasta
test.describe('Loja - carrinho e checkout', () => {

  // Corre ANTES de cada teste: login usando o "manual" da página de login
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.abrir();
    await loginPage.fazerLogin('standard_user', 'secret_sauce');
  });

  test('adicionar produto mostra contador no carrinho', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.adicionarAoCarrinho('sauce-labs-backpack');
    await expect(inventoryPage.contadorCarrinho).toHaveText('1');
  });


  test('remover produto faz desaparecer o contador', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.adicionarAoCarrinho('sauce-labs-backpack');
    await inventoryPage.removerDoCarrinho('sauce-labs-backpack');
    await expect(inventoryPage.contadorCarrinho).toHaveCount(0);
  });


  // A "tabela" de dados: cada { } é uma linha
  const casosDeErro = [
    { caso: 'sem nome', nome: '', apelido: 'Evangelista', codigoPostal: '2800-000', erro: 'First Name is required' },
    { caso: 'sem apelido', nome: 'Arthur', apelido: '', codigoPostal: '2800-000', erro: 'Last Name is required' },
    { caso: 'sem código postal', nome: 'Arthur', apelido: 'Evangelista', codigoPostal: '', erro: 'Postal Code is required' },
    { caso: 'tudo vazio', nome: '', apelido: '', codigoPostal: '', erro: 'First Name is required' },
  ];

  // Para cada linha da tabela, cria um teste
  for (const dados of casosDeErro) {
    test(`checkout ${dados.caso} mostra erro`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      await inventoryPage.adicionarAoCarrinho('sauce-labs-backpack');
      await inventoryPage.abrirCarrinho();
      await cartPage.irParaCheckout();

      await checkoutPage.preencherCampos(dados.nome, dados.apelido, dados.codigoPostal);
      await checkoutPage.continuar();

      await expect(checkoutPage.mensagemErro).toContainText(dados.erro);
    });
  }


  test('compra completa de 2 produtos', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.adicionarAoCarrinho('sauce-labs-backpack');
    await inventoryPage.adicionarAoCarrinho('sauce-labs-bike-light');
    await expect(inventoryPage.contadorCarrinho).toHaveText('2');

    await inventoryPage.abrirCarrinho();
    await expect(cartPage.produtos).toHaveCount(2);
    await cartPage.irParaCheckout();

    await checkoutPage.preencherCampos('Arthur', 'Evangelista', '2800-000');
    await checkoutPage.continuar();
    await expect(page).toHaveURL(/checkout-step-two/); 

    await expect(checkoutPage.subtotalLabel).toContainText('39.98');
    await checkoutPage.finalizar();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});