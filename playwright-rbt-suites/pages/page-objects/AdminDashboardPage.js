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
    this.adminDashboardtext = page.locator('//h4[contains(text(),"Admin Dashboard")]');
    this.btnAddDoctorInModal = page.locator('//button[@type="submit" and contains(text(),"Add Doctor")]');
    this.btnCloseAddDoctorModal = page.locator('(//button[@type="button" and contains(text(),"Close")])[2]');
    this.txtDoctorName = page.locator('//input[@id="doctorName"]');
    this.txtDoctorSpecialization = page.locator('//input[@id="doctorSpecialty"]');
    this.txtDoctorRegistrationNumber = page.locator('//input[@id="doctorRegistration"]'); 


  }



  async enterNewDoctorDetails({ name, specialization, registrationNumber }) {
    await expect(this.txtDoctorName).toBeVisible({ timeout: 7000 });
    if(name){
      await this.txtDoctorName.fill(name);
    }
    if(specialization){
      await this.txtDoctorSpecialization.fill(specialization);
    }
    if(registrationNumber){
      await this.txtDoctorRegistrationNumber.fill(registrationNumber);
    }
  
  }

  async clickAddNewDoctorButton() {
    expect(this.btnAddNewDoctor).toBeVisible({ timeout: 7000 });
    await this.btnAddNewDoctor.click();
  }

  async clickAddDoctorInModalButton() {
    expect(this.btnAddDoctorInModal).toBeVisible({ timeout: 7000 });
    await this.btnAddDoctorInModal.click();
  }


  async verifyAdminDashboardPageElements() {
    await expect(this.adminDashboardtext).toBeVisible({ timeout: 7000 });
    await expect(this.sectionAppoinments).toBeVisible({ timeout: 7000 });
    await expect(this.sectionDoctorsAvailability).toBeVisible({ timeout: 7000 });
    await expect(this.sectionDoctors).toBeVisible({ timeout: 7000 });
    await expect(this.sectionpriceList).toBeVisible({ timeout: 7000 });
    await expect(this.sectionContactUs).toBeVisible({ timeout: 7000 });
    await expect(this.btnAddNewDate).toBeVisible({ timeout: 7000 });
    await expect(this.btnAddNewDoctor).toBeVisible({ timeout: 7000 });
    await expect(this.btnAddNewService).toBeVisible({ timeout: 7000 });
    console.log('✅ Admin Dashboard page elements are verified successfully');
  }

}

export { AdminDashboardPage };
