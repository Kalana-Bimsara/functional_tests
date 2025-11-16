import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class AdminDashboardPage {

  constructor(page) {
    this.page = page;
    this.txtUsername = page.locator('//input[@id="username"]');
    this.txtPassword = page.locator('//input[@id="password"]');
    this.btnLogin = page.locator('//button[@type="submit"]');
    this.lnkRegister = page.locator('//a[@href="/register"]');
    this.sectionAppoinments = page.locator('//section[@id="Appointments" and contains(normalize-space(),"Appointments")]');
    this.sectionDoctorsAvailability = page.locator('//section[@id="Team" and contains(normalize-space(),"Doctors Availability")]');
    this.sectionDoctors = page.locator('//section[@id="Team" and contains(normalize-space(),"Doctors")][2]');
    this.sectionpriceList = page.locator('//section[@id="price-list" and contains(normalize-space(),"Price List")]');
    this.sectionContactUs = page.locator('//section[@id="price-list" and contains(normalize-space(),"Contact Us")]');
    this.btnAddNewDate = page.locator(`//button[normalize-space(.) = 'Add New Date']`);
    this.btnAddNewDoctor = page.locator(`//button[normalize-space(.) = 'Add New Doctor']`);
    this.btnAddNewService = page.locator(`//button[normalize-space(.) = 'Add New Service']`);




  }

}

export { AdminDashboardPage };
