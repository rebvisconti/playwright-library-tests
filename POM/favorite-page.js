import { expect } from '@playwright/test';

export class FavoritesPage {
    constructor(page) {
        this.page = page;
        this.gridFavoritos = page.locator('#lista-favoritos');
        this.cards = page.locator('.book-card');
        this.msgSemFavoritos = page.getByText('Você ainda não tem livros favoritos.');
    }
}
