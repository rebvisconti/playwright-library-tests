// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { HeaderPage } from '../../POM/headerpage.js';
import { DashboardPage } from '../../POM/dashboardpage.js';

test.describe('CT-FE-009: Screen Navigation', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await login.loginAdmin();

  });

  test('CT-FE-009: Screen Navigation', async ({ page }) => {

    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
    });

    const header = new HeaderPage(page);
    const dashboard = new DashboardPage(page);

    await dashboard.acessar();

    await header.navegarLivros();
    await expect(page).toHaveURL(/livros/);

    await header.navegarFavoritos();
    await expect(page).toHaveURL(/favoritos/);

    await header.navegarDashboard();
    await expect(page).toHaveURL(/dashboard/);

  });
}); 
