// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/login.js';
import { capturarAlert } from '../helpers/capturaralert.js';

test('CT-FE-004: login - invalid credencials', async ({ page }) => {

  const login = new LoginPage(page);

  await page.goto('http://localhost:3000/login.html');

  await login.preencherEmail('admin@biblioteca.com');
  await login.preencherSenha('1235879');

  const alerta = capturarAlert (page);

  await login.clicarEntrar();

  const msg = await alerta;

  expect(msg).toBe('Email ou senha incorretos');
  
  });


   