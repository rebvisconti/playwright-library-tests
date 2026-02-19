import { test, expect } from '@playwright/test';
import { booksApi, favoritesApi } from '../../helpers/book.api.js'; 

test.describe('CT-API: Favorites', () => {
  const usuarioId = 1; 

  test('CT-API-012: Add Book to Favorites', async ({ request }) => {
    
    const livro = await booksApi.create(request, {
      nome: `Livro Favorito ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 150,
      descricao: 'Teste favoritos',
      imagem: 'https://via.placeholder.com/150'
    });

    const resp = await favoritesApi.add(request, usuarioId, livro.id);
    
    expect(resp.mensagem).toBe('Livro adicionado aos favoritos');

    await favoritesApi.remove(request, usuarioId, livro.id);
    await booksApi.delete(request, livro.id);
  });

  test('CT-API-013: List User Favorites', async ({ request }) => {
    
    const livro = await booksApi.create(request, {
      nome: `Livro Listar ${Date.now()}`,
      autor: 'Autor Teste',
      paginas: 150,
      descricao: 'Teste listagem',
      imagem: 'https://via.placeholder.com/150'
    });

    await favoritesApi.add(request, usuarioId, livro.id);
    
    const favoritos = await favoritesApi.listByUser(request, usuarioId);
    
    expect(Array.isArray(favoritos)).toBe(true);
    // Verifica se o livro que criamos está na lista
    expect(favoritos.some(f => f.id === livro.id)).toBe(true);
    
    await favoritesApi.remove(request, usuarioId, livro.id);
    await booksApi.delete(request, livro.id);
  });

});