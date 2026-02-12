export class FavoritesPage {
    constructor(page) {
        this.page = page;
        this.url = "http://localhost:3000/favoritos.html";
        this.gridFavoritos = page.locator('#lista-favoritos');
        this.cards = page.locator('.book-card');
        this.msgSemFavoritos = page.getByText('Você ainda não tem livros favoritos.');
    }

    async acessar() {
        await this.page.goto(this.url);
    }
}
