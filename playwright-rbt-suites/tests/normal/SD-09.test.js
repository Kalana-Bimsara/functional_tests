const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');

test('Verify Appoinment Policy content  ', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const OurTeamPage = PageFactory.getOurTeamPage(page, '.profile-card');
  const upperPannelPage = PageFactory.getUpperPannelPage(page);

  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.verifyFooterVisible(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await upperPannelPage.navigateToOurTeamPage();
  await OurTeamPage.verifyAppointmentPolicyFourParagraphs({
  expectedParagraphs: [
    'Scheduling: At our dental clinic, we place a high value on punctuality and efficiency. This is why we operate strictly by appointment, ensuring that each patient has a dedicated time slot just for them. By doing so, we are able to minimize wait times and ensure a seamless experience from start to finish. We understand the importance of your time and strive to provide you with a stress-free, timely, and comfortable dental visit.',
    'Confirmations: At our dental clinic, we are proud to offer the convenience of online booking. Once you have confirmed your appointment through our secure online system, there is no need for further verification. However, in the event of any changes or cancellations, our clinic may reach out to you via phone to ensure that we are able to accommodate your needs.',
    'Arrival Time: We kindly request that our valued patients arrive a few minutes prior to their scheduled appointment time. This reserved time slot is specifically set aside for you and we want to ensure that we make the most of it. Arriving a few minutes early also gives us the opportunity to prepare for your visit and address any questions or concerns you may have. We appreciate your cooperation and look forward to providing you with exceptional dental care.',
    'Payment: Patients are responsible for paying their portion of the bill at the time of their appointment, unless other arrangements have been made in advance. The clinic accepts various forms of payment, including cash, credit, and debit cards.'
  ]
});



});
