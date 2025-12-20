import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class LoginPage {

  constructor(page) {
    this.page = page;
    this.txtUsername = page.locator('//input[@id="username"]');
    this.txtPassword = page.locator('//input[@id="password"]');
    this.btnLogin = page.locator('//button[@type="submit"]');
    this.lnkRegister = page.locator('//a[@href="/register"]');
    this.btnRegister = page.locator('//button[@type="submit" and contains(text(),"Register")]');
    this.divPopUpMessageRegistrationSuccess = page.locator('//h4[contains(text(),"Registration Successful 🎉")]');
    this.btnPopUpMessageOK = page.locator('//button[contains(text(),"OK")]');
    this.btnLogout = page.locator('//button[contains(text(),"Log Out")]');


  }

  async click_On_Register_Link() {
    await expect(this.lnkRegister).toBeVisible({ timeout: 7000 });
    await this.lnkRegister.click();
  }

  async enterLoginDetails({username, password}) {
    await expect(this.txtUsername).toBeVisible({timeout: 7000});
    await this.txtUsername.fill(username);
    await this.txtPassword.fill(password);
  }

  async clickLoginButton() {
    await this.btnLogin.click();
  }

   async clickRegisterButton() {
    expect(this.btnRegister).toBeVisible({ timeout: 7000 });
    await this.btnRegister.click();
  }

  async verifyRegistrationSuccessPopUp() {
    await expect(this.divPopUpMessageRegistrationSuccess).toBeVisible({ timeout: 7000 });
    console.log('✅ Registration success pop-up is visible');
  }

  async clickPopUpMessageOKButton() {
    await this.btnPopUpMessageOK.click();
  }

  async verifyDialogOnAction({ action, expectedMessage, expectedType = 'alert' }) {
  const [dialog] = await Promise.all([
    this.page.waitForEvent('dialog', { timeout: 30000 }),
    action()
  ]);

  console.log('Dialog type:', dialog.type());
  console.log('Dialog message:', dialog.message());

  expect(dialog.type()).toBe(expectedType);
  expect(dialog.message()).toContain(expectedMessage);

  await dialog.accept();
}

async clickLogoutButton() {
    await expect(this.btnLogout).toBeVisible({ timeout: 7000 });
    await this.btnLogout.click();
  }

async VerifyLogInSuccessByCheckingLogoutButton() {
    await expect(this.btnLogout).toBeVisible({ timeout: 7000 });
    console.log('✅ Login successful, Logout button is visible');
  }
}

export { LoginPage };
