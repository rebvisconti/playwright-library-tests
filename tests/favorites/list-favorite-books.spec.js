// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { FavoritesPage } from '../../POM/favorite-page.js';


test.describe('CT-FE-013: List Favorite Books', () => {  
test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await page.goto('http://localhost:3000/login.html');

    await login.preencherEmail('admin@biblioteca.com');
    await login.preencherSenha('123456');
    await login.clicarEntrar();
  });


test('CT-FE-013: List Favorite Books', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
    localStorage.setItem('favoritos', JSON.stringify([1]));
  });

  const fav = new FavoritesPage(page);

  await page.goto('http://localhost:3000/favoritos.html');

  await expect(fav.cards).toBeVisible();
}); 
}); 

