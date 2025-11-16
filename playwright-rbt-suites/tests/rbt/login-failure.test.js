const { test, expect } = require('@playwright/test');

test('login fails with invalid password', async ({ page }) => {
  await page.goto('http://13.232.101.236/');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('wrong-password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/\/login/);
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});
