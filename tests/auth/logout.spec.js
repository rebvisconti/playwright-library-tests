import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { Header } from '../../POM/Header.js';

test.describe('CT-FE-016: Logout from the System', () => {  
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('http://localhost:3000/login.html');
        await login.preencherEmail('admin@biblioteca.com');
        await login.preencherSenha('123456');
        await login.clicarEntrar();
    });

test('CT-FE-016: Logout from the System', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
  });

  const header = new Header(page);

  await page.goto('http://localhost:3000/dashboard.html');

  await header.logout();

  await expect(page).toHaveURL(/login/);

 const user = await page.evaluate(() => localStorage.getItem('user'));

//expect(user).toBeNull()
});
});
