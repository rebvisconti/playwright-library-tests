import { test, expect } from '@playwright/test';
import { statsApi } from '../../helpers/book.api.js'; 

test.describe('CT-API: Statistics', () => {

  test('CT-API-011: Get Library Statistics', async ({ request }) => {
    
    const stats = await statsApi.get(request);
    
    // Validações de integridade dos dados
    expect(stats).toHaveProperty('totalLivros');
    expect(stats.totalLivros).toBeGreaterThanOrEqual(0);
    
    expect(stats).toHaveProperty('totalPaginas');
    expect(stats.totalPaginas).toBeGreaterThanOrEqual(0);
    
    expect(stats).toHaveProperty('totalUsuarios');
    expect(stats.totalUsuarios).toBeGreaterThanOrEqual(0);
  });

});