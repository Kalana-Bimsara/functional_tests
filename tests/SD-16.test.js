const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';


test('Verify Customer can Book a an Doctor Appoinment Successfully    ', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const bookingPage = PageFactory.getBookingPage(page);
  const checkoutPage = PageFactory.getCheckoutPage(page);


  const commonFunctions = PageFactory.getCommonFunctions(page);
  const loginPage = PageFactory.getLoginPage(page);
  const password = EnvConfig.QA.PASSWORD;


  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.Click_LogIn_Button();
  const userName = await commonFunctions.generateRandomUserName();
  await loginPage.click_On_Register_Link();
  await loginPage.enterLoginDetails({ username: userName, password });
  await loginPage.clickRegisterButton();
  await loginPage.verifyRegistrationSuccessPopUp();
  await loginPage.clickPopUpMessageOKButton();

  const user = await expect.poll(
    async () => db.collection('usermodels').findOne({ username: userName }),
    {
      timeout: 10000,
      intervals: [1000, 2000, 3000] // progressive polling (optional)
    }
  ).not.toBeNull();


  await loginPage.enterLoginDetails({ username: userName, password });
  await loginPage.clickLoginButton();
  await loginPage.VerifyLogInSuccessByCheckingLogoutButton();
  await homePage.click_On_Book_Now_Link();

  await bookingPage.verifyBookAnAppoinmentModel([
    'Book an Appointment',
    'Patient Name',
    'Mobile Number',
    'Email Address',
    'Doctor',
    'service',         // lower-case to match label
    'Select a Date',   // actual label text
  ]);

  await bookingPage.enterDetailsToBookAnAppointment({
    patientName: 'John Doe',
    mobileNumber: '1234567890',
    emailAddress: ' kalana@yopmail.com',
    doctor: 'sfdsdf',
    service: 'beheth denawa',
    appointmentDate: 'Sat Feb 21 2026'

  });
  await bookingPage.clickBookAppointmentButton();
  await bookingPage.enterDetailsToBookAnAppointment({
    service: 'beheth denawa'
  });
  await bookingPage.clickBookAppointmentButton();
  await checkoutPage.verifyPaymentPageLoaded();
  await checkoutPage.fillCardDetails({
    number: "4242424242424242",
    expiry: "12/34",
    cvc: "123",
    country: "Sri Lanka",
  });

  // await checkoutPage.fillOptionalCardDetails({
  //   email: "kalana@yopmail.com",
  //   phone: "0714567890",
  //   fullName: "Maha Rawana"
  // });
  await page.waitForTimeout(2000); // Wait for optional fields to be filled before submitting
  await checkoutPage.submitPayment();




});

  