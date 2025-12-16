// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage} from '../POM/register.js';
import { capturarAlert } from '../helpers/capturaralert';

test('CT-FE-002: register invalid password', async ({ page }) => {

  const register = new RegisterPage(page);

  await page.goto('http://localhost:3000/registro.html');

  await register.preencherNome(faker.person.firstName());
  await register.preencherEmail(faker.internet.email());
  await register.preencherSenha('senha123');
  await register.preencherRepetirSenha('senha456');

  // captura a mensagem do alerta ANTES de clicar no botão
  const alerta = capturarAlert (page);

  await register.clicarRegistrar();

  // espera a mensagem aparecer
  const msg = await alerta;

  expect(msg).toBe('As senhas não coincidem!');

  // valida que continua na página de registro
  await expect(page).toHaveURL('http://localhost:3000/registro.html');

});
