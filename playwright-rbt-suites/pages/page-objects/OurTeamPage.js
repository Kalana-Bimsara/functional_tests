import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class OurTeamPage {

  constructor(page, selector = '.profile-card') {
    this.page = page;
    this.imgTeamMembers = (imgName) => this.page.locator(`//div[@class="profile-card"]//img[@src="${imgName}"]`);
    this.card = page.locator(selector).first();

  }

   async verifyDoctorContactdetails(texts) {
    for (const text of texts) {
      await expect(
        this.card,
        `Expected to find "${text}" inside profile card`
      ).toContainText(text);
    }
  }

}

export { OurTeamPage };
