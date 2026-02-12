// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../../POM/registerpage.js';

test('CT-FE-001: Complete Registration Flow', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.acessar();

  await expect(page).toHaveTitle(/Registro/);

  await registerPage.registrar({
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    senha: 'Senha123!'
  });


  await expect(page).toHaveURL('http://localhost:3000/login.html');
});
