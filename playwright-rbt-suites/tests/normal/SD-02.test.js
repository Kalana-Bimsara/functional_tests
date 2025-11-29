const { expect, test } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';

test('Verify welcome banner content', async ({  page }) => {

  const homePage = PageFactory.getHomePage(page);
  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });

});
