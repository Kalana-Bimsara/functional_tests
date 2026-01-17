const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';

test('Verify Admin can not Add a New Date for a Doctor with invalid details', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const bookingPage = PageFactory.getBookingPage(page);
  const checkoutPage = PageFactory.getCheckoutPage(page);
  const adminPage = PageFactory.getAdminDashboardPage(page);
  const commonFunctions = PageFactory.getCommonFunctions(page);
  const loginPage = PageFactory.getLoginPage(page);

  const password = EnvConfig.QA.PASSWORD;

  const doctorName = 'Kalana';
  const date = await commonFunctions.getDateMinusDays(5);
  console.log('date is: ', date);

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

  await adminPage.clickAddDateButton();

  await adminPage.verifyValidatonMesageEmptDoctorName();
  await adminPage.verifyValidatonMesageEmptDate();
  await adminPage.clickCloseAddNewDateModalButtonAndVerify();

  // validtin without date
  await adminPage.clickAddNewDateButton();
  await adminPage.addNewDate({
    doctorName
  });
  await adminPage.clickAddDateButton();
  await adminPage.verifyValidatonMesageEmptDate();

  //validation message with invalid date
  await adminPage.addNewDate({
    date,
  });

  await adminPage.clickAddDateButton();
  await page.waitForTimeout(7000);

  // ---------- ✅ DB ASSERT: record NOT inserted ----------
  const availableDates = db.collection('availabledates');

  // if your DB stores date as ISO midnight, this will match
  const count = await availableDates.countDocuments({
    doctor_id: doctorId,
    date: new Date(date),
  });

  expect(count).toBe(0);
  console.log('✅ DB Assert: No availabledates record inserted for invalid details');


});
