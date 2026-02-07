import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test.describe('CT-FE-011: Add Book to Favorites', () => {  
test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto('http://localhost:3000/login.html');

    await login.preencherEmail('admin@biblioteca.com');
    await login.preencherSenha('123456');
    await login.clicarEntrar();
await page.waitForLoadState('networkidle');
  });


test('CT-FE-011: Add Book to Favorites', async ({ page }) => {

  await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
  });

  const detalhes = new BookDetailsPage(page);

  await page.goto('http://localhost:3000/detalhes.html?id=1');

  const alerta = capturarAlert(page);
  await detalhes.clicarFavoritar();
  const msg = await alerta;

  expect(msg).toContain('Adicionado aos favoritos!');

});
});
