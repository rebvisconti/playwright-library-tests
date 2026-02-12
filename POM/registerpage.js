export class RegisterPage {

  constructor(page) {
    this.page = page;
    this.url = "http://localhost:3000/registro.html";

    this.name = page.getByRole('textbox', { name: 'Nome:' });
    this.email = page.getByRole('textbox', { name: 'Email:' });
    this.password = page.getByRole('textbox', { name: 'Senha:', exact: true });
    this.repeatPassword = page.getByRole('textbox', { name: 'Confirmar Senha:' });
    this.registerButton = page.getByRole('button', { name: 'Registrar' });
  }

  async acessar() {
    await this.page.goto(this.url);
  }

  async preencherNome(name) {
    await this.name.fill(name);
  }

  async preencherEmail(email) {
    await this.email.fill(email);
  }

  async preencherSenha(password) {
    await this.password.fill(password);
  }

  async preencherRepetirSenha(password) {
    await this.repeatPassword.fill(password);
  }

  async clicarRegistrar() {
    await this.registerButton.click();
  }


  async registrar({ nome, email, senha }) {
    await this.preencherNome(nome);
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.preencherRepetirSenha(senha);
    await this.clicarRegistrar();
  }

  async registrarComSenhasDiferentes({ nome, email, senha, confirmarSenha }) {
    await this.preencherNome(nome);
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.preencherRepetirSenha(confirmarSenha);
    await this.clicarRegistrar();
  }

}
