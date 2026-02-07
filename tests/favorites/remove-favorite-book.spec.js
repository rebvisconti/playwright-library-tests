// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';
import { capturarAlert } from '../../helpers/capturaralert.js';

test.describe('CT-FE-012: Remove Book from Favorites', () => {  
  let livroId;  // ID do livro criado para teste

  test.beforeEach(async ({ page, request }) => {
    // 1. Login UI
    const login = new LoginPage(page);
    await page.goto('http://localhost:3000/login.html');
    await login.preencherEmail('admin@biblioteca.com');
    await login.preencherSenha('123456');
    await login.clicarEntrar();
    await page.waitForLoadState('networkidle');

    // 2. CRIAR LIVRO (CT-API-009)
    const createLivro = await request.post('http://localhost:3000/livros', {
      data: {
        nome: `Livro Teste Remover Favorito ${Date.now()}`,
        autor: 'Autor Teste Playwright',
        paginas: 250,
        descricao: 'Para testar desfavoritar UI',
        imagemUrl: 'https://exemplo.com/teste.jpg',
        estoque: 3,
        preco: 19.90
      }
    });
    expect(createLivro.status()).toBe(201);
    const novoLivro = await createLivro.json();
    livroId = novoLivro.id;

    // 3. ADICIONAR FAVORITO (CT-API-014) – garante botão "Desfavoritar" visível
    await request.post('http://localhost:3000/favoritos', {
      data: {
        usuarioId: 1,     // Admin
        livroId: livroId  // O novo livro!
      }
    });
  });


  test('CT-FE-012: Remove Book from Favorites', async ({ page }) => {
    // ❌ Remove localStorage fake!
    
    const detalhes = new BookDetailsPage(page);
    await page.goto(`http://localhost:3000/detalhes.html?id=${livroId}`);  // Usa ID real!
    await page.waitForLoadState('networkidle');

    const alerta = capturarAlert(page);

    // Clica em "Desfavoritar" e captura alerta
    // TODO: Aqui esta dando erro se tiver mais de um livro criado, pois ele esta pegando o id do primeiro livro criado, e não do ultimo livro criado
    await detalhes.clicarDesfavoritar();  
    const msg = await alerta;

    expect(msg).toContain('Removido dos favoritos!');
  });
});
