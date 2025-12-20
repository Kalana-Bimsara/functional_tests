const { expect } = require('@playwright/test');
import { PageFactory } from '../../pages/PageFactory';
const { test } = require('../../resources/dbFixture');

test('Verify Team members  ', async ({ db, page }) => {
  const homePage = PageFactory.getHomePage(page);
  const OurTeamPage = PageFactory.getOurTeamPage(page, '.profile-card');
  const upperPannelPage = PageFactory.getUpperPannelPage(page);

  await homePage.navigate_To_Home_Page();
  await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
  await homePage.verify_Navigation_panel(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await homePage.verifyFooterVisible(['Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact']);
  await upperPannelPage.navigateToOurTeamPage();
  await OurTeamPage.verifyDoctorsDetails([
    {
      name: 'Dr Lahiru Rajakaruna',
      details: [
        'BDS (Peradeniya), MSc (Colombo), MD HI (Colombo), MAAID (USA)',
        'Director',
        'Smile Dental Hospitals',
        'Sri Lanka Medical Council Registration Number: 2698'
      ]
    },
    {
      name: 'Dr Deepali Nanayakkara',
      details: [
        'BDS (Peradeniya), MD Ortho (Colombo), M Orth RCS (UK)',
        'Consultant Orthodontist',
        'Sri Lanka Medical Council Registration Number: 2453'
      ]
    },
    {
      name: 'Dr Malinda Senadhirathna',
      details: [
        'BDS (Peradeniya), MD OMFS (Colombo)',
        'Consultant OMF Surgeon',
        'Sri Lanka Medical Council Registration Number: 2735'
      ]
    },
    {
      name: 'Dr Dinali Gayasha',
      details: [
        'BDS (Peradeniya)',
        'Dental Surgeon',
        'Sri Lanka Medical Council Registration Number: 2968'
      ]
    }
  ]);


});
