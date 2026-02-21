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
    this.btnCloseAddNewDateModal = page.locator('(//button[@type="button" and contains(text(),"Close")])[1]');

    this.txtDoctorName = page.locator('//input[@id="doctorName"]');
    this.txtDoctorSpecialization = page.locator('//input[@id="doctorSpecialty"]');
    this.txtDoctorRegistrationNumber = page.locator('//input[@id="doctorRegistration"]');
    this.btnServiceName = page.locator('//input[@id="serviceName"]');
    this.btnServicePrice = page.locator('//input[@id="servicePrice"]');
    this.btnAddServiceInModal = page.locator('//button[@type="submit" and contains(text(),"Add Service")]');
    this.btnCancelAddServiceModal = page.locator('//button[@type="button" and contains(text(),"Cancel")]');
    this.btnAdminDashboard = page.locator('//a[@href="/dashboard" and contains(text(),"Admin Dashboard")]');

    // Modal
    this.modal = page.locator('#addDateModal');

    // Doctor dropdown (ID-based)
    this.selectDoctor = page.locator('#doctor');

    // Date input (type="date")
    this.inputDate = page.locator('#appointmentDate');

    // Buttons
    this.btnAddDate = page.getByRole('button', { name: 'Add Date' });
    this.btnClose = page.getByRole('button', { name: 'Close' });

    this.EmptyDataValidatonMessageDoctorName = page.locator('//span[@class="text-danger" and contains(text(),"Please select a doctor")]');
    this.EmptyDataValidatonMessageDate = page.locator('//span[@class="text-danger" and contains(text(),"Please select a date")]');
    this.EmptyDataValidatonMessageDoctorInAddingDoctor = page.locator('//p[@class="text-danger" and contains(text(),"Doctor name is required")]');
    this.EmptyDataValidatonMessageSpecializationInAddingDoctor = page.locator('//p[@class="text-danger" and contains(text(),"Specialty is required")]');
    this.EmptyDataValidatonMessageRegistrationNumberInAddingDoctor = page.locator('//p[@class="text-danger" and contains(text(),"Registration number is required")]');
    this.EmptyDataValidatonMessageServiceName = page.locator('//div[@class="invalid-feedback" and contains(text(),"Service name is required")]');
    this.EmptyDataValidatonMessageServicePrice = page.locator('//div[@class="invalid-feedback" and contains(text(),"Service price is required")]');
  }

  async clickCancelAddServiceButtonAndVerify() {
    expect(this.btnCancelAddServiceModal).toBeVisible({ timeout: 7000 });
    await this.btnCancelAddServiceModal.click();
    await this.page.waitForTimeout(2000);
    expect(this.btnCancelAddServiceModal).not.toBeVisible({ timeout: 7000 });
  }

  async verifyValidationMesageEmptServiceName() {
    expect(this.EmptyDataValidatonMessageServiceName).toBeVisible({ timeout: 7000 });
  }

  async verifyValidationMesageEmptServicePrice() {
    expect(this.EmptyDataValidatonMessageServicePrice).toBeVisible({ timeout: 7000 });
  }

  async verifyValidationMesageEmptDoctorNameInAddingDoctor() {
    expect(this.EmptyDataValidatonMessageDoctorInAddingDoctor).toBeVisible({ timeout: 7000 });
  }

  async verifyValidationMesageEmptSpecializationInAddingDoctor() {
    expect(this.EmptyDataValidatonMessageSpecializationInAddingDoctor).toBeVisible({ timeout: 7000 });
  }

  async verifyValidationMesageEmptRegistrationNumberInAddingDoctor() {
    expect(this.EmptyDataValidatonMessageRegistrationNumberInAddingDoctor).toBeVisible({ timeout: 7000 });
  }

  async clickCloseAddNewDateModalButtonAndVerify() {
    await this.page.waitForTimeout(1000);
    expect(this.btnCloseAddNewDateModal).toBeVisible({ timeout: 7000 });
    await this.btnCloseAddNewDateModal.click();
    expect(this.btnCloseAddNewDateModal).not.toBeVisible({ timeout: 7000 });
  }

  async clickCloseAddDoctorModalButtonAndVerify() {
    expect(this.btnCloseAddDoctorModal).toBeVisible({ timeout: 7000 });
    await this.btnCloseAddDoctorModal.click();
    expect(this.btnCloseAddDoctorModal).not.toBeVisible({ timeout: 7000 });
  }

  async verifyValidatonMesageEmptDoctorName() {
    expect(this.EmptyDataValidatonMessageDoctorName).toBeVisible({ timeout: 7000 });
  }

  async verifyValidatonMesageEmptDate() {
    expect(this.EmptyDataValidatonMessageDate).toBeVisible({ timeout: 7000 });
  }

  async clickCloseAddDoctorModalButtonAndVerify() {
    expect(this.btnCloseAddDoctorModal).toBeVisible({ timeout: 7000 });
    await this.btnCloseAddDoctorModal.click();
    expect(this.btnCloseAddDoctorModal).not.toBeVisible({ timeout: 7000 });

  }

  async addNewDate({ doctorName, date }) {
    // Wait for modal to be visible
    await expect(this.modal).toBeVisible({ timeout: 7000 });

    // Select doctor (by visible text)
    if (doctorName) {
      await this.selectDoctor.selectOption({ label: doctorName });
      await expect(this.selectDoctor.locator('option:checked'))
        .toHaveText(doctorName);
    }

    // Enter date (YYYY-MM-DD)
    if (date) {
      await this.inputDate.fill(date);
      await expect(this.inputDate).toHaveValue(date);
    }


  }

  async clickAddDateButton() {
    expect(this.btnAddDate).toBeVisible({ timeout: 7000 });
    await this.btnAddDate.click();
  }


  async clickAddNewDateButton() {
    expect(this.btnAddNewDate).toBeVisible({ timeout: 7000 });
    await this.btnAddNewDate.click();
  }

  async enterDetailsAddNewService({ serviceName, servicePrice }) {
    await expect(this.btnServiceName).toBeVisible({ timeout: 7000 });

    // Service Name
    if (serviceName !== undefined) {
      await this.btnServiceName.fill(String(serviceName)); // allows ''
    } else {
      await this.btnServiceName.fill(''); // clear if not provided
    }

    // Service Price
    if (servicePrice !== undefined) {
      await this.btnServicePrice.fill(String(servicePrice));
    } else {
      await this.btnServicePrice.fill('');
    }
  }


  async clickAddNewServiceButton() {
    expect(this.btnAddNewService).toBeVisible({ timeout: 7000 });
    await this.btnAddNewService.click();
  }


  async clickAddNewServiceButtonInModal() {
    expect(this.btnAddServiceInModal).toBeVisible({ timeout: 7000 });
    await this.btnAddServiceInModal.click();
  }

  async clickCancelAddServiceButton() {
    expect(this.btnCancelAddServiceModal).toBeVisible({ timeout: 7000 });
    await this.btnCancelAddServiceModal.click();
  }


  async enterNewDoctorDetails({ name, specialization, registrationNumber }) {
    await expect(this.txtDoctorName).toBeVisible({ timeout: 7000 });

    // Doctor Name
    if (name !== undefined) {
      await this.txtDoctorName.fill(String(name));   // allows '' too
    } else {
      await this.txtDoctorName.fill('');            // clear if not provided
    }

    // Specialization
    if (specialization !== undefined) {
      await this.txtDoctorSpecialization.fill(String(specialization));
    } else {
      await this.txtDoctorSpecialization.fill('');
    }

    // Registration Number
    if (registrationNumber !== undefined) {
      await this.txtDoctorRegistrationNumber.fill(String(registrationNumber));
    } else {
      await this.txtDoctorRegistrationNumber.fill('');
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
    await expect(this.btnAdminDashboard).toBeVisible({ timeout: 7000 });

    console.log('✅ Admin Dashboard page elements are verified successfully');
  }


  async verifyAdminPrivilegesNotVisibleForNormalUser() {

    await expect(this.adminDashboardtext).not.toBeVisible({ timeout: 5000 });
    await expect(this.sectionAppoinments).not.toBeVisible({ timeout: 5000 });
    await expect(this.sectionDoctorsAvailability).not.toBeVisible({ timeout: 5000 });
    await expect(this.sectionDoctors).not.toBeVisible({ timeout: 5000 });
    await expect(this.sectionpriceList).not.toBeVisible({ timeout: 5000 });
    await expect(this.sectionContactUs).not.toBeVisible({ timeout: 5000 });
    await expect(this.btnAddNewDate).not.toBeVisible({ timeout: 5000 });
    await expect(this.btnAddNewDoctor).not.toBeVisible({ timeout: 5000 });
    await expect(this.btnAddNewService).not.toBeVisible({ timeout: 5000 });
    await expect(this.btnAdminDashboard).not.toBeVisible({ timeout: 5000 });

    console.log('✅ Admin privileges are NOT visible for normal user');
  }


}

export { AdminDashboardPage };
