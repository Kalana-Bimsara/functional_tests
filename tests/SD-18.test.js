const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';

test('Verify Admin can Add a New Service', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const adminPage = PageFactory.getAdminDashboardPage(page);
  const loginPage = PageFactory.getLoginPage(page);

  const password = EnvConfig.QA.PASSWORD;

  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verify_Navigation_panel([
    'Home',
    'About Us',
    'Services',
    'Prices',
    'Our Team',
    'Contact',
  ]);

  await homePage.Click_LogIn_Button();

  const userName = 'kalanabim777';
  await loginPage.enterLoginDetails({ username: userName, password });
  await loginPage.clickLoginButton();
  await loginPage.VerifyLogInSuccessByCheckingLogoutButton();

  await adminPage.verifyAdminDashboardPageElements();
  await adminPage.clickAddNewServiceButton();

  const serviceName = 'teeth whitening';
  const servicePrice = '7000';

  await adminPage.enterDetailsAddNewService({ serviceName, servicePrice });
  await adminPage.clickAddNewServiceButtonInModal();

  // ✅ DB ASSERT
  await expect.poll(
    async () => db.collection('services').findOne({ name: serviceName, price: servicePrice }),
    { timeout: 10000, intervals: [500, 1000, 2000] }
  ).not.toBeNull();

  const insertedService = await db.collection('services').findOne({
    name: serviceName,
    price: servicePrice,
  });

  expect(insertedService.name).toBe(serviceName);
  expect(insertedService.price).toBe(servicePrice);
  console.log('✅ DB Assert: service exists with correct name & price');

  await page.waitForTimeout(2000);

  // 🧹 DB CLEANUP
  const deleteResult = await db.collection('services').deleteOne({ _id: insertedService._id });
  expect(deleteResult.deletedCount).toBe(1);
  console.log('🧹 Cleanup: service record deleted');

  // ✅ ASSERT: record not present
  const remaining = await db.collection('services').findOne({ _id: insertedService._id });
  expect(remaining).toBeNull();
  console.log('✅ DB Assert: service not present after cleanup');
});
