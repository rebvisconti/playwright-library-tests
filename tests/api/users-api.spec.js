import { test, expect } from '@playwright/test';
import { criarUsuarioViaAPI, loginUsuarioViaAPI } from '../../helpers/usuario.api.js';

test.describe('CT-API: Users', () => {

  test('CT-API-001: Register New User (Success)', async ({ request }) => {
    const email = `maria${Date.now()}@teste.com`;
    const resposta = await criarUsuarioViaAPI(request, {
      nome: 'Maria Silva',
      email,
      senha: 'senha123'
    });

    expect(resposta.mensagem).toBe('Usuário criado com sucesso');
    expect(resposta.usuario.id).toBeGreaterThan(0);
    expect(resposta.usuario.nome).toBe('Maria Silva');
    expect(resposta.usuario.email).toBe(email);
    expect(resposta.usuario.senha).toBeUndefined();
  });

  test('CT-API-002: Register with Duplicate Email (Failure)', async ({ request }) => {
    const resposta = await request.post('http://localhost:3000/registro', {
      data: {
        nome: 'João Santos',
        email: 'admin@biblioteca.com',
        senha: 'senha456'
      }
    });

    expect(resposta.status()).toBe(400);
    const body = await resposta.json();
    expect(body.mensagem).toBe('Email já cadastrado');
  });

  test('CT-API-003: Login with Valid Credentials', async ({ request }) => {
    const resposta = await loginUsuarioViaAPI(request, {
      email: 'admin@biblioteca.com',
      senha: '123456'
    });

    expect(resposta.mensagem).toBe('Login realizado com sucesso');
    expect(resposta.usuario).toBeDefined();
    expect(resposta.usuario.senha).toBeUndefined();
  });

  test('CT-API-004: Login with Invalid Credentials', async ({ request }) => {
    const resposta = await request.post('http://localhost:3000/login', {
      data: { email: 'admin@biblioteca.com', senha: 'senhaerrada' }
    });

    expect(resposta.status()).toBe(401);
    const body = await resposta.json();
    expect(body.mensagem).toBe('Email ou senha incorretos');
  });
});
