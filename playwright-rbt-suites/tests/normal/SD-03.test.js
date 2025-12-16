const { expect, test } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';

test('Verify About Our Clinic container', async ({ page }) => {

  const homePage = PageFactory.getHomePage(page);
  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verifyAboutSectionTexts({texts : [
    'About Our Clinic',
    'At Dental Clinic, we always try our best to explain your treatment options and all the costs clearly. Our goal is to make sure every patient feels confident, well-informed, and actively part of their treatment plan.',
    'We provide top-notch dental services with state-of-the-art technology to ensure your smile stays beautiful and healthy.',
    'Experienced Dentists',
    'Modern Equipment',
    'Personalized Care',
    'Comfortable Environment',
    'Emergency Dental Services',
    'Flexible Payment Plans'

  ]});


});
