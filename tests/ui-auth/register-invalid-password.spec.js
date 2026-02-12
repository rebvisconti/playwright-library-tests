// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../../POM/registerpage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test('CT-FE-002: Register with Invalid Password', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  
  await registerPage.acessar();
  const alerta = capturarAlert(page);

  await registerPage.registrarComSenhasDiferentes({
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    senha: 'senha123',
    confirmarSenha: 'senha456'
  });

  const msg = await alerta;
  expect(msg).toBe('As senhas não coincidem!');

  await expect(page).toHaveURL('http://localhost:3000/registro.html');

  
});
