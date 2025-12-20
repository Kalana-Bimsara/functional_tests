const { expect } = require('@playwright/test');
import { LoginPage } from '../../pages/page-objects/LoginPage';
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');

test('Verify invalid user registration - try to register with existing username', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);

  const commonFunctions = PageFactory.getCommonFunctions(page);
  const loginPage = PageFactory.getLoginPage(page);


  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.Click_LogIn_Button();
  await loginPage.click_On_Register_Link();
  await loginPage.enterLoginDetails({ username: 'User_2025_12_20_22_09_1oi', password: 'password' });
  // await loginPage.clickRegisterButton();
  await loginPage.verifyDialogOnAction({
  expectedMessage: 'User already registered',
  action: async () => {
    await loginPage.clickRegisterButton(); // the click that triggers the alert
  }
});
  




});


