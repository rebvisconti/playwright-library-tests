// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { BooksPage } from '../../POM/bookspage.js';

test.describe('CT-FE-008: Mandatory Field Validation', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginAdmin();
  });

  test('CT-FE-008: Mandatory Field Validation', async ({ page }) => {

    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
    });

    const livros = new BooksPage(page);

    await livros.acessar();

    const nome = livros.inputNome;
    const autor = livros.inputAutor;
    const paginas = livros.inputPaginas;

    await livros.clicarAdicionar();

    let nomeValid = await nome.evaluate(/** @param {HTMLInputElement} i */ i => i.checkValidity());
    expect(nomeValid).toBe(false);

    let nomeMsg = await nome.evaluate(/** @param {HTMLInputElement} i */ i => i.validationMessage);
    expect(nomeMsg).toBe('Please fill out this field.');

    await nome.fill('O Hobbit');
    await livros.clicarAdicionar();

    let autorValid = await autor.evaluate(/** @param {HTMLInputElement} i */ i => i.checkValidity());
    expect(autorValid).toBe(false);

    await autor.fill('Tolkien');
    await paginas.fill('');
    await livros.clicarAdicionar();

    let paginasValid = await paginas.evaluate(/** @param {HTMLInputElement} i */ i => i.checkValidity());
    expect(paginasValid).toBe(false);
  });
});