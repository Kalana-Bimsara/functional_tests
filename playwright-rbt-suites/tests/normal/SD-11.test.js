const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');
import EnvConfig from '../../resources/ConfigEnvironment.json';


test('Verify Valid user registration    ', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);

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


});


