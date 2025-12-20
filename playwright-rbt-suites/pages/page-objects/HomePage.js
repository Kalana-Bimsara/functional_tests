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
    this.divInvalideMessageEmail = page.locator('//div[@class="invalid-feedback" and contains(normalize-space(),"Email is required")]');
    this.divInvalideMessageMessage = page.locator('//div[@class="invalid-feedback" and contains(normalize-space(),"Message is required")]');
    this.divInvalideMessageEmailtype = page.locator('//div[@class="invalid-feedback" and contains(normalize-space(),"Enter a valid email address")]');
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
    this.aboutSection = page.locator('//section[@id="about"]');
    // iframe itself (optional to keep)
    this.mapIframe = page.frameLocator('//section[@id="location"]//iframe');

    // element INSIDE iframe
    this.divMap = this.mapIframe.locator('#mapDiv');



  }

  async verifyLOcationMapVisible() {
    await expect(this.divMap).toBeVisible({ timeout: 7000 });
  console.log('✅ Location map is visible in the Contact Us section');
  }

  async verifyEmailValidationAppears() {
    await expect(this.divInvalideMessageEmailtype).toBeVisible({ timeout: 7000 });
    console.log('email format validation visible for invalid email format');
  }

  async verifyAndAcceptAlert(expectedMessage) {
    const dialog = await this.page.waitForEvent('dialog');

    const actualMessage = dialog.message();
    console.log('[INFO] Alert message:', actualMessage);

    expect(
      actualMessage.trim(),
      `❌ Alert text mismatch. Expected: "${expectedMessage}", Got: "${actualMessage}"`
    ).toBe(expectedMessage);

    await dialog.accept(); // clicks OK
    console.log('[INFO] Alert accepted (OK clicked)');
  }



  async inputDetatailsToContactUsForm({ name, email, message }) {
    await expect(this.formContactUs).toBeVisible({ timeout: 7000 });
    await this.txtName.fill(name);
    await this.txtEmail.fill(email);
    await this.txtMessage.fill(message);

  }

  async verifyValidationsContactUsForm({ name = true, email = true, message = true }) {
    await expect(this.formContactUs).toBeVisible({ timeout: 7000 });
    await this.page.waitForTimeout(1700); // wait for validations to appear
    if (name == true) {
      await expect(this.divInvalideMessageName).toBeVisible();
      console.log('name validation visible');
    } else {
      console.log('Skipping name validation aas name field is not present');
    }
    if (email == true) {
      await expect(this.divInvalideMessageEmail).toBeVisible();
      console.log('email validation visible');
    }
    else {
      console.log('Skipping email validation as email field is not present');
    }

    if (message == true) {
      await expect(this.divInvalideMessageMessage).toBeVisible();
      console.log('message validation visible');
    }
    else {
      console.log('Skipping message validation as message field is not present');
    }

  }

  async clickSubmitButtonInContactUs() {
    await this.btnSubmit.click();
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

  async verifyAboutSectionTexts({ texts = [] }) {
    const expectedTexts = Array.isArray(texts) ? texts : [texts];

    if (expectedTexts.length === 0) {
      console.log('[SKIP] No texts provided for About section');
      return;
    }

    console.log('[INFO] Verifying About section texts');

    // Get ALL visible text once
    const sectionText = (await this.aboutSection.innerText())
      .replace(/\s+/g, ' ')   // normalize whitespace
      .trim();

    for (const text of expectedTexts) {
      const normalizedExpected = text.replace(/\s+/g, ' ').trim();
      const isPresent = sectionText.includes(normalizedExpected);

      console.log(`[VERIFY] "${text}" → ${isPresent}`);

      expect(
        isPresent,
        `❌ Text "${text}" NOT found inside About section`
      ).toBeTruthy();
    }

    console.log('[INFO] About section verification completed');
  }

  async verifyTeethWhiteningService({ header, body }) {
    console.log('[INFO] Verifying Teeth Whitening service');

    if (header) {
      await expect(
        this.headerTeethWhitening(header),
        `❌ Teeth Whitening header "${header}" not visible`
      ).toBeVisible();
    }

    if (body) {
      await expect(
        this.bodyTeethWhitening(body),
        `❌ Teeth Whitening body text not visible`
      ).toBeVisible();
    }

    console.log('[PASS] Teeth Whitening service verified');
  }

  async verifyDentalImplantsService({ header, body }) {
    console.log('[INFO] Verifying Dental Implants service');

    if (header) {
      await expect(
        this.headerDentalImplants(header),
        `❌ Dental Implants header "${header}" not visible`
      ).toBeVisible();
    }

    if (body) {
      await expect(
        this.bodyDentalImplants(body),
        `❌ Dental Implants body text not visible`
      ).toBeVisible();
    }

    console.log('[PASS] Dental Implants service verified');
  }


  async verifyCosmeticBracesService({ header, body }) {
    console.log('[INFO] Verifying Braces & Invisalign service');

    if (header) {
      await expect(
        this.headerCosmeticBraces(header),
        `❌ Braces & Invisalign header "${header}" not visible`
      ).toBeVisible();
    }

    if (body) {
      await expect(
        this.bodyCosmeticBraces(body),
        `❌ Braces & Invisalign body text not visible`
      ).toBeVisible();
    }

    console.log('[PASS] Braces & Invisalign service verified');
  }





}

export { HomePage };
