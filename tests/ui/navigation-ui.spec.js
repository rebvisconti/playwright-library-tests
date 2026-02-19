import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { HeaderPage } from '../../POM/headerpage.js';
import { DashboardPage } from '../../POM/dashboardpage.js';

test.describe('Module: Navigation & Security', () => {
  /** @type {HeaderPage} */
  let header;
  /** @type {DashboardPage} */
  let dashboard;

  
  test.describe('Access Protection (Route Protection)', () => {
    
    test('CT-FE-005: Check Route Protection (Unauthorized Redirect)', async ({ page }) => {
      
      await page.addInitScript(() => localStorage.clear());

      // Tenta acessar uma página restrita
      await page.goto('http://localhost:3000/dashboard.html');

      // Valida se o sistema barrou e redirecionou para o login
      await expect(page).toHaveURL(/login.html/);
    });
  });

  
  test.describe('Navegação via Menu (Header)', () => {

    test.beforeEach(async ({ page }) => {
      header = new HeaderPage(page);
      dashboard = new DashboardPage(page);
      const login = new LoginPage(page);

      await login.loginAdmin();

      await page.addInitScript(() => {
        localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
      });
      
      await dashboard.acessar();
    });

    test('CT-FE-009: Successful Navigation between Dashboard, Books and Favorites', async ({ page }) => {
      // 1. Ir para Livros
      await header.navegarLivros();
      await expect(page).toHaveURL(/livros/);

      // 2. Ir para Favoritos
      await header.navegarFavoritos();
      await expect(page).toHaveURL(/favoritos/);

      // 3. Voltar para Dashboard
      await header.navegarDashboard();
      await expect(page).toHaveURL(/dashboard/);
    });
  });
});