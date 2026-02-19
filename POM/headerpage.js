export class HeaderPage {
    constructor(page) {
        this.page = page;

        this.btnDashboard = page.getByRole('link', { name: 'Dashboard' })
        this.btnLivros = page.getByRole('link', { name: 'Livros' })
        this.btnFavoritos = page.getByRole('link', { name: 'Favoritos' })
        this.btnLogout = page.getByRole('button', { name: 'Sair' });
        this.userName = page.locator("#nomeUsuario")
    }

    async navegarDashboard() {
        await this.btnDashboard.click();
    }

    async navegarLivros() {
        await this.btnLivros.click();
    }

    async navegarFavoritos() {
        await this.btnFavoritos.click();
    }

    async logout() {
        await this.btnLogout.click();
    }
}
