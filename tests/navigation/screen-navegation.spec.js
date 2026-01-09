// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { Header } from '../../POM/header.js';

  test.describe('CT-FE-009: Screen Navigation', () => {

  test.beforeEach(async ({ page }) => {
    
    const login = new LoginPage(page);

    await page.goto('http://localhost:3000/login.html');

    await login.preencherEmail('admin@biblioteca.com');
    await login.preencherSenha('123456');
    await login.clicarEntrar();
  });
  
  test('CT-FE-009: Screen Navigation', async ({ page }) => {
  
    await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
  });
  
      const header = new Header(page);

   await page.goto('http://localhost:3000/dashboard.html');

   await header.navegarLivros();
   await expect(page).toHaveURL(/livros/);

   await header.navegarFavoritos();
   await expect(page).toHaveURL(/favoritos/);

   await header.navegarDashboard();
   await expect(page).toHaveURL(/dashboard/);

});
}); 
