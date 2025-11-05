const { test, expect } = require('@playwright/test');

test('login succeeds with valid credentials', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  // Landed on /secure
  await expect(page).toHaveURL(/\/secure$/);

  // Disambiguate the heading (the main title is an H2)
  await expect(page.getByRole('heading', { name: 'Secure Area', level: 2 })).toBeVisible();

  // Flash includes an “x” close icon; use partial text
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

  // Extra safety: Logout link is present
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});
