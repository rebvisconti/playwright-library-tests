// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test('CT-FE-003: Login Successfully', async ({ page }) => {

  const login = new LoginPage(page);
  const alerta = capturarAlert(page);

  await login.loginAdmin();

  const msg = await alerta;
  expect(msg).toBe('Login realizado com sucesso!');

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Admin')).toBeVisible();

});