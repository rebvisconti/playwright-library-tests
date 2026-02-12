import { test, expect } from '@playwright/test';
import {
  criarLivroViaAPI,
  deletarLivroViaAPI,
  favoritarLivroViaAPI,
  listarFavoritosViaAPI,
  desfavoritarLivroViaAPI
} from '../../helpers/book.api.js';

test.describe('CT-API: Favorites', () => {

  test('CT-API-012: Add Book to Favorites', async ({ request }) => {
    const livro = await criarLivroViaAPI(request, {
      nome: `Livro Favorito ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 150,
      descricao: 'Teste favoritos',
      imagem: 'https://via.placeholder.com/150'
    });

    const resp = await favoritarLivroViaAPI(request, 1, livro.id);

    expect(resp.mensagem).toBe('Livro adicionado aos favoritos');

    await desfavoritarLivroViaAPI(request, 1, livro.id);
    await deletarLivroViaAPI(request, livro.id);
  });

  test('CT-API-013: List User Favorites', async ({ request }) => {
    const livro = await criarLivroViaAPI(request, {
      nome: `Livro Favorito ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 150,
      descricao: 'Teste favoritos',
      imagem: 'https://via.placeholder.com/150'
    });

    await favoritarLivroViaAPI(request, 1, livro.id);

    const favoritos = await listarFavoritosViaAPI(request, 1);

    expect(Array.isArray(favoritos)).toBe(true);
    expect(favoritos.some(f => f.id === livro.id)).toBe(true);

    await desfavoritarLivroViaAPI(request, 1, livro.id);
    await deletarLivroViaAPI(request, livro.id);
  });

});
