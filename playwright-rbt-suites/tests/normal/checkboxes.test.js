const { test, expect } = require('@playwright/test');

test('checkboxes toggle correctly', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  const boxes = page.locator('input[type="checkbox"]');
  await expect(boxes).toHaveCount(2);

  // Make first checked, second unchecked (final state we assert)
  if (!(await boxes.nth(0).isChecked())) {
    await boxes.nth(0).check();
  }
  if (await boxes.nth(1).isChecked()) {
    await boxes.nth(1).uncheck();
  }

  await expect(boxes.nth(0)).toBeChecked();
  await expect(boxes.nth(1)).not.toBeChecked();
});
