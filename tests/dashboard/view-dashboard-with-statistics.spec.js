// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { DashboardPage } from '../../POM/dashboard.js';

test.describe('CT-FE-006: View Dashboard with Statistics', () => {

  test.beforeEach(async ({ page }) => {
    
    const login = new LoginPage(page);

  await page.goto('http://localhost:3000/login.html');

  await login.preencherEmail('admin@biblioteca.com');
  await login.preencherSenha('123456');
  await login.clicarEntrar();
  
  });

  test('CT-FE-006: View Dashboard with Statistics', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.validarEstatisticasVisiveis();
    await dashboard.validarNumerosFormatados();
    await dashboard.validarGridLivros();
    await dashboard.validarMaximoCincoLivros();
    await dashboard.validarEstruturaLivros();
  });
});
