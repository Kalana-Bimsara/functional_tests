const { test, expect } = require('@playwright/test');

test('dropdown selection persists', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  const select = page.locator('#dropdown');

  await select.selectOption('1');
  await expect(select).toHaveValue('1');

  await select.selectOption('2');
  await expect(select).toHaveValue('2');
});
