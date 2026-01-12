import { expect } from 'playwright/test';
import EnvConfig from '../resources/ConfigEnvironment.json';

class CommonFunctions {

  constructor(page) {
    this.page = page;
    this.lnkPrices = page.locator('//a[@href="/price"]');
    this.lnkOurTeam = page.locator('//a[@href="/ourteam"]');
    this.firstNames = [
      'Kalana', 'John', 'Amaya', 'Nimal', 'Saman', 'Kasun', 'Rashmi', 'Chathura',
      'Ishara', 'Sandun', 'Tharindu', 'Dinuka', 'Shehan', 'Upeksha', 'Hiruni',
      'Chamika', 'Gayan', 'Harsha', 'Dileepa', 'Madushan', 'Sachini', 'Thilina',
      'Nadeesha', 'Supun', 'Akila'
    ];

    this.middleNames = [
      'Bimsara', 'Pradeep', 'Lakshan', 'Nuwan', 'Chamara', 'Iroshan', 'Hasitha',
      'Dilshan', 'Nadeeka', 'Anushka', 'Sanjeewa', 'Tharanga', 'Sachintha',
      'Udara', 'Harith', 'Madhawa', 'Lasith', 'Gimhani', 'Nethmi', 'Sewwandi',
      'Kavindu', 'Yasiru', 'Dinithi', 'Tharushi', 'Sahan'
    ];

    this.lastNames = [
      'Silva', 'Fernando', 'Perera', 'Gunasekara', 'Jayasinghe', 'Wijesinghe',
      'Bandara', 'Kumara', 'Dissanayake', 'Ranasinghe', 'Amarasinghe', 'Herath',
      'Edirisinghe', 'Alwis', 'Rajapaksha', 'Pathirana', 'Senanayake',
      'Abeysekara', 'Weerasinghe', 'Gamage', 'Samarakoon', 'Liyanage',
      'Peiris', 'Kapuachchige', 'Wickramasinghe'
    ];

    this.usedCombos = new Set();

  }


   generateRandomDoctorName() {
    const maxCombos =
      this.firstNames.length * this.middleNames.length * this.lastNames.length;

    // optional: reset if exhausted
    if (this.usedCombos.size >= maxCombos) {
      this.usedCombos.clear();
    }

    let firstName, middleName, lastName, comboKey;

    do {
      firstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
      middleName = this.middleNames[Math.floor(Math.random() * this.middleNames.length)];
      lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
      comboKey = `${firstName}_${middleName}_${lastName}`;
    } while (this.usedCombos.has(comboKey));

    this.usedCombos.add(comboKey);

    const doctorName = `Dr. ${firstName} ${middleName} ${lastName}`;
    console.log('Generated Doctor Name:', doctorName);
    return doctorName;
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

  async generateRegistrationNumber() {
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    const registrationNumber = `${yyyy}${mm}${dd}${hh}${min}${ss}`;

    console.log('Generated Registration Number:', registrationNumber);
    return registrationNumber;
  }



}

export { CommonFunctions };
