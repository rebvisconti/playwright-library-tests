import { test, expect } from '@playwright/test';
import { authApi } from '../../helpers/book.api.js'; 

test.describe('CT-API: Users', () => {

  test('CT-API-001: Register New User (Success)', async ({ request }) => {
    const email = `maria${Date.now()}@teste.com`;


    const resposta = await authApi.register(request, {
      nome: 'Maria Silva',
      email,
      senha: 'senha123'
    });

    expect(resposta.mensagem).toBe('Usuário criado com sucesso');
    expect(resposta.usuario.id).toBeGreaterThan(0);
    expect(resposta.usuario.nome).toBe('Maria Silva');
    expect(resposta.usuario.email).toBe(email);
    // Segurança: Garantir que a senha não é retornada no JSON
    expect(resposta.usuario.senha).toBeUndefined();
  });

  test('CT-API-002: Register with Duplicate Email (Failure)', async ({ request }) => {
    // Usamos o rejects.toThrow porque o helper lança erro em status 400
    await expect(authApi.register(request, {
      nome: 'João Santos',
      email: 'admin@biblioteca.com',
      senha: 'senha456'
    })).rejects.toThrow(/400/);

    await expect(authApi.register(request, {
      nome: 'João Santos',
      email: 'admin@biblioteca.com',
      senha: 'senha456'
    })).rejects.toThrow(/Email já cadastrado/);
  });

  test('CT-API-003: Login with Valid Credentials', async ({ request }) => {
    const resposta = await authApi.login(request, {
      email: 'admin@biblioteca.com',
      senha: '123456'
    });

    expect(resposta.mensagem).toBe('Login realizado com sucesso');
    expect(resposta.usuario).toBeDefined();
    expect(resposta.usuario.senha).toBeUndefined();
  });

  test('CT-API-004: Login with Invalid Credentials', async ({ request }) => {
    // Validando falha de autenticação (401)
    await expect(authApi.login(request, {
      email: 'admin@biblioteca.com',
      senha: 'senhaerrada'
    })).rejects.toThrow(/401/);

    await expect(authApi.login(request, {
      email: 'admin@biblioteca.com',
      senha: 'senhaerrada'
    })).rejects.toThrow(/Email ou senha incorretos/);
  });
});