import { test, expect } from '@playwright/test';
import { RegisterPage } from '../POM/register.js';
import { faker } from '@faker-js/faker';

test('CT-FE: register 4 characters password', async ({ page }) => {

const register = new RegisterPage(page);

await page.goto('http://localhost:3000/registro.html');


await register.preencherNome(faker.person.firstName());
await register.preencherEmail(faker.internet.email());
await register.preencherSenha('12');
await register.preencherRepetirSenha('12');

// tentar submeter para disparar a validação do HTML (o tooltip)
await register.clicarRegistrar();

const senhaInput = page.getByRole('textbox', { name: 'Senha:', exact: true });


const validationMessage = await senhaInput.evaluate(
    /** @param {HTMLInputElement} i */ 
    i => i.validationMessage
  );
  

expect(validationMessage).toContain('Please lengthen this text to 6 characters or more (you are currently using 2 characters).');
  

await expect(page).toHaveURL('http://localhost:3000/registro.html');

});