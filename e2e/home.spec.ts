import { test, expect } from '@playwright/test';

test('homepage loads and shows global shipping text', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/Global Shipping/i)).toBeVisible();
});
