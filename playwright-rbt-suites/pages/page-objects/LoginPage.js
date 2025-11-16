import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class LoginPage {

  constructor(page) {
    this.page = page;
    this.txtUsername = page.locator('//input[@id="username"]');
    this.txtPassword = page.locator('//input[@id="password"]');
    this.btnLogin = page.locator('//button[@type="submit"]');
    this.lnkRegister = page.locator('//a[@href="/register"]');
  }

  async enterLoginDetails({username, password}) {
    await expect(this.txtUsername).toBeVisible({timeout: 7000});
    await this.txtUsername.fill(username);
    await this.txtPassword.fill(password);
  }

  async clickLoginButton() {
    await this.btnLogin.click();
  }

}

export { LoginPage };
