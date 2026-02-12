import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { BooksPage } from '../../POM/bookspage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test.describe('CT-FE-007: Add New Book', () => {

  const livro = {
    nome: `O Hobbit ${Date.now()}`,
    autor: 'J.R.R. Tolkien',
    paginas: 310,
    descricao: 'Uma aventura fantástica.',
    imagem: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg'
  };

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await login.loginAdmin();
    
  });

  test('CT-FE-007: Add New Book', async ({ page }) => {
    const livros = new BooksPage(page);

    await livros.acessar();

    // Captura do alert
    const alerta = capturarAlert(page);

    await livros.adicionarLivro(livro);

    const msg = await alerta;
    expect(msg).toBe('Livro adicionado com sucesso!');

    // Formulário limpo
    await livros.validarFormularioLimpo();

    // Página recarregada + livro na lista
    await livros.validarLivroNaLista(livro.nome);
  });
});
