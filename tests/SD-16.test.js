const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';

test('Verify Customer can Book a Doctor Appointment Successfully', async ({ db, page }) => {

  const homePage = PageFactory.getHomePage(page);
  const bookingPage = PageFactory.getBookingPage(page);
  const checkoutPage = PageFactory.getCheckoutPage(page);
  const paymentSuccessPage = PageFactory.getPaymentSuccessPage(page);
  const commonFunctions = PageFactory.getCommonFunctions(page);
  const loginPage = PageFactory.getLoginPage(page);
  const adminPage = PageFactory.getAdminDashboardPage(page);

  const password = EnvConfig.QA.PASSWORD;

  // Generate dynamic data
  const userName = await commonFunctions.generateRandomUserName();
  const bookingEmail = `booking_${Date.now()}@yopmail.com`;
  console.log('Generated booking email:', bookingEmail);

  // ------------------- USER REGISTRATION -------------------
  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.Click_LogIn_Button();

  await loginPage.click_On_Register_Link();
  await loginPage.enterLoginDetails({ username: userName, password });
  await loginPage.clickRegisterButton();
  await loginPage.verifyRegistrationSuccessPopUp();
  await loginPage.clickPopUpMessageOKButton();

  // Validate user saved in DB
  await expect.poll(
    async () => db.collection('usermodels').findOne({ username: userName }),
    { timeout: 15000 }
  ).not.toBeNull();

  // ------------------- LOGIN -------------------
  await loginPage.enterLoginDetails({ username: userName, password });
  await loginPage.clickLoginButton();
  await loginPage.VerifyLogInSuccessByCheckingLogoutButton();

  // Verify Admin Dashboard is NOT visible for normal user
  await adminPage.verifyAdminPrivilegesNotVisibleForNormalUser();


  // ------------------- BOOK APPOINTMENT -------------------
  await homePage.click_On_Book_Now_Link();

  await bookingPage.verifyBookAnAppoinmentModel([
    'Book an Appointment',
    'Patient Name',
    'Mobile Number',
    'Email Address',
    'Doctor',
    'service',
    'Select a Date',
  ]);

  await bookingPage.enterDetailsToBookAnAppointment({
    patientName: 'John Doe',
    mobileNumber: '1234567890',
    emailAddress: bookingEmail,   // dynamic email
    doctor: 'sfdsdf',
    service: 'beheth denawa',
    appointmentDate: 'Sat Feb 21 2026'
  });
  await bookingPage.clickBookAppointmentButton();
  await bookingPage.enterDetailsToBookAnAppointment({
    service: 'beheth denawa'
  });

  await bookingPage.clickBookAppointmentButton();

  // ------------------- CHECKOUT -------------------
  await checkoutPage.verifyPaymentPageLoaded();

  await checkoutPage.fillCardDetails({
    number: "4242424242424242",
    expiry: "12/34",
    cvc: "123",
    country: "Sri Lanka",
  });


  await page.waitForTimeout(2000); // Wait for 2 seconds to ensure all details are processed before clicking Pay Now
  await checkoutPage.submitPayment();

  // ------------------- PAYMENT SUCCESS -------------------
  await paymentSuccessPage.verifyPaymentSuccess(
    "Thank You!",
    "Your payment was successful.",
    "We appreciate your purchase."
  );

  // ------------------- DB VALIDATION -------------------
  const savedBooking = await expect.poll(
    async () =>
      db.collection('bookings').findOne({
        emailAddress: bookingEmail
      }),
    { timeout: 20000 }
  ).not.toBeNull();

  const bookingRecord = await db.collection('bookings').findOne({
    emailAddress: bookingEmail
  });

  expect(bookingRecord.patientName).toBe('John Doe');
  expect(bookingRecord.mobileNumber).toBe('1234567890');
  expect(bookingRecord.emailAddress.trim()).toBe(bookingEmail);
  expect(bookingRecord.payment).toBe(true);

  // ------------------- CLEANUP -------------------
  const deleteResult = await db.collection('bookings').deleteMany({
    emailAddress: bookingEmail
  });

  // Optional: verify something was actually deleted
  expect(deleteResult.deletedCount).toBeGreaterThan(0);

  // Assert DB no longer contains the record
  await expect.poll(
    async () =>
      db.collection('bookings').findOne({
        emailAddress: bookingEmail
      }),
    { timeout: 10000 }
  ).toBeNull();

  console.log('✅ Booking validated, deleted, and verified as removed from DB');
});