const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';

test('Verify Add a', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const bookingPage = PageFactory.getBookingPage(page);
  const checkoutPage = PageFactory.getCheckoutPage(page);
  const adminPage = PageFactory.getAdminDashboardPage(page);
  const commonFunctions = PageFactory.getCommonFunctions(page);
  const loginPage = PageFactory.getLoginPage(page);

  const password = EnvConfig.QA.PASSWORD;

  const doctorName = 'Dr. Thilina Madhawa Silva';
  const date = await commonFunctions.getDatePlusDays(5);;

  // 🔹 Fetch doctorId from DB
  const doctor = await db.collection('doctors').findOne({ name: doctorName });
  if (!doctor) {
    throw new Error(`Doctor not found in DB: ${doctorName}`);
  }

  // IMPORTANT: doctor_id is stored as STRING in availabledates
  const doctorId = doctor._id.toString();

  // ---------- UI FLOW ----------
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
  await adminPage.clickAddNewDateButton();

  await adminPage.addNewDate({
    doctorName,
    date,
  });

  await adminPage.clickAddDateButton();

  await page.waitForTimeout(7000); // wait for DB to update

  // ---------- 🧹 DB CLEANUP ----------
  const result = await db.collection('availabledates').deleteMany({
    doctor_id: doctorId,          // ✅ string match
    date: new Date(date),         // ✅ exact date match
  });

  console.log(`🧹 Cleanup: deleted ${result.deletedCount} availabledate record(s)`);
});
