// @ts-check
import { test } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { DashboardPage } from '../../POM/dashboardpage.js';

test.describe('Module: Statistics', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.loginAdmin();
    await page.waitForLoadState('networkidle');
    await dashboard.acessar();
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
