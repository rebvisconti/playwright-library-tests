import { test, expect } from '@playwright/test';
import { LoginPage } from '../../POM/login.js';
import { BookDetailsPage } from '../../POM/bookdetailspage.js';

test.describe('CT-FE-014: Delete Book Successfully', () => {  
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('http://localhost:3000/login.html');
        await login.preencherEmail('admin@biblioteca.com');
        await login.preencherSenha('123456');
        await login.clicarEntrar();
        await page.waitForLoadState('networkidle');
    });

test.describe('CT-FE-014: Delete Book Successfully', () => {

    test('Validar confirmação e deletar livro com sucesso', async ({ page }) => {

    await page.addInitScript(() => {
    localStorage.setItem('user', JSON.stringify({ nome: 'Admin' }));
    });

    const detalhes = new BookDetailsPage(page);
    
    // TODO: Aqui pode dar erro se tiver mais de um livro criado, pois ele esta pegando o id do primeiro livro criado, e não do ultimo livro criado
    await page.goto('http://localhost:3000/detalhes.html?id=1');
    await expect(detalhes.nome).toBeVisible();

    page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Tem certeza que deseja deletar este livro?');
    await dialog.accept(); 
    });
        
    await detalhes.clicarDeletar();
    
    await page.waitForURL('http://localhost:3000/livros.html');
    await expect(page).toHaveURL('http://localhost:3000/livros.html');
    }); 
});
});