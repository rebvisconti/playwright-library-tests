// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test('CT-FE-003: Login Successfully', async ({ page }) => {

  const login = new LoginPage(page);

  await page.goto('http://localhost:3000/login.html');

  await login.preencherEmail('admin@biblioteca.com');
  await login.preencherSenha('123456');
  
  const alerta = capturarAlert (page);

  await login.clicarEntrar();

  const msg = await alerta;

  expect(msg).toBe('Login realizado com sucesso!');

  await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

  const userName = page.locator('#nomeUsuario') 
  await expect(userName).toHaveText(/admin/i);

});