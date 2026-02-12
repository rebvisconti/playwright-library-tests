// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/loginpage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test('CT-FE-004: Login with Invalid Credentials', async ({ page }) => {
  const login = new LoginPage(page);

  // Navega para a página de login
  await login.acessar();

  // Tenta logar com senha inválida
  const alerta = capturarAlert(page);
  await login.login('admin@biblioteca.com', '1235879');

  // Valida mensagem do alerta
  const msg = await alerta;
  expect(msg).toBe('Email ou senha incorretos');

  // Continua na página de login
  await expect(page).toHaveURL(/login.html/);
});
