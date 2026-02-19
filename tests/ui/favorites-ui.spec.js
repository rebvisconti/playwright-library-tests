import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';
import { FavoritesPage } from '../../POM/favoritepage.js';
import { booksApi, favoritesApi } from '../../helpers/book.api.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test.describe('Module: Favorites', () => {

  /** @type {BookDetailsPage} */
  let detalhesPage;
  /** @type {FavoritesPage} */
  let favPage;
  let livro = null;
  const usuarioId = 1;

  test.beforeEach(async ({ page }) => {
    detalhesPage = new BookDetailsPage(page);
    favPage = new FavoritesPage(page);

    const login = new LoginPage(page);
    await login.loginAdmin();

    await page.addInitScript(user => {
      localStorage.setItem('user', JSON.stringify(user));
    }, { nome: 'Admin', id: usuarioId });
  });

  test('CT-FE-011: Add Book to Favorites', async ({ page, request }) => {

    livro = await booksApi.create(request, {
      nome: `Novo Favorito ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 150,
      descricao: 'Teste UI',
      imagem: 'https://via.placeholder.com/150'
    });

    await page.goto(`http://localhost:3000/detalhes.html?id=${livro.id}`);

    const alertaPromise = capturarAlert(page);
    await detalhesPage.clicarFavoritar();

    expect(await alertaPromise).toContain('Adicionado aos favoritos!');
  });

  test('CT-FE-013: List Favorite Books', async ({ page, request }) => {
    
    livro = await booksApi.create(request, {
      nome: `Listagem Favorito ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 200,
      descricao: 'Teste Listagem',
      imagem: 'https://via.placeholder.com/150'
    });
    await favoritesApi.add(request, usuarioId, livro.id);

    await favPage.acessar();
    await page.waitForLoadState('networkidle');

    await favPage.acessar();
    await page.waitForLoadState('networkidle');

    // Localiza o card específico do livro criado neste teste
    const cardEspecifico = favPage.cards.filter({ hasText: livro.nome });

    // Valida que ESSE card está visível
    await expect(cardEspecifico).toBeVisible();
    // E que ele contém os dados corretos
    await expect(cardEspecifico).toContainText(livro.autor);
  });

  test('CT-FE-012: Remove Book from Favorites', async ({ page, request }) => {
   
    livro = await booksApi.create(request, {
      nome: `Remover Favorito ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 250,
      descricao: 'Teste Remover',
      imagem: 'https://via.placeholder.com/150'
    });
    await favoritesApi.add(request, usuarioId, livro.id);

    await page.goto(`http://localhost:3000/detalhes.html?id=${livro.id}`);

    const alertaPromise = capturarAlert(page);
    await detalhesPage.clicarDesfavoritar();

    expect(await alertaPromise).toContain('Removido dos favoritos!');
  });

  test.afterEach(async ({ request }) => {
    if (livro?.id) {
      await booksApi.delete(request, livro.id).catch(() => { });
    }
  });
});

