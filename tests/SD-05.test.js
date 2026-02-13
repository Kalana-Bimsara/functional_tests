const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');

test('Verify Contact Us Form - Valid Data', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const commonFunctions = PageFactory.getCommonFunctions(page);

  // 🔑 Unique test marker
  const uniqueId = Date.now();
  const name = await commonFunctions.generateRandomUserName()

  const payload = {
    name,
    email: `${name}@yahoo.com`,
    message: `[TEST-${uniqueId}], I would like to book an appointment. `,
  };

  // ---------- UI ----------
  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });

  await homePage.inputDetatailsToContactUsForm(payload);
  await homePage.clickSubmitButtonInContactUs();
  await homePage.verifyAndAcceptAlert('message saved');

  // ---------- DB VERIFY ----------
  const collection = db.collection('contactus');

  // ✅ WAIT until record exists
  await expect.poll(
    async () =>
      collection.findOne({
        name: payload.name,
        email: payload.email,
        message: payload.message,
      }),
    { timeout: 10000, intervals: [500, 1000, 2000] }
  ).not.toBeNull();

  // ✅ NOW fetch the record normally
  const user = await collection.findOne({
    name: payload.name,
    email: payload.email,
    message: payload.message,
  });

  expect(user).not.toBeNull();
  expect(user.name).toBe(payload.name);
  expect(user.email).toBe(payload.email);
  expect(user.message).toBe(payload.message);

  // ---------- HARD WAIT ----------
  await page.waitForTimeout(4000);

  // ---------- 🧹 CLEANUP ----------
  const deleteResult = await collection.deleteOne({ _id: user._id });
  expect(deleteResult.deletedCount).toBe(1);
  console.log('🧹 Cleanup: contactus record deleted');

  // ---------- FINAL ASSERT ----------
  const remaining = await collection.findOne({ _id: user._id });
  expect(remaining).toBeNull();
  console.log('✅ DB Assert: contactus record not present after cleanup');
});
