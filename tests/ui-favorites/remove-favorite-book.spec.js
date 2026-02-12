import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';
import { criarLivroViaAPI, deletarLivroViaAPI } from '../../helpers/book.api.js';

test.describe('CT-FE-012: Remove Book from Favorites', () => {
  let livro;

  test.beforeEach(async ({ page, request }) => {
    // 1️⃣ Criar livro via API
    livro = await criarLivroViaAPI(request, {
      nome: `Livro Teste Desfavoritar ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 250,
      descricao: 'Para testar desfavoritar UI',
      imagem: 'https://via.placeholder.com/150'
    });

    const login = new LoginPage(page);
    await login.loginAdmin();
    await page.addInitScript(user => {
      localStorage.setItem('user', JSON.stringify(user));
    }, { nome: 'Admin' });

    // Favoritar o livro via UI para que o botão "Desfavoritar" apareça
    const detalhes = new BookDetailsPage(page);
    await page.goto(`http://localhost:3000/detalhes.html?id=${livro.id}`);
    const alerta = capturarAlert(page);
    await detalhes.clicarFavoritar();
    await alerta; // Espera alerta "Adicionado aos favoritos!" aparecer
  });

  test('Remover livro dos favoritos', async ({ page }) => {
    const detalhes = new BookDetailsPage(page);
    await page.goto(`http://localhost:3000/detalhes.html?id=${livro.id}`);

    const alerta = capturarAlert(page);
    await detalhes.clicarDesfavoritar();
    const msg = await alerta;

    expect(msg).toContain('Removido dos favoritos!');
  });

  test.afterEach(async ({ request }) => {
    // Limpeza: deletar o livro criado
    if (livro?.id) {
      await deletarLivroViaAPI(request, livro.id).catch(() => { });
    }
  });
});