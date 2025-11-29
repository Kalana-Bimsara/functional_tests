import { expect } from 'playwright/test';
import EnvConfig from '../../resources/ConfigEnvironment.json';

class BookingPage {

  constructor(page) {
    this.page = page;

    this.textPatientName = page.locator('//input[@id="patientName"]');
    this.textMobileNumber = page.locator('//input[@id="mobileNumber"]');
    this.textEmailAddress = page.locator('//input[@id="emailAddress"]');
    this.selectDoctor = page.locator('//select[@id="doctor"]');
    this.selectService = page.locator('//select[@id="service"]');
    this.selectAppointmentDate = page.locator('//select[@id="appointmentDate"]');
    this.btnBookAppointment = page.locator('//button[@type="submit" and  contains(normalize-space(),"Book Appointment")]');
    this.btnClose = page.locator('//button[@type="button" and  contains(normalize-space(),"Close")]');
    this.modal = page.locator('#appointmentModal').first();




  }

  async navigateToOurTeamPage() {
    await this.lnkOurTeam.click();
  }

  async verifyBookAnAppoinmentModel(texts) {
    await expect(this.modal).toBeVisible({ timeout: 7000 });
    for (const text of texts) {
      await expect(
        this.modal,
        `Expected to find "${text}" inside the appointment modal`
      ).toContainText(text);
    }

    await expect(this.textPatientName).toBeVisible();
    await expect(this.textMobileNumber).toBeVisible();
    await expect(this.textEmailAddress).toBeVisible();
    await expect(this.selectDoctor).toBeVisible();
    await expect(this.selectService).toBeVisible();
    await expect(this.selectAppointmentDate).toBeVisible();
    await expect(this.btnBookAppointment).toBeVisible();
    await expect(this.btnClose).toBeVisible();
  }


  async enterDetailsToBookAnAppointment({ patientName, mobileNumber, emailAddress, doctor, service, appointmentDate }) {
    await expect(this.modal).toBeVisible({ timeout: 7000 });
    await this.textPatientName.fill(patientName);
    await this.textMobileNumber.fill(mobileNumber);
    await this.textEmailAddress.fill(emailAddress);
    await this.selectDoctor.selectOption(doctor);
    await this.selectService.selectOption(service);
    await this.selectAppointmentDate.selectOption(appointmentDate);
  }

  async clickBookAppointmentButton() {
    await this.btnBookAppointment.click();
  }

}

export { BookingPage };
