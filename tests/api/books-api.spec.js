import { test, expect } from '@playwright/test';
import { booksApi } from '../../helpers/book.api.js'; 

test.describe('CT-API: Books', () => {

  test('CT-API-005: List All Books', async ({ request }) => {
    const livros = await booksApi.listAll(request);
    
    expect(Array.isArray(livros)).toBe(true);
    livros.forEach(l => {
      expect(l.id).toBeGreaterThan(0);
      expect(l.paginas).toBeGreaterThan(0);
      expect(l.dataCadastro).toMatch(/\d{4}-\d{2}-\d{2}/);
    });
  });

  test('CT-API-006: Get Book by ID (Existing)', async ({ request }) => {
    // Usando ID 1 como base, mas o ideal seria criar um antes
    const livro = await booksApi.getById(request, 1);
    
    expect(livro.id).toBe(1);
    expect(livro.nome).not.toBe('');
  });

  test('CT-API-007: Get Book by ID (Non-existent)', async ({ request }) => {
    // Aqui usamos o expect().rejects porque o seu helper dá throw em 404
    await expect(booksApi.getById(request, 9999))
      .rejects.toThrow(/404/);
  });

  test('CT-API-008: Add New Book', async ({ request }) => {
    const novoLivro = await booksApi.create(request, {
      nome: `Código Limpo ${Date.now()}`, // Timestamp para evitar duplicidade
      autor: 'Robert C. Martin',
      paginas: 425,
      descricao: 'Manual de boas práticas',
      imagem: 'https://exemplo.com/imagem.jpg'
    });

    expect(novoLivro.id).toBeGreaterThan(0);
    expect(novoLivro.nome).toContain('Código Limpo');
  });

  test('CT-API-009: Update Existing Book', async ({ request }) => {
    // 1. Setup via API
    const livro = await booksApi.create(request, {
      nome: 'Livro Atualizar',
      autor: 'Autor X',
      paginas: 100,
      descricao: 'Descrição antiga',
      imagem: 'https://via.placeholder.com/150'
    });

    // 2. Ação
    const atualizado = await booksApi.update(request, livro.id, {
      nome: 'Clean Code - Edição Atualizada',
      autor: 'Robert C. Martin',
      paginas: 464,
      descricao: 'Guia completo atualizado',
      imagemUrl: 'https://exemplo.com/nova-imagem.jpg'
    });

    // 3. Validação
    expect(atualizado.id).toBe(livro.id);
    expect(atualizado.nome).toBe('Clean Code - Edição Atualizada');

    // Cleanup
    await booksApi.delete(request, livro.id);
  });

  test('CT-API-010: Delete Book', async ({ request }) => {
    const livro = await booksApi.create(request, {
      nome: 'Livro para deletar',
      autor: 'Autor',
      paginas: 100,
      descricao: 'Teste delete',
      imagem: 'https://via.placeholder.com/150'
    });

    await booksApi.delete(request, livro.id);

    // Validar que não existe mais (o helper deve lançar erro 404)
    await expect(booksApi.getById(request, livro.id))
      .rejects.toThrow(/404/);
  });
});