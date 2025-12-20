const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');

test('Verify Social media icons and navigation   ', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const OurTeamPage = PageFactory.getOurTeamPage(page, '.profile-card');
  const upperPannelPage = PageFactory.getUpperPannelPage(page);

  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.verifyFooterVisible(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.verifySocialMediaIconsNavigation();
  




});
