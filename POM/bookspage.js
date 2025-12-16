import { expect } from '@playwright/test';

export class BooksPage {

    constructor(page) {
        this.page = page;

        this.inputNome = page.getByRole('textbox', { name: 'Nome do Livro:' });
        this.inputAutor = page.getByRole('textbox', { name: 'Autor:' });
        this.inputPaginas = page.getByRole('spinbutton', { name: 'Número de Páginas:' });
        this.inputDescricao = page.getByRole('textbox', { name: 'Descrição:' });
        this.inputImagem = page.getByRole('textbox', { name: 'URL da Imagem:' });
        this.addBookButton = page.getByRole('button', { name: /Adicionar Livro/i });
        this.listaLivros = page.locator('.book-card');
    }

    async preencherNome(nome) {
        await this.inputNome.fill(nome);
    }

    async preencherAutor(autor) {
        await this.inputAutor.fill(autor);
    }

    async preencherPaginas(paginas) {
        await this.inputPaginas.fill(paginas);
    }

    async preencherDescricao(descricao) {
        await this.inputDescricao.fill(descricao);
    }

    async preencherImagem(url) {
        await this.inputImagem.fill(url);
    }

    async clicarAdicionar() {
        await this.addBookButton.click();
    }
}
