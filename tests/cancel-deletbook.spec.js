import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/login.js';
import { BookDetailsPage } from '../POM/bookdetailspage.js';

test.describe('CT-FE-015 - Cancel Book Deletion', () => {  
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('http://localhost:3000/login.html');
        await login.preencherEmail('admin@biblioteca.com');
        await login.preencherSenha('123456');
        await login.clicarEntrar();
    });

    test('CT-FE-015 - Cancel Book Deletion', async ({ page }) => {
    await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
  });

  const detalhes = new BookDetailsPage(page);

  await page.goto('http://localhost:3000/detalhes.html?id=1');

  page.once('dialog', dialog => dialog.dismiss());

  await detalhes.clicarDeletar();

  await expect(page).toHaveURL(/detalhes/);
});
});
