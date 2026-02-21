import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class PaymentSuccessPage {
  constructor(page) {
    this.page = page;

    // Root container using your XPath
    this.container = page.locator("//h1[contains(text(),'Thank You!')]/..");

    this.header = this.container.locator("h1");
    this.message1 = this.container.locator("p:nth-of-type(1)");
    this.message2 = this.container.locator("p:nth-of-type(2)");
    this.paymentId = this.container.locator("p strong");
    this.backButton = this.container.locator("button");
  }

 async verifyPaymentSuccess(expectedHeader, expectedMsg1, expectedMsg2) {

  // 1️⃣ Wait for URL to load with timeout
  await this.page.waitForURL(/\/complete/, {
    timeout: 15000,   // 15 seconds max wait
  });

  const currentUrl = new URL(this.page.url());

  // 2️⃣ Validate URL structure
  expect(currentUrl.pathname).toBe('/complete');

  expect(currentUrl.searchParams.has('payment_intent')).toBeTruthy();
  expect(currentUrl.searchParams.has('payment_intent_client_secret')).toBeTruthy();
  expect(currentUrl.searchParams.get('redirect_status')).toBe('succeeded');

  const paymentIntent = currentUrl.searchParams.get('payment_intent');
  expect(paymentIntent).toMatch(/^pi_/);

  // 3️⃣ Validate UI Content
  await expect(this.container).toBeVisible({ timeout: 10000 });

  await expect(this.header).toHaveText(expectedHeader);
  await expect(this.message1).toHaveText(expectedMsg1);
  await expect(this.message2).toHaveText(expectedMsg2);

  await expect(this.backButton).toBeVisible();
}
}

export { PaymentSuccessPage };
