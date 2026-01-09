// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';        
import { RegisterPage } from '../../POM/register.js';

test('CT-FE-001: Complete Registration Flow', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await page.goto('http://localhost:3000/registro.html');

 
  await expect(page).toHaveTitle(/Registro/);
  await registerPage.preencherNome(faker.person.firstName());
  await registerPage.preencherEmail(faker.internet.email());
  await registerPage.preencherSenha('Senha123!');
  await registerPage.preencherRepetirSenha('Senha123!');
  await registerPage.clicarRegistrar();

  
  await expect(page).toHaveURL('http://localhost:3000/login.html');
});
