import { expect } from '@playwright/test';

export class DashboardPage {

  constructor(page) {
    this.page = page;
    this.url = 'http://localhost:3000/dashboard.html';

    this.statCards = page.locator('.stat-card');
    this.statNumbers = page.locator('.stat-card .number');

    this.livrosGrid = page.locator('#livros-recentes');
    this.livrosCards = page.locator('.book-card');
  }

  async acessar() {
    await this.page.goto(this.url);
  }

  async validarEstatisticasVisiveis() {
    const count = await this.statCards.count();
    expect(count).toBeGreaterThan(0);
    await expect(this.statCards.first()).toBeVisible();
  }

  async validarNumerosFormatados() {
    const regex = /^[0-9]+$/;
    const count = await this.statNumbers.count();

    for (let i = 0; i < count; i++) {
      const value = await this.statNumbers.nth(i).innerText();
      expect(value.trim()).toMatch(regex);
    }
  }

  async validarGridLivros() {
    await expect(this.livrosGrid).toBeVisible();
  }

  async validarMaximoCincoLivros() {
    const count = await this.livrosCards.count();
    expect(count).toBeLessThanOrEqual(5);
  }

  async validarEstruturaLivros() {
    const count = await this.livrosCards.count();
    expect(count).toBeLessThanOrEqual(5);

    for (let i = 0; i < count; i++) {
      const card = this.livrosCards.nth(i);

      await expect(card.locator('img')).toBeVisible();
      await expect(card.locator('h3')).toBeVisible();
      await expect(card).toContainText(/Autor/i);
    }
  }
}
