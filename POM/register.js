import { expect } from '@playwright/test';

export class RegisterPage {

    constructor(page) {
        this.page = page;
        this.name=page.getByRole('textbox', { name: 'Nome:' });
        this.email=page.getByRole('textbox', { name: 'Email:' });
        this.password=page.getByRole('textbox', { name: 'Senha:', exact: true });
        this.repetpassword=page.getByRole('textbox', { name: 'Confirmar Senha:' });
        this.registerButton=page.getByRole('button', { name: 'Registrar' });        
        
    }

    async preencherNome(name){
        await this.name.fill(name);
    }

    async preencherEmail(email){
        await this.email.fill(email);
    }   

    async preencherSenha(password){
        await this.password.fill(password);
    }   

    async preencherRepetirSenha(repetpassword){
        await this.repetpassword.fill(repetpassword);
    }

    async clicarRegistrar(){
        await this.registerButton.click();
    }

}