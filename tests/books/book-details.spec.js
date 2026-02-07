// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';

test.describe ('CT-FE-010: View Book Detail', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto('http://localhost:3000/login.html');

    await login.preencherEmail('admin@biblioteca.com');
    await login.preencherSenha('123456');
    await login.clicarEntrar();
await page.waitForLoadState('networkidle');
  });


test('CT-FE-010: View Book Detail', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
  });

  const detalhes = new BookDetailsPage(page);

  await page.goto('http://localhost:3000/detalhes.html?id=1');

  await expect(detalhes.imgLivro).toBeVisible();
  await expect(detalhes.nome).toBeVisible();
  await expect(detalhes.autor).toBeVisible();
  await expect(detalhes.paginas).toBeVisible();
  await expect(detalhes.descricao).toBeVisible();
});       
});