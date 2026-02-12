// @ts-check
import { test, expect } from '@playwright/test';

test('CT-FE-005: Check Route Protection', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());

  await page.goto('http://localhost:3000/dashboard.html');

  await expect(page).toHaveURL('http://localhost:3000/login.html');
});
