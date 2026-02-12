import { expect } from '@playwright/test';

export class BookDetailsPage {

    constructor(page) {
        this.page = page;

        this.imgLivro = page.getByRole('img');
        this.nome = page.locator('h2:visible');
        this.autor = page.locator(':text-is("Autor:")');
        this.paginas = page.locator(':text-is("Páginas:")');
        this.descricao = page.locator(':text-is("Descrição:")');


        this.btnFavoritar = page.getByRole('button', { name: '🤍 Adicionar aos Favoritos' });
        this.btnDesfavoritar = page.getByRole('button', { name: '❤️ Remover dos Favoritos' });
        this.btnDeletar = page.getByRole('button', { name: '🗑️ Deletar Livro' });
    }

    async clicarFavoritar() {
        await expect(this.btnFavoritar).toBeVisible();
        await this.btnFavoritar.click();
    }

    async clicarDesfavoritar() {
        await expect(this.btnDesfavoritar).toBeVisible();
        await this.btnDesfavoritar.click();
    }

    async clicarDeletar() {
        await expect(this.btnDeletar).toBeVisible();
        await this.btnDeletar.click();
    }

}