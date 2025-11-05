const { test, expect } = require('@playwright/test');

test('add/remove elements works', async ({ page }) => {
  await page.goto('https://the-internet.herok/lksdhflkjshdvckjg');

  const addBtn = page.getByRole('button', { name: 'Add Element' });

  await addBtn.click();
  await addBtn.click();
  await addBtn.click();

  const deletes = page.locator('button:has-text("Delete")');
  await expect(deletes).toHaveCount(3);

  await deletes.nth(0).click();
  await expect(deletes).toHaveCount(2);
});
