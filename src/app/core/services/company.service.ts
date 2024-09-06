import { Injectable } from '@angular/core';
import { COMPANY_NAME, COMPANY_URL, COMPANY_FULLNAME,
  COPMANY_LOGO, COPMANY_LOGO_TEXT, COMPANY_ERROR_BACKGROUND, COPMANY_LOGO_HEADER,
  SHOW_COMPANY_MERCH, SHOW_VACATION, SHOW_HEADER_BACKGROUND_IMAGE, MAIN_LANGUAGE,
  PRIVACY_POLICY, SocialsNetworksUrls, CompanyResourcesUrls, HEADQUARTER_ADRESS,
  JIRA_LINK_PATTERN, COMPANY_CEO_SIGN, COMPANY_CEO_NAME, VACATION_DEADLINE_DATE,
} from '../../../../appConfigs/config';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  public companyName: string;
  public companyUrl: string;
  public companyFullName: string;
  public companyLogo: string;
  public companyLogoText: string | null;
  public companyHeaderLogo: string | null;
  public companyErrorBackground: boolean;
  public companyCeoSign: string;
  public companyCeoName: string;
  public showMerch = true;
  public showVacation = true;
  public showHeaderBackgroundImabe = true;
  public mainLanguage: 'En' | 'Ru';
  public privacyPolicy = '#';
  public jiraLinkPattern: RegExp;
  public headquarterAdress: string;
  public vacationDeadlineDate: string;
  public socialsNetworksUrls: {
    Facebook: string,
    LinkedIn: string,
    Telegram: string,
    WhatsApp: string,
    Skype: string,
  };
  public companyResourcesUrls: {
    Support: string,
    CRM: string,
    Audit: string,
    Jira: string,
    Wiki: string,
    OverWiki: string,
    PlannedVacationsWiki: string,
    JiraSupport: string,
    TeamsSupport: string,
    Functionality: string,
    Vacation: string,
  };

  constructor () {
    this.companyName = COMPANY_NAME;
    this.companyUrl = COMPANY_URL;
    this.companyFullName = COMPANY_FULLNAME;
    this.companyLogo = COPMANY_LOGO;
    this.companyLogoText = COPMANY_LOGO_TEXT;
    this.companyHeaderLogo = COPMANY_LOGO_HEADER;
    this.companyErrorBackground = COMPANY_ERROR_BACKGROUND;
    this.companyCeoSign = COMPANY_CEO_SIGN;
    this.companyCeoName = COMPANY_CEO_NAME;
    this.showMerch = SHOW_COMPANY_MERCH;
    this.showVacation = SHOW_VACATION;
    this.showHeaderBackgroundImabe = SHOW_HEADER_BACKGROUND_IMAGE;
    this.mainLanguage = MAIN_LANGUAGE;
    this.privacyPolicy = PRIVACY_POLICY;
    this.socialsNetworksUrls = SocialsNetworksUrls;
    this.companyResourcesUrls = CompanyResourcesUrls;
    this.jiraLinkPattern = JIRA_LINK_PATTERN;
    this.headquarterAdress = HEADQUARTER_ADRESS;
    this.vacationDeadlineDate = VACATION_DEADLINE_DATE;
  }
}
