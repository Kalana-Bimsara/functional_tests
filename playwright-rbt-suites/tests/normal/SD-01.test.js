const { expect, test } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';

test('Verify navigation Pannel', async ({  page }) => {

  const homePage = PageFactory.getHomePage(page);
  await homePage.navigate_To_Home_Page();
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);

});
