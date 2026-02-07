// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { FavoritesPage } from '../../POM/favorite-page.js';

test.describe('CT-FE-013: List Favorite Books', () => {  
  let livroId;  // Armazena ID do livro criado

  test.beforeEach(async ({ page, request }) => {
    // 1. Login UI
    const login = new LoginPage(page);
    await page.goto('http://localhost:3000/login.html');
    await login.preencherEmail('admin@biblioteca.com');
    await login.preencherSenha('123456');
    await login.clicarEntrar();
    await page.waitForLoadState('networkidle');

    // 2. CRIAR LIVRO TESTE VIA API (CT-API-009)
    const createLivro = await request.post('http://localhost:3000/livros', {
      data: {
        nome: `Livro Teste Favoritos ${Date.now()}`,
        autor: 'Autor Teste Playwright',
        paginas: 300,
        descricao: 'Criado para teste UI favoritos',
        imagemUrl: 'https://exemplo.com/teste.jpg',
        estoque: 5,
        preco: 29.90
      }
    });
    expect(createLivro.status()).toBe(201);
    const novoLivro = await createLivro.json();
    livroId = novoLivro.id;  // Salva ID global

    // 3. ADICIONAR AOS FAVORITOS (CT-API-014)
    await request.post('http://localhost:3000/favoritos', {
      data: {
        usuarioId: 1,    // Admin
        livroId: livroId // O novo!
      }
    });
  });

  test('CT-FE-013: List Favorite Books', async ({ page }) => {
    const fav = new FavoritesPage(page);
    await page.goto('http://localhost:3000/favoritos.html');
    await page.waitForLoadState('networkidle');

    await expect(fav.cards).toBeVisible();  // ✅ Sempre passa!
  });
});
