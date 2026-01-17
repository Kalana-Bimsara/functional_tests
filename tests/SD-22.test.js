const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';

test('Verify Admin can not Add a New Service with invalid data', async ({ db, page }) => {
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

  await adminPage.enterDetailsAddNewService({});
  await adminPage.clickAddNewServiceButtonInModal();

  await adminPage.verifyValidationMesageEmptServicePrice();
  await adminPage.verifyValidationMesageEmptServiceName();

  // verify with empty service name
  await adminPage.enterDetailsAddNewService({ servicePrice });
  await adminPage.clickAddNewServiceButtonInModal();
  await adminPage.verifyValidationMesageEmptServiceName();

  // verify with empty service price
  await adminPage.enterDetailsAddNewService({ serviceName });
  await adminPage.clickAddNewServiceButtonInModal();
  await adminPage.verifyValidationMesageEmptServicePrice();


  //veify close buonton
  await adminPage.clickCancelAddServiceButtonAndVerify();



});
