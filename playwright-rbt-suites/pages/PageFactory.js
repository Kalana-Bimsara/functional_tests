import {HomePage} from './page-objects/HomePage.js';
import {LoginPage} from './page-objects/LoginPage.js';
import {AdminDashboardPage} from './page-objects/AdminDashboardPage.js';
import {OurTeamPage} from './page-objects/OurTeamPage.js';
import {UpperPannelPage} from './page-objects/UpperPannelPage.js';
import { BookingPage } from './page-objects/BookingPage.js';    
import { CommonFunctions } from '../resources/CommonFunctions.js';


class PageFactory {
  
    static getHomePage(page) {
        return new HomePage(page);
    }

    static getLoginPage(page) {
        return new LoginPage(page);
    }

    static getAdminDashboardPage(page) {
        return new AdminDashboardPage(page);
    }

    static getOurTeamPage(page) {
        return new OurTeamPage(page);
    }

    static getUpperPannelPage(page) {
        return new UpperPannelPage(page);
    }

    static getBookingPage(page) {
        return new BookingPage(page);
    }
    static getCommonFunctions(page) {
        return new CommonFunctions(page);
    }
  } 

  export { PageFactory };