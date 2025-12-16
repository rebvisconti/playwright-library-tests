import { expect } from '@playwright/test';

export class DashboardPage {
  
    constructor(page) {
    this.page = page;

    this.statCards = page.locator('.stat-card');
    this.statNumbers = page.locator('.stat-card .number');
    this.livrosGrid = page.locator('#livros-recentes');
    this.livrosCards = page.locator('.book-card');
  }

  async validarEstatisticasVisiveis() {
    await expect(this.statCards.nth(0)).toBeVisible();
    await expect(this.statCards.nth(1)).toBeVisible();
    await expect(this.statCards.nth(2)).toBeVisible();
  }

  async validarNumerosFormatados() {
    const regex = /^[0-9]+$/;
    const count = await this.statNumbers.count();

    for (let i = 0; i < count; i++) {
      const value = await this.statNumbers.nth(i).innerText();
      expect(value).toMatch(regex);
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

    for (let i = 0; i < count; i++) {
      const card = this.livrosCards.nth(i);

      await expect(card.locator('img:visible')).toBeVisible();
      await expect(card.locator('h3:visible')).toBeVisible();
      await expect(card.locator('p').first()).toBeVisible(); 
      await expect(card.locator('p').nth(1)).toBeVisible();   
    }
  }
}