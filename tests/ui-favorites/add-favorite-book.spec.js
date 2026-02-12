import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';
import { criarLivroViaAPI, deletarLivroViaAPI } from '../../helpers/book.api.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test.describe('CT-FE-011: Add Book to Favorites', () => {
  let livro;

  test.beforeEach(async ({ page, request }) => {
    // Criar livro via API
    livro = await criarLivroViaAPI(request, {
      nome: `Livro Favorito ${Date.now()}`,
      autor: 'Autor Favorito',
      paginas: 150,
      descricao: 'Descrição para favoritos',
      imagem: 'https://via.placeholder.com/150'
    });

    // Login
    const login = new LoginPage(page);
    await login.loginAdmin();

    // Configurar LocalStorage
    await page.addInitScript(user => {
      localStorage.setItem('user', JSON.stringify(user));
    }, { nome: 'Admin' });
  });

  test('Add Book to Favorites', async ({ page }) => {
    const detalhes = new BookDetailsPage(page);

    await page.goto(`http://localhost:3000/detalhes.html?id=${livro.id}`);

    const alerta = capturarAlert(page);
    await detalhes.clicarFavoritar();
    const msg = await alerta;
    expect(msg).toContain('Adicionado aos favoritos!');
  });

  test.afterEach(async ({ request }) => {
    if (livro?.id) {
      await deletarLivroViaAPI(request, livro.id).catch(() => { });
    }
  });
});
