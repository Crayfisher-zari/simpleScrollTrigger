import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

test('callbackText', async ({ page }) => {
  await page.goto('http://localhost:3333/simpleScrollTrigger/tests/01/');


  const locator = page.locator('.callbackText');
  await expect(locator).toContainText('aaa');
  // Expect a title "to contain" a substring.

});
