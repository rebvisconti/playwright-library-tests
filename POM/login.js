import { expect } from '@playwright/test';

export class LoginPage {

    constructor(page){
        this.page = page;
        this.email = page.getByRole('textbox', { name: 'Email:' });
        this.password = page.getByRole('textbox', { name: 'Senha:' });
        this.loginButton = page.getByRole('button', { name: 'Entrar' });
    }

    async preencherEmail(email){
        await this.email.fill(email);
    }

    async preencherSenha(senha){
        await this.password.fill(senha);
    }

    async clicarEntrar(){
        await this.loginButton.click();
    }
}
