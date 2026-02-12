import { expect } from '@playwright/test';

export class BooksPage {

  constructor(page) {
    this.page = page;
    this.url = 'http://localhost:3000/livros.html';

    this.inputNome = page.getByRole('textbox', { name: 'Nome do Livro:' });
    this.inputAutor = page.getByRole('textbox', { name: 'Autor:' });
    this.inputPaginas = page.getByRole('spinbutton', { name: 'Número de Páginas:' });
    this.inputDescricao = page.getByRole('textbox', { name: 'Descrição:' });
    this.inputImagem = page.getByRole('textbox', { name: 'URL da Imagem:' });
    this.addBookButton = page.getByRole('button', { name: /Adicionar Livro/i });
    this.listaLivros = page.locator('.book-card');
  }

  async acessar() {
    await this.page.goto(this.url);
  }

  async adicionarLivro({ nome, autor, paginas, descricao, imagem }) {
    await this.inputNome.fill(nome);
    await this.inputAutor.fill(autor);
    await this.inputPaginas.fill(paginas.toString());
    await this.inputDescricao.fill(descricao);
    await this.inputImagem.fill(imagem);
    await this.addBookButton.click();
  }

  async validarFormularioLimpo() {
    await expect(this.inputNome).toHaveValue('');
    await expect(this.inputAutor).toHaveValue('');
    await expect(this.inputPaginas).toHaveValue('');
    await expect(this.inputDescricao).toHaveValue('');
    await expect(this.inputImagem).toHaveValue('');
  }

  async validarLivroNaLista(nome) {
    const livro = this.page.locator('.book-card').filter({ hasText: nome });
    await expect(livro).toHaveCount(1);
  }

  async clicarAdicionar() {
    await this.addBookButton.click();
  }
}
