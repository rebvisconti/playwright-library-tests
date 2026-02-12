import { test, expect } from '@playwright/test';
import {
  criarLivroViaAPI,
  deletarLivroViaAPI,
  atualizarLivroViaAPI,
  listarLivrosViaAPI,
  buscarLivroPorIdViaAPI
} from '../../helpers/book.api.js';

test.describe('CT-API: Books', () => {
  let livroId;

  test('CT-API-005: List All Books', async ({ request }) => {
    const livros = await listarLivrosViaAPI(request);
    expect(Array.isArray(livros)).toBe(true);
    livros.forEach(l => {
      expect(l.id).toBeGreaterThan(0);
      expect(l.paginas).toBeGreaterThan(0);
      expect(l.dataCadastro).toMatch(/\d{4}-\d{2}-\d{2}/);
    });
  });

  test('CT-API-006: Get Book by ID (Existing)', async ({ request }) => {
    const livro = await buscarLivroPorIdViaAPI(request, 1);
    expect(livro.id).toBe(1);
    expect(livro.nome).not.toBe('');
  });

  test('CT-API-007: Get Book by ID (Non-existent)', async ({ request }) => {
    const response = await request.get('http://localhost:3000/livros/9999');
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.mensagem).toBe('Livro não encontrado');
  });

  test('CT-API-008: Add New Book', async ({ request }) => {
    const novoLivro = await criarLivroViaAPI(request, {
      nome: 'Código Limpo',
      autor: 'Robert C. Martin',
      paginas: 425,
      descricao: 'Manual de boas práticas',
      imagem: 'https://exemplo.com/imagem.jpg'
    });
    expect(novoLivro.id).toBeGreaterThan(0);
    expect(novoLivro.nome).toBe('Código Limpo');
  });

  test('CT-API-009: Update Existing Book', async ({ request }) => {
    // Primeiro cria
    const livro = await criarLivroViaAPI(request, {
      nome: 'Livro Atualizar',
      autor: 'Autor X',
      paginas: 100,
      descricao: 'Descrição antiga',
      imagem: 'https://via.placeholder.com/150'
    });
    livroId = livro.id;

    const atualizado = await atualizarLivroViaAPI(request, livroId, {
      nome: 'Clean Code - Edição Atualizada',
      autor: 'Robert C. Martin',
      paginas: 464,
      descricao: 'Guia completo atualizado',
      imagemUrl: 'https://exemplo.com/nova-imagem.jpg'
    });

    expect(atualizado.id).toBe(livroId);
    expect(atualizado.nome).toBe('Clean Code - Edição Atualizada');

    await deletarLivroViaAPI(request, livroId); // cleanup
  });

  test('CT-API-010: Delete Book', async ({ request }) => {
  const livro = await criarLivroViaAPI(request, {
    nome: 'Livro para deletar',
    autor: 'Autor',
    paginas: 100,
    descricao: 'Teste delete',
    imagem: 'https://via.placeholder.com/150'
  });

  // Deletar
  await deletarLivroViaAPI(request, livro.id);

  // Validar que não existe mais
  const response = await request.get(`/livros/${livro.id}`);
  expect(response.status()).toBe(404);
});
});
