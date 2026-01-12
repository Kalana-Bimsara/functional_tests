import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class CheckoutPage {

  constructor(page) {
    this.page = page;
    // 1) Locate the iframe
    this.stripeFrame = page.frameLocator('iframe[title="Secure payment input frame"]');

    // 2) Inputs INSIDE the iframe
    this.txtCardNumber = this.stripeFrame.getByLabel('Card number');
    this.txtExpiry = this.stripeFrame.getByLabel('Expiration date');
    this.txtCvc = this.stripeFrame.getByLabel('Security code');
    this.ddlCountry = this.stripeFrame.getByLabel('Country');

    // 3) Button OUTSIDE the iframe
    this.btnPayNow = page.getByRole('button', { name: 'Pay now' });

  }

   async fillCardDetails({ number, expiry, cvc, country = 'Sri Lanka' }) {
    await expect(this.stripeFrame).toBeVisible({ timeout: 10000 });

    await this.txtCardNumber.fill(number);
    await this.txtExpiry.fill(expiry);      // e.g. "12 / 34"
    await this.txtCvc.fill(cvc);
    await this.ddlCountry.selectOption(country);
  }

  async submitPayment() {
    await this.btnPayNow.click();
  }



}

export { CheckoutPage };
