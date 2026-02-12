import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';
import { criarLivroViaAPI, deletarLivroViaAPI } from '../../helpers/book.api.js';

test.describe('CT-FE-014: Delete Book', () => {
  let livro;

  test.beforeEach(async ({ page, request }) => {

    livro = await criarLivroViaAPI(request, {
      nome: `Livro Teste ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 123,
      descricao: 'Descrição teste',
      imagem: 'https://via.placeholder.com/150'
    });

    const login = new LoginPage(page);
    await login.loginAdmin();

    // Garantir que a página reconheça o usuário logado
    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
    });
  });

  test('Delete book Successfully', async ({ page }) => {
    const detalhes = new BookDetailsPage(page);


    await page.goto(`http://localhost:3000/detalhes.html?id=${livro.id}`);


    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Tem certeza que deseja deletar este livro?');
      await dialog.accept();
    });

    await detalhes.clicarDeletar();

    await expect(page).toHaveURL('http://localhost:3000/livros.html');
  });

  test.afterEach(async ({ request }) => {
    // Limpeza de teste: deletar livro via API se existir

    if (livro?.id) {
      try {
        await deletarLivroViaAPI(request, livro.id);
      } catch (err) {
        console.warn(`Não foi possível deletar o livro via API: ${err.message}`);
      }
    }
  });
});