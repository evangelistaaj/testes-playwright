# 🎭 Testes Automatizados com Playwright – SauceDemo

![Playwright Tests](https://github.com/evangelistaaj/testes-playwright/actions/workflows/playwright.yml/badge.svg)

Projeto de automação de testes end-to-end (E2E) da loja de demonstração [SauceDemo](https://www.saucedemo.com/), desenvolvido com **Playwright** e **TypeScript**.

## 🛠️ Tecnologias

- [Playwright](https://playwright.dev/) – framework de testes E2E
- TypeScript
- Node.js
- Git

## ✅ Cenários testados

**Login**
- Login com utilizador válido
- Login com utilizador bloqueado (mensagem de erro)

**Carrinho e checkout**
- Adicionar produto ao carrinho (contador atualizado)
- Remover produto do carrinho (contador desaparece)
- Validação dos campos obrigatórios do checkout (data-driven: sem nome, sem apelido, sem código postal, todos vazios)
- Compra completa de 2 produtos, com validação do subtotal e da mensagem de confirmação

Todos os testes correm em **3 browsers**: Chromium, Firefox e WebKit.

## 🧱 Boas práticas aplicadas

- **Page Object Model (POM)**: cada página do site tem a sua classe com elementos e ações, separando a lógica dos testes da estrutura das páginas
- **Testes data-driven**: o mesmo teste corre para vários conjuntos de dados
- **Testes independentes**: cada teste faz o seu próprio login com `beforeEach`
- **Testes positivos e negativos**
- **Evidências automáticas em caso de falha**: screenshot, vídeo e trace

## 📁 Estrutura do projeto

```
├── pages/                  # Page Objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                  # Testes
│   ├── login.spec.ts
│   └── compra.spec.ts
├── playwright.config.ts    # Configuração do Playwright
└── tsconfig.json           # Configuração do TypeScript
```

## ▶️ Como executar

**Pré-requisito:** [Node.js](https://nodejs.org/) (versão LTS)

```bash
# 1. Instalar as dependências
npm install

# 2. Instalar os browsers do Playwright
npx playwright install

# 3. Correr todos os testes
npx playwright test

# 4. Abrir o relatório
npx playwright show-report
```

Outros comandos úteis:

```bash
npx playwright test --ui                  # Modo interativo
npx playwright test --project=chromium    # Só no Chromium
npx playwright test --headed              # Mostrar o browser
```

## 👤 Autor

**Arthur Evangelista**
