// helpers/capturarAlert.js
import { expect } from '@playwright/test';

export function capturarAlert(page) {
  return new Promise((resolve) => {
    page.once('dialog', async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      resolve(message);
    });
  });
}
