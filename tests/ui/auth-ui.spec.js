import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../../POM/loginpage.js';
import { RegisterPage } from '../../POM/registerpage.js';
import { HeaderPage } from '../../POM/headerpage.js';
import { DashboardPage } from '../../POM/dashboardpage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test.describe('Authentication & Access Module', () => {
  let loginPage;
  let registerPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
  });

  test.describe('Login & Session', () => {

    test('CT-FE-003: Login Successfully', async ({ page }) => {
      const alerta = capturarAlert(page);
      await loginPage.loginAdmin();

      const msg = await alerta;
      expect(msg).toBe('Login realizado com sucesso!');
      await expect(page).toHaveURL(/dashboard/);
      await expect(page.getByText('Olá, Admin Master!')).toBeVisible();
    });

    test('CT-API-004: Login with Invalid Credentials', async ({ page }) => {
      await loginPage.acessar();
      const alerta = capturarAlert(page);

      await loginPage.login('admin@biblioteca.com', '1235879');

      const msg = await alerta;
      expect(msg).toBe('Email ou senha incorretos');
      await expect(page).toHaveURL(/login.html/);
    });

    test('CT-FE-016: Logout from the System', async ({ page }) => {
      const header = new HeaderPage(page);
      const dashboard = new DashboardPage(page);

      await loginPage.loginAdmin();
      await dashboard.acessar();

      await header.logout();

      await expect(page).toHaveURL(/login/);
      // Valida limpeza de sessão
      const user = await page.evaluate(() => localStorage.getItem('user'));
      expect(user).toBeNull();
    });
  });

  // --- GRUPO DE REGISTRO DE USUÁRIOS ---
  test.describe('User Registration', () => {

    test('CT-FE-001: Complete Registration Flow', async ({ page }) => {
      await registerPage.acessar();
      await registerPage.registrar({
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        senha: 'Senha123!'
      });

      await expect(page).toHaveURL(/login.html/);
    });

    test('CT-FE-002: Register with Invalid Password (Diferentes)', async ({ page }) => {
      await registerPage.acessar();
      const alerta = capturarAlert(page);

      await registerPage.registrarComSenhasDiferentes({
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        senha: 'senha123',
        confirmarSenha: 'senha456'
      });

      const msg = await alerta;
      expect(msg).toBe('As senhas não conferem.');
    });

    test('CT-FE-017: Register with Short Password (HTML Validation)', async ({ page }) => {
      await registerPage.acessar();
      await registerPage.registrar({
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        senha: '12'
      });

      await registerPage.clicarRegistrar();

      const senhaInput = page.getByRole('textbox', { name: 'Senha:', exact: true });
      const validationMessage = await senhaInput.evaluate(i => i.validationMessage);

      expect(validationMessage).toContain('6 characters or more');
    });
  });
});