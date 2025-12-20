const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');

test('Verify Contact Us Form - Valid Data', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);

  const payload = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    message: 'I would like to book an appointment.',
  };

  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });

  await homePage.inputDetatailsToContactUsForm(payload);
  await homePage.clickSubmitButtonInContactUs();

  // UI alert verification
  await homePage.verifyAndAcceptAlert('message saved');

  // ---------------------------
  // DB verification with waiting
  // ---------------------------
  const collection = db.collection('contactus');

  // Poll until record appears (max ~10s)
  let user = null;
  const timeoutMs = 10_000;
  const intervalMs = 500;
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    user = await collection.findOne({ message: payload.message });
    if (user) break;
    await page.waitForTimeout(intervalMs);
  }

  expect(user, `DB record not found within ${timeoutMs}ms for message: "${payload.message}"`).not.toBeNull();

  // Validate fields
  expect(user.name).toBe(payload.name);
  expect(user.email).toBe(payload.email);
  expect(user.message).toBe(payload.message);
});
