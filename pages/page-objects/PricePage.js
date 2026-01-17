import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class PricePage {

  constructor(page) {
    this.page = page;
   
   
   

  }

  async verifyPRicePageContents(expectedTexts) {
    for (const text of expectedTexts) {
      await expect(
        this.page,
        `Expected to find "${text}" on the Price Page`
      ).toContainText(text);
    }

  }
}

export { PricePage };
