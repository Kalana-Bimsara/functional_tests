import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class CheckoutPage {

  constructor(page) {
    this.page = page;
    // anchor to payment-element iframe (unique)
    this.stripeFrame = page.frameLocator(
      '#payment-element iframe[title="Secure payment input frame"]'
    );

    // Stripe input locators inside iframe
    this.cardNumber = this.stripeFrame.locator("#Field-numberInput");
    this.cardExpiry = this.stripeFrame.locator("#Field-expiryInput"); // expects MM / YY
    this.cardCvc = this.stripeFrame.locator("#Field-cvcInput");
    this.selectCountry = this.stripeFrame.locator('#Field-countryInput');



  }

  async enterCardDetails(cardNo, expMMYY, cvc, countryName) {
    await expect(this.cardNumber).toBeVisible();

    await this.cardNumber.click();
    await this.cardNumber.type(cardNo);

    await this.cardExpiry.click();
    await this.cardExpiry.pressSequentially(expMMYY); // -> 12 / 34

    await this.cardCvc.click();
    await this.cardCvc.type(cvc);
    
    await this.selectCountry.selectOption({ label: countryName });
    await expect(this.selectCountry.locator("option:checked")).toHaveText(countryName);


  }



}

export { CheckoutPage };
