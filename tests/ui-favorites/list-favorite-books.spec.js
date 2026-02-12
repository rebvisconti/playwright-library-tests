import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { FavoritesPage } from '../../POM/favoritepage.js';
import { criarLivroViaAPI, favoritarLivroViaAPI, deletarLivroViaAPI } from '../../helpers/book.api.js';

test.describe('CT-FE-013: List Favorite Books', () => {
  let livro;

  test.beforeEach(async ({ page, request }) => {
    // Criar livro via API
    livro = await criarLivroViaAPI(request, {
      nome: `Livro Favorito ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 200,
      descricao: 'Livro para teste de favoritos',
      imagem: 'https://via.placeholder.com/150'
    });

    
    await favoritarLivroViaAPI(request, 1, livro.id); // assume usuário Admin = 1

    
    const login = new LoginPage(page);
    await login.loginAdmin();
    await page.waitForLoadState('networkidle')
  });

  test('CT-FE-013: List Favorite Books', async ({ page }) => {
    const fav = new FavoritesPage(page);
    await fav.acessar();

    // Validar que pelo menos um card está visível
    await expect(fav.cards.first()).toBeVisible();
    await expect(fav.cards).toContainText(livro.nome);
  });

  test.afterEach(async ({ request }) => {
    // Limpeza
    if (livro?.id) {
      await deletarLivroViaAPI(request, livro.id);
    }
  });
});
