import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class CheckoutPage {

  constructor(page) {
    this.page = page;
   
  // ✅ locator for the iframe itself (Locator)
 

  // ✅ frameLocator for inside iframe
  this.stripeFrame = page.frameLocator(
    '#payment-element iframe[title="Secure payment input frame"]'
  );

  // Inputs INSIDE iframe
  this.txtCardNumber = this.stripeFrame.locator('#Field-numberInput');
  this.txtExpiry     = this.stripeFrame.locator('#Field-expiryInput');
  this.txtCvc        = this.stripeFrame.locator('#Field-cvcInput');
  this.ddlCountry    = this.stripeFrame.locator('#Field-countryInput');
  this.txtEmail    = this.stripeFrame.locator('#Field-linkEmailInput');
  this.txtPhone    = this.stripeFrame.locator('#Field-linkMobilePhoneInput');
  this.txtFullName    = this.stripeFrame.locator('#Field-linkLegalNameInput');

  // Button OUTSIDE iframe
  this.btnPayNow = page.getByRole('button', { name: 'Pay now' });

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
  await this.ddlCountry.selectOption({ label: country });
}


  async verifyPaymentPageLoaded() {
  await expect(this.txtCardNumber).toBeVisible({ timeout: 15000 });
  console.log('✅ Payment iframe is visible');
}


  async submitPayment() {
    await this.btnPayNow.click();
  }



}

export { CheckoutPage };
