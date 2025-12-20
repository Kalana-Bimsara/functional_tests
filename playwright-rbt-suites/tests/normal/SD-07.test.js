const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');

test('Verify Our Location ', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);

  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verifyLOcationMapVisible();

});
