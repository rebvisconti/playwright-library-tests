import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/login.js';
import { BookDetailsPage } from '../POM/bookdetailspage.js';
import { capturarAlert } from '../helpers/capturaralert';

test.describe('CT-FE-012 - Remove favorite book', () => {  
test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto('http://localhost:3000/login.html');

    await login.preencherEmail('admin@biblioteca.com');
    await login.preencherSenha('123456');
    await login.clicarEntrar();
  });


test('CT-FE-012 - Remove favorite book', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
    localStorage.setItem('favoritos', JSON.stringify([1]));
  });

  const detalhes = new BookDetailsPage(page);

  await page.goto('http://localhost:3000/detalhes.html?id=1');

  const alerta = capturarAlert(page);
  await detalhes.clicarDesfavoritar();
  const msg = await alerta;

  expect(msg).toContain('Removido dos favoritos!');

});
});