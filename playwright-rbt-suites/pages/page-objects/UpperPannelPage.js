import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class UpperPannelPage {

  constructor(page) {
    this.page = page;
    this.lnkPrices = page.locator('//a[@href="/price"]');
    this.lnkOurTeam = page.locator('//a[@href="/ourteam"]');
  }

  async navigateToOurTeamPage() {
    await this.lnkOurTeam.click();
  }

  async navigateToPricesPage() {
    await this.lnkPrices.click();
  }

}

export { UpperPannelPage };
