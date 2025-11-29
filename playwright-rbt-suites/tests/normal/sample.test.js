const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
import EnvConfig from '../../resources/ConfigEnvironment.json';
const { test } = require('../../resources/dbFixture');

test('Sample Test', async ({ db, page }) => {
/*
  const user = await db.collection('usermodels').findOne({ username: 'kalanabim7' });
  expect(user).not.toBeNull();

  // you can still use page as usual
  await page.goto(process.env.BASE_URL);

  const password = EnvConfig.QA.PASSWORD;

  const homePage = PageFactory.getHomePage(page);
  const OurTeamPage = PageFactory.getOurTeamPage(page, '.profile-card');
  const upperPannelPage = PageFactory.getUpperPannelPage(page);
  const bookingPage = PageFactory.getBookingPage(page);
  const loginPage = PageFactory.getLoginPage(page);

  */
/*
  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  // await homePage.click_On_Book_Online_Link();
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.verifyFooterVisible(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await upperPannelPage.navigateToOurTeamPage();
  await OurTeamPage.verifyDoctorContactdetails([
    'Dr Lahiru Rajakaruna',
    'BDS (Peradeniya), MSc (Colombo), MD HI (Colombo), MAAID (USA)',
    'Director',
    'Smile Dental Hospitals',
    'Sri Lanka Medical Council Registration Number: 2698',

  ]);

  await homePage.click_On_Book_Now_Link();
  await loginPage.enterLoginDetails({ username: 'kalanabim7', password });
  await loginPage.clickLoginButton();
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
    doctor: 'yoshitha',
    service: 'ECG',
    appointmentDate: 'Sun Nov 30 2025'

  })

  await bookingPage.clickBookAppointmentButton();
 console.log('Sample test completed successfully.'  );*/

});
