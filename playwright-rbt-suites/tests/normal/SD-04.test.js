const { expect, test } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';

test('Verify Our Services ', async ({ page }) => {

  const homePage = PageFactory.getHomePage(page);
  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verifyTeethWhiteningService({
    header: 'Teeth Whitening',
    body: 'Brighten your smile with our professional teeth whitening services'
  });

  await homePage.verifyDentalImplantsService({
    header: 'Dental Implants',
    body: 'Restore your smile with durable and natural-looking dental implants'
  });

  await homePage.verifyCosmeticBracesService({
    header: 'Braces & Invisalign',
    body: 'Invisalign is a clear aligner system that straightens teeth discreetly'
  });







});
