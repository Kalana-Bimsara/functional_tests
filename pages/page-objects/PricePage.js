import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class PricePage {

  constructor(page) {
    this.page = page;
    // Table
  this.priceTable = page.locator('table.table.table-bordered.table-striped');
  this.tableHeaders = this.priceTable.locator('thead th');
  this.tableRows = this.priceTable.locator('tbody tr');

  this.serviceCells = this.priceTable.locator('tbody tr td.service-column');
  this.priceCells = this.priceTable.locator('tbody tr td.price-column');
   
   

  }

  async verifyPricePageContents(expectedRows = []) {

  // Wait for table
  await expect(this.priceTable).toBeVisible();

  // Verify headers
  await expect(this.tableHeaders.nth(0)).toHaveText(/Services/i);
  await expect(this.tableHeaders.nth(1)).toHaveText(/Prices/i);

  const rowCount = await this.tableRows.count();

  console.log(`[INFO] Found ${rowCount} rows in price table`);

  for (const { service, price } of expectedRows) {

    const row = this.tableRows.filter({
      has: this.page.locator('td.service-column', { hasText: service })
    });

    await expect(
      row,
      `❌ Service row not found: "${service}"`
    ).toHaveCount(1);

    await expect(
      row,
      `❌ Price mismatch for "${service}"`
    ).toContainText(price);

    console.log(`✅ Verified: ${service} -> ${price}`);
  }
}

}

export { PricePage };
