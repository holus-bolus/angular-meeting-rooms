import logoSvg from '!!raw-loader!@assets/images/andersen-logo-small.svg';
import logoTextSvg from '!!raw-loader!@assets/images/andersen-title.svg';
import signSvg from '!!raw-loader!@assets/images/andersen-ceo-sign.svg';

export const TEAM_API = 'https://team.andersenlab.com/api';
export const PORTAL_API = 'https://portal.andersenlab.com/api';
export const ASSESSMENT_API = 'https://assessment.andersenlab.com/api';
export const GA_TRACKING_ID = 'UA-154776170-1';
export const COMPANY_NAME = 'Andersen';
export const COMPANY_FULLNAME = 'Andersenlab';
export const COMPANY_URL = 'andersenlab.com';
export const COPMANY_LOGO_TEXT = logoTextSvg;
export const COPMANY_LOGO = logoSvg;
export const COPMANY_LOGO_HEADER = null;
export const COMPANY_ERROR_BACKGROUND = true;
export const COMPANY_CEO_SIGN = signSvg;
export const COMPANY_CEO_NAME = 'Aleksander Khomich';
export const SHOW_COMPANY_MERCH = false;
export const SHOW_VACATION = true;
export const VACATION_DEADLINE_DATE = '12.12.2021 23.59 (GMT + 3)';
export const SHOW_HEADER_BACKGROUND_IMAGE = true;
export const COMPANY_FAVICON = 'favicon.ico';
export const JIRA_LINK_PATTERN = /^https:\/\/jira\.andersenlab\.com\/browse\/[A-Z]{2,}-\d+$/gm;
export const MAIN_LANGUAGE = 'En';
export const PRIVACY_POLICY = 'https://www.andersenlab.com/privacy-policy';
export const HEADQUARTER_ADRESS = 'Rondo ONZ 1, 00-124, Warsaw, Poland';
export enum SocialsNetworksUrls {
    Facebook = 'https://www.facebook.com/AndersenSoftwareDev',
    LinkedIn = 'https://www.linkedin.com/company/andersen-lab',
    Telegram = 'https://t.me/andersenlab',
    WhatsApp = 'https://chat.whatsapp.com/HEVIsiSlYBmG34VtaPcgmu',
    Skype = 'https://join.skype.com/aM8R4P4dNJdy'
}
export enum CompanyResourcesUrls {
    Support = 'https://jsupport.andersenlab.com/servicedesk/customer/portals',
    CRM = 'https://crm.andersenlab.com/login',
    Audit = 'https://projects.andersenlab.com/',
    Jira = 'https://jira.andersenlab.com/secure/Dashboard.jspa',
    Wiki = 'https://wiki.andersenlab.com/welcome.action',
    OverWiki = 'https://wiki.andersenlab.com/pages/viewpage.action?pageId=143184745',
    PlannedVacationsWiki = 'https://wiki.andersenlab.com/pages/viewpage.action?pageId=153065287',
    JiraSupport = 'https://jsupport.andersenlab.com/servicedesk/customer/portal/3/create/91',
    TeamsSupport = 'https://teams.microsoft.com/l/channel/19%3a940b831dad914d13ad68ed90bc3879dd%40thread.tacv2/Portal?groupId=fa5e430e-5b81-46b6-999b-e7e1eb6ea2d8&tenantId=cc2b507d-b75c-4afd-92d9-8c8a85c76664 ',
    Functionality = 'https://jsupport.andersenlab.com/servicedesk/customer/portal/3/create/289',
    Vacation = 'https://wiki.andersenlab.com/pages/viewpage.action?pageId=153065287',
}
