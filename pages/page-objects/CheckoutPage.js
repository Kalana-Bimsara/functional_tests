import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class CheckoutPage {

  constructor(page) {
    this.page = page;

    // ✅ locator for the iframe itself (Locator)


    // ✅ frameLocator for inside iframe
    this.stripeFrame = page.frameLocator('#payment-element iframe');
    this.txtCardNumber = this.stripeFrame.locator('input').nth(0);
    this.txtExpiry = this.stripeFrame.locator('input').nth(1);
    this.txtCvc = this.stripeFrame.locator('input').nth(2);
    this.countryInput = this.stripeFrame.locator('input').nth(3);
    this.txtEmail = this.stripeFrame.locator('#Field-linkEmailInput');
    this.txtPhone = this.stripeFrame.locator('#Field-linkMobilePhoneInput');
    this.txtFullName = this.stripeFrame.locator('#Field-linkLegalNameInput');

    // Robust XPath (id + text validation)
    this.btnPayNow = page.locator("//button[@id='submit' and .//span[text()='Pay now']]");

  }

  async fillOptionalCardDetails({ email, phone, fullName }) {
    await this.page.waitForTimeout(2000); // Wait for iframe to load properly
    await this.txtEmail.type(email);
    await this.txtPhone.type(phone);
    await this.txtFullName.type(fullName);

  }

  async fillCardDetails({ number, expiry, cvc, country = 'Sri Lanka' }) {
    await this.page.waitForTimeout(2000); // Wait for iframe to load properly
    await this.txtCardNumber.type(number);
    // Stripe expiry is MM / YY
    await this.txtExpiry.pressSequentially(expiry.replace('/', ''));
    await this.txtCvc.type(cvc);
    // Country: label vs value
    // await this.countryInput.click();
    // await this.countryInput.fill(country);
    // await this.countryInput.press('Enter');
  }


  async verifyPaymentPageLoaded() {
    await expect(
      this.page.locator('#payment-element iframe')
    ).toBeVisible({ timeout: 20000 });

    await expect(this.stripeFrame.locator('input').first())
      .toBeVisible({ timeout: 20000 });

    console.log('✅ Payment iframe is visible');
  }


async submitPayment() {

  // Wait until button is ready
  await expect(this.btnPayNow).toBeVisible({ timeout: 20000 });
  await expect(this.btnPayNow).toBeEnabled({ timeout: 20000 });

  await this.btnPayNow.scrollIntoViewIfNeeded();

  // Click and wait for navigation at same time
  await Promise.all([
    this.page.waitForURL(/\/complete/, { timeout: 20000 }),
    this.btnPayNow.click()
  ]);

}



}

export { CheckoutPage };
