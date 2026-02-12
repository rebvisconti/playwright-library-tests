import { test, expect } from '@playwright/test';
import { obterEstatisticasViaAPI } from '../../helpers/book.api.js';

test.describe('CT-API: Statistics', () => {
  test('CT-API-011: Get Library Statistics', async ({ request }) => {
    const stats = await obterEstatisticasViaAPI(request);
    expect(stats.totalLivros).toBeGreaterThanOrEqual(0);
    expect(stats.totalPaginas).toBeGreaterThanOrEqual(0);
    expect(stats.totalUsuarios).toBeGreaterThanOrEqual(0);
  });
});
