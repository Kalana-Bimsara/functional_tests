import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class HomePage {

  constructor(page, root) {
    this.page = page;
    this.baseUrl = EnvConfig.QA.BASE_URL;
    this.lblWelcome_Text = (text) => page.locator(`//h1[contains(normalize-space(),"${text}")]`);
    this.lnkBookonline = page.locator('//a[@href="/booking" and contains(normalize-space(),"Book Online")]');
    this.nav = page.locator('ul.navbar-nav.ms-auto');
    this.links = this.nav.locator('a.nav-link');
    this.lnkBookNow = page.locator('//a[@href="/booking"]');
    this.lnkLogIn = page.locator('//*[@id="navbarNav"]/a[2]');
    this.formContactUs = page.locator('//*[@id="contact"]//form');
    this.txtName = page.locator('//input[@id="name"]');
    this.txtEmail = page.locator('//input[@id="email"]');
    this.txtMessage = page.locator('//textarea[@id="message"]');
    this.btnSubmit = page.locator('//button[@type="submit"]');
    this.divInvalideMessageName = page.locator('//div[@class="invalid-feedback" and contains(normalize-space(),"Name is required")]');
    this.divInvalideMessageName = page.locator('//div[@class="invalid-feedback" and contains(normalize-space(),"Email is required")]');
    this.divInvalideMessageName = page.locator('//div[@class="invalid-feedback" and contains(normalize-space(),"Message is required")]');
    this.headerTeethWhitening = (header) => page.locator(`//img[@src="whitening.webp"]/../h5[contains(normalize-space(),"${header}")]`);
    this.bodyTeethWhitening = (body) => page.locator(`//img[@src="whitening.webp"]/../p[contains(normalize-space(),"${body}")]`);
    this.headerDentalImplants = (header) => page.locator(`//img[@src="implants.webp"]/../h5[contains(normalize-space(),"${header}")]`);
    this.bodyDentalImplants = (body) => page.locator(`//img[@src="implants.webp"]/../p[contains(normalize-space(),"${body}")]`);
    this.headerCosmeticBraces = (header) => page.locator(`//img[@src="braces & Invisalign.webp"]/../h5[contains(normalize-space(),"${header}")]`);
    this.bodyCosmeticBraces = (body) => page.locator(`//img[@src="braces & Invisalign.webp"]/../p[contains(normalize-space(),"${body}")]`);
    this.lnkLargerMap = page.locator('//a[@aria-label="View larger map"]');
    this.container = page.locator('ul.navbar-nav');
    this.imgFb = page.locator('//img[@src="fb.png"]');
    this.imgYoutube = page.locator('//img[@src="yt.png"]');
    this.imgInstagram = page.locator('//img[@src="instra.png"]');
    const scope = root ?? page.locator('header, nav[role="navigation"], #navbarNav').first();
    this.container = scope.locator('ul.navbar-nav').first();


  }

  async navigate_To_Home_Page() {

    await this.page.goto(this.baseUrl);
  }

  async verify_The_Welcome_Text({ text }) {

    await expect(this.lblWelcome_Text(text)).toBeVisible({ timeout: 7000 });
  }

  async click_On_Book_Online_Link() {
    await expect(this.lnkBookonline).toBeVisible({ timeout: 7000 });
    await this.lnkBookonline.click();
  }

  async click_On_Book_Now_Link() {
    // await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await expect(this.lnkBookNow).toBeVisible({ timeout: 7000 });
    await this.lnkBookNow.click();
  }

  async verify_Navigation_panel(expected) {
    await this.nav.waitFor();


    // log what's visible
    const visible = (await this.links.allTextContents())
      .map(t => t.trim())
      .filter(Boolean);
    console.log('Visible nav items:', visible);

    // assert each expected label is visible inside the navbar
    for (const label of expected) {
      await expect(this.nav.getByRole('link', { name: label, exact: true })).toBeVisible();
    }
  }

  async verify_Navigation_Panel_Buttons() {

    await expect(this.lnkBookNow).toBeVisible({ timeout: 7000 });
    await expect(this.lnkLogIn).toBeVisible({ timeout: 7000 });
  }

  link(label) {

    return this.container.getByRole('link', { name: label, exact: true }).first();
  }

  async verifyFooterVisible(labels) {
    for (const label of labels) {
      await expect(this.link(label)).toBeVisible();
    }
  }

}

export { HomePage };
