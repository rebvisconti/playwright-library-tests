import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../POM/registerpage.js';
import { faker } from '@faker-js/faker';

test('CT-FE-017: Register with Short Password', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.acessar();

  await registerPage.registrar({
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    senha: '12'
  });

  // tentar submeter para disparar a validação do HTML (o tooltip)
  await registerPage.clicarRegistrar();

  const senhaInput = page.getByRole('textbox', { name: 'Senha:', exact: true });

  const validationMessage = await senhaInput.evaluate(
    /** @param {HTMLInputElement} i */
    i => i.validationMessage
  );

  expect(validationMessage).toContain('Please lengthen this text to 6 characters or more (you are currently using 2 characters).');

  await expect(page).toHaveURL('http://localhost:3000/registro.html');

});