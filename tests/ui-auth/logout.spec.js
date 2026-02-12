import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { HeaderPage } from '../../POM/headerpage.js';
import { DashboardPage } from '../../POM/dashboardpage.js';

test('CT-FE-016: Logout from the System', async ({ page }) => {
  const login = new LoginPage(page);

  await login.loginAdmin();

  const header = new HeaderPage(page);
  const dashboard = new DashboardPage(page);

  await dashboard.acessar();

  await expect(page).toHaveURL(/dashboard/);
 
  await header.logout();

  await expect(page).toHaveURL(/login/);

  // Valida que o localStorage foi limpo
  const user = await page.evaluate(() => localStorage.getItem('user'));
  expect(user).toBeNull();
});
