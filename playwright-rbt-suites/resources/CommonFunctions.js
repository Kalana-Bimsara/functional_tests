import { expect } from 'playwright/test';
import EnvConfig from '../resources/ConfigEnvironment.json';

class CommonFunctions {

  constructor(page) {
    this.page = page;
    this.lnkPrices = page.locator('//a[@href="/price"]');
    this.lnkOurTeam = page.locator('//a[@href="/ourteam"]');
  }

  async generateRandomUserName() {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  const timeStamp = `${yyyy}_${mm}_${dd}_${hh}_${min}`; // safe timestamp
  const randomPart = Math.random().toString(36).slice(2, 5); // 3 chars

  const userName = `User_${timeStamp}_${randomPart}`;

  console.log('Generated random username:', userName);
  return userName;
}


}

export { CommonFunctions };
