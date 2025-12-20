const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');

test('Verify Contact Us Form - Invalid Data', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);

  const payload = {
    name: '',
    email: '',
    message: '',
  };

  const payload2 = {
    name: '',
    email: 'kalanabimsara74@gmail.com',
    message: 'testing validation with name field blank',
  };

  const payload3 = {
    name: 'lasith',
    email: '',
    message: 'testing validation email field blank',
  };

  const payload4 = {
    name: 'lasith',
    email: 'lasith@yopmail.com',
    message: '',
  };
    const payload5 = {
    name: 'lasith',
    email: 'invalidyopmail.com',
    message: 'testing or invalid email format',
  };



  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });

  await homePage.inputDetatailsToContactUsForm(payload);
  await homePage.clickSubmitButtonInContactUs();
  await homePage.verifyValidationsContactUsForm({});

  // name field left blank
  await homePage.inputDetatailsToContactUsForm(payload2);
  await homePage.clickSubmitButtonInContactUs();
  await homePage.verifyValidationsContactUsForm({ email: false, message: false, name: true });

  // email field left blank
  await homePage.inputDetatailsToContactUsForm(payload3);
  await homePage.clickSubmitButtonInContactUs();
  await homePage.verifyValidationsContactUsForm({ name: false, message: false, email: true });

  // message field left blank
  await homePage.inputDetatailsToContactUsForm(payload4);
  await homePage.clickSubmitButtonInContactUs();
  await homePage.verifyValidationsContactUsForm({ name: false, message: true, email: false });

  //email invalid format
 
  await homePage.inputDetatailsToContactUsForm(payload5);
  await homePage.clickSubmitButtonInContactUs();
  await homePage.verifyEmailValidationAppears();




});
