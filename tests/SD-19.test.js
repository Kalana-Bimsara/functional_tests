const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';

test('Verify Price Page content', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const adminPage = PageFactory.getAdminDashboardPage(page);
  const loginPage = PageFactory.getLoginPage(page);
  const upperPannelPage = PageFactory.getUpperPannelPage(page);
  const pricePage = PageFactory.getPricePage(page);

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

  await upperPannelPage.navigateToPricesPage();
  await pricePage.verifyPRicePageContents([
    'Our Prices',
    'We offer competitive pricing for all our dental services without compromising on quality care.',
    'General Dentistry',
    'Cosmetic Dentistry',
    'Orthodontics',
    'Pediatric Dentistry',
    'Oral Surgery',
  ]);
  
});
