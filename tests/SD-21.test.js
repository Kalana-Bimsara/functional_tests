const { expect } = require('@playwright/test');
import { PageFactory } from '../pages/PageFactory';
const { test } = require('../resources/dbFixture');
import EnvConfig from '../resources/ConfigEnvironment.json';

test(
  'Verify admin can not Add a Doctor with invalid details',
  { annotations: [{ type: 'impact', description: 'high' }] },
  async ({ db, page }) => {

    const homePage = PageFactory.getHomePage(page);
    const commonFunctions = PageFactory.getCommonFunctions(page);
    const loginPage = PageFactory.getLoginPage(page);
    const adminDashboardPage = PageFactory.getAdminDashboardPage(page);
    const password = EnvConfig.QA.PASSWORD;

    await homePage.navigate_To_Home_Page();
    await homePage.verify_The_Welcome_Text({ text: 'Welcome to Smile Dental' });
    await homePage.verify_Navigation_panel([
      'Home', 'About Us', 'Services', 'Prices', 'Our Team', 'Contact'
    ]);
    await homePage.Click_LogIn_Button();

    const userName = await commonFunctions.generateRandomUserName();

    await loginPage.click_On_Register_Link();
    await loginPage.enterLoginDetails({ username: userName, password });
    await loginPage.clickRegisterButton();
    await loginPage.verifyRegistrationSuccessPopUp();
    await loginPage.clickPopUpMessageOKButton();

    // ✅ Wait until user exists in DB
    await expect.poll(
      async () => db.collection('usermodels').findOne({ username: userName }),
      { timeout: 10000, intervals: [1000, 2000, 3000] }
    ).not.toBeNull();

    // ✅ Promote user to admin
    const updateResult = await db.collection('usermodels').updateOne(
      { username: userName },
      { $set: { isAdmin: true } }
    );

    expect(updateResult.matchedCount).toBe(1);
    expect(updateResult.modifiedCount).toBe(1);

    const updatedUser = await db.collection('usermodels').findOne({ username: userName });
    expect(updatedUser.isAdmin).toBe(true);

    // ✅ Login as admin
    await loginPage.enterLoginDetails({ username: userName, password });
    await loginPage.clickLoginButton();
    await adminDashboardPage.verifyAdminDashboardPageElements();
    await adminDashboardPage.clickAddNewDoctorButton();

    const regNo = await commonFunctions.generateRegistrationNumber();
    const name = await commonFunctions.generateRandomDoctorName();

    // await adminDashboardPage.enterNewDoctorDetails({
    //   name,
    //   specialization: 'Dentist',
    //   registrationNumber: regNo
    // });

    // empty all validation
    await adminDashboardPage.enterNewDoctorDetails({});
    await adminDashboardPage.clickAddDoctorInModalButton();
    await adminDashboardPage.verifyValidationMesageEmptDoctorNameInAddingDoctor();
    await adminDashboardPage.verifyValidationMesageEmptSpecializationInAddingDoctor();
    await adminDashboardPage.verifyValidationMesageEmptRegistrationNumberInAddingDoctor();

    // empty name validation
    await adminDashboardPage.enterNewDoctorDetails({
      specialization: 'Dentist',
      registrationNumber: regNo
    });
    await adminDashboardPage.clickAddDoctorInModalButton();
    await adminDashboardPage.verifyValidationMesageEmptDoctorNameInAddingDoctor();

    // empty specialization validation
    await adminDashboardPage.enterNewDoctorDetails({
      name,
      registrationNumber: regNo
    });
    await adminDashboardPage.clickAddDoctorInModalButton();
    await adminDashboardPage.verifyValidationMesageEmptSpecializationInAddingDoctor();

    //empy registration number validation
    await adminDashboardPage.enterNewDoctorDetails({
      name,
      specialization: 'Dentist',
    });
    await adminDashboardPage.clickAddDoctorInModalButton();
    await adminDashboardPage.verifyValidationMesageEmptRegistrationNumberInAddingDoctor();

    // vslidsion wih only insering name
    await adminDashboardPage.enterNewDoctorDetails({
      name,
    });
    await adminDashboardPage.clickAddDoctorInModalButton();
    await adminDashboardPage.verifyValidationMesageEmptSpecializationInAddingDoctor();
    await adminDashboardPage.verifyValidationMesageEmptRegistrationNumberInAddingDoctor();

    //validsion with only inserting specialization
    await adminDashboardPage.enterNewDoctorDetails({
      specialization: 'Dentist',
    });
    await adminDashboardPage.clickAddDoctorInModalButton();
    await adminDashboardPage.verifyValidationMesageEmptDoctorNameInAddingDoctor();
    await adminDashboardPage.verifyValidationMesageEmptRegistrationNumberInAddingDoctor();

    // validsion with only inserting registration number
    await adminDashboardPage.enterNewDoctorDetails({
      registrationNumber: regNo,
    });
    await adminDashboardPage.clickAddDoctorInModalButton();
    await adminDashboardPage.verifyValidationMesageEmptDoctorNameInAddingDoctor();
    await adminDashboardPage.verifyValidationMesageEmptSpecializationInAddingDoctor();

    


    // ---------------------------
    // 🧹 DB CLEANUP: delete test admin user
    // ---------------------------
    const deleteUserResult = await db.collection('usermodels').deleteOne({
      username: userName,
    });

    expect(deleteUserResult.deletedCount).toBe(1);
    console.log(`🧹 Cleanup: deleted test user ${userName}`);

    // ---------------------------
    // ✅ ASSERT: user no longer exists
    // ---------------------------
    const deletedUser = await db.collection('usermodels').findOne({
      username: userName,
    });

    expect(deletedUser).toBeNull();
    console.log('✅ DB Assert: test user removed successfully');








  }
);
