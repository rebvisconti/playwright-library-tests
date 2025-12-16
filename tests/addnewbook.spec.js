import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { LoginPage } from '../POM/login.js';
import { BooksPage } from '../POM/bookspage.js';
import { capturarAlert } from '../helpers/capturaralert.js';

test.describe('CT-FE-007 - add new book', () => {

    const nomeLivro = faker.commerce.productName(); 
    const autorLivro = faker.person.fullName();
    const paginasLivro = faker.number.int({ min: 100, max: 999 }).toString();
    const descricaoLivro = faker.lorem.paragraph(2);
    const imagemLivro = faker.image.url();
    
    
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);

        await page.goto('http://localhost:3000/login.html');

        await login.preencherEmail('admin@biblioteca.com');
        await login.preencherSenha('123456');
        await login.clicarEntrar();
    });

    test('Add a book with all the data.', async ({ page }) => {

        const livros = new BooksPage(page);

        await page.goto('http://localhost:3000/livros.html');

        await livros.preencherNome(nomeLivro);
        await livros.preencherAutor(autorLivro);
        await livros.preencherPaginas(paginasLivro);
        await livros.preencherDescricao(descricaoLivro);
        await livros.preencherImagem(imagemLivro);

        const alerta = capturarAlert(page);

        await livros.clicarAdicionar();

        const msg = await alerta;

        expect(msg).toBe('Livro adicionado com sucesso!');

        await expect(livros.inputNome).toHaveValue('');
        
    });

});
