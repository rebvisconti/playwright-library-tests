import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { BooksPage } from '../../POM/bookspage.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';
import { booksApi } from '../../helpers/book.api.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test.describe('Module: Book Management', () => {
  let booksPage;
  let detailsPage;
  let tempLivroApi = null;

  test.beforeEach(async ({ page }) => {
    booksPage = new BooksPage(page);
    detailsPage = new BookDetailsPage(page);

    const login = new LoginPage(page);
    await login.loginAdmin();
    
    // Garantir sessão ativa para as views que exigem admin
    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
    });
  });

  test.describe('Registration & Validations', () => {
    
    test('CT-FE-007: Add New Book Successfully', async ({ page }) => {
      const novoLivro = {
        nome: `O Hobbit ${Date.now()}`,
        autor: 'J.R.R. Tolkien',
        paginas: 310,
        descricao: 'Uma aventura fantástica.',
        imagem: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg'
      };

      await booksPage.acessar();
      const alerta = capturarAlert(page);
      
      await booksPage.adicionarLivro(novoLivro);

      expect(await alerta).toBe('Livro adicionado com sucesso!');
      await booksPage.validarFormularioLimpo();
      await booksPage.validarLivroNaLista(novoLivro.nome);
    });

    test('CT-FE-008: Mandatory Field Validation', async ({ page }) => {
      await booksPage.acessar();
      await booksPage.clicarAdicionar();

      // Validação nativa do HTML5 para o campo Nome
      const nomeMsg = await booksPage.inputNome.evaluate(i => i.validationMessage);
      expect(nomeMsg).toBe('Please fill out this field.');

      await booksPage.inputNome.fill('O Hobbit');
      await booksPage.clicarAdicionar();

      // Validação para o campo Autor
      const autorValid = await booksPage.inputAutor.evaluate(i => i.checkValidity());
      expect(autorValid).toBe(false);
    });
  });

  test.describe('View & Deletion', () => {

    test('CT-FE-010: View Book Detail', async ({ page }) => {
      
      await page.goto('http://localhost:3000/detalhes.html?id=1');

      await expect(detailsPage.imgLivro).toBeVisible();
      await expect(detailsPage.nome).toBeVisible();
      await expect(detailsPage.descricao).toBeVisible();
    });

    test('CT-FE-014: Delete Book Successfully', async ({ page, request }) => {
      
      tempLivroApi = await booksApi.create(request, {
        nome: `Deletar UI ${Date.now()}`,
        autor: 'Teste',
        paginas: 100,
        descricao: 'Delete me',
        imagem: 'https://via.placeholder.com/150'
      });

      await page.goto(`http://localhost:3000/detalhes.html?id=${tempLivroApi.id}`);

      page.once('dialog', async d => await d.accept());
      await detailsPage.clicarDeletar();

      await expect(page).toHaveURL(/.*livros.html/);
      
      // Validação via API: 404
      await expect(booksApi.getById(request, tempLivroApi.id)).rejects.toThrow(/404/);
      tempLivroApi = null; // Limpa para o afterEach
    });

    test('CT-FE-015: Cancel Book Deletion', async ({ page }) => {
      await page.goto('http://localhost:3000/detalhes.html?id=1');

      page.once('dialog', d => d.dismiss());
      await detailsPage.clicarDeletar();

      await expect(page).toHaveURL(/detalhes/);
    });
  });

  test.afterEach(async ({ request }) => {
    if (tempLivroApi?.id) {
      await booksApi.delete(request, tempLivroApi.id).catch(() => {});
    }
  });
});