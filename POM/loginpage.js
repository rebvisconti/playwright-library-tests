export class LoginPage {

  constructor(page) {
    this.page = page;
    this.email = page.getByRole('textbox', { name: 'Email:' });
    this.password = page.getByRole('textbox', { name: 'Senha:' });
    this.loginButton = page.getByRole('button', { name: 'Entrar' });
    this.url = "http://localhost:3000/login.html";
  }

  async acessar() {
    await this.page.goto(this.url);
  }

  async preencherEmail(email) {
    await this.email.fill(email);
  }

  async preencherSenha(senha) {
    await this.password.fill(senha);
  }

  async clicarEntrar() {
    await this.loginButton.click();
  }

  async login(email, senha) {
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.clicarEntrar();
  }

  async loginAdmin() {
    await this.page.goto(this.url);
    await this.preencherEmail('admin@biblioteca.com');
    await this.preencherSenha('123456');
    await this.clicarEntrar();
  }
}
