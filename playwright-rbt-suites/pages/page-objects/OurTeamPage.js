import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class OurTeamPage {

  constructor(page, selector = '.profile-card') {
    this.page = page;
    this.imgTeamMembers = (imgName) => this.page.locator(`//div[@class="profile-card"]//img[@src="${imgName}"]`);
    this.profileCards = page.locator(selector);

  }

    async verifyDoctorsDetails(doctors = []) {
    if (!Array.isArray(doctors) || doctors.length === 0) {
      console.log('[SKIP] No doctor data provided');
      return;
    }

    const cardCount = await this.profileCards.count();
    console.log(`[INFO] Found ${cardCount} doctor cards`);

    for (const doctor of doctors) {
      const { name, details } = doctor;

      console.log(`[INFO] Verifying doctor: ${name}`);

      // Find the matching card by doctor name
      const card = this.profileCards.filter({
        has: this.page.locator('h5', { hasText: name })
      });

      const count = await card.count();

      expect(
        count,
        `❌ Doctor card not found for "${name}"`
      ).toBeGreaterThan(0);

      // Verify all details inside the matched card
      for (const text of details) {
        await expect(
          card,
          `❌ Missing text "${text}" for doctor "${name}"`
        ).toContainText(text);
      }

      console.log(`✅ Verified all details for ${name}`);
    }
  }
}




export { OurTeamPage };
