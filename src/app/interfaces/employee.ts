import { SafeHtml } from '@angular/platform-browser';
import { ICommonOption, ISelectOption } from '@interfaces/filter';

export interface IRequestOptions {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IEmployeesResponse extends IRequestOptions {
  employees: IEmployee[];
}

export interface IEmployee {
  id: string;
  level: string;
  isWork?: boolean;
  location: string;
  name: string;
  resourceManager: string;
  roles: string[];
  userRoles: string[];
  technology?: string;
}

export interface IEmployeesRows extends IRequestOptions {
  employees: IEmployeeRow[];
}

export interface IEmployeeCommon {
  id: number;
  externalId: string;
  userDetail: ISocialNetworks;
  userMain: IUserMain;
  userPrivate: IUserPrivate;
  userAccountSettings: IAccountSettings;
}

export interface IAccountSettings {
  hideBirthday?: boolean;
  hidePhone?: boolean;
}

export interface IEmployeeResponse extends IEmployeeCommon {
  projects: IProjectResponse[];
}

export interface IEmployeeProjectsRows extends IEmployeeCommon {
  projects: IProjectRow[];
}

export interface IEmployeeRow {
  externalId: string;
  fullNameRu: string;
  locationName: string;
  isWork?: boolean;
  roles: string[];
  level: string;
  resourceManager: ICommonOption;
  userRoles: string[];
  technology?: string;
}

export interface IEmployeeListRow extends IEmployeeRow {
  userRolesOptions: ISelectOption<string>[];
}

export interface IProjectCommon {
  employees: any[];
  id: string;
  name: string;
  teamQty: number;
}

export interface IProjectResponse extends IProjectCommon {
  projectManager: ICommonOption;
  resourceManager: ICommonOption;
  deliveryManager: ICommonOption;
}

export interface IProjectRow extends IProjectCommon {
  projectManagerName: string;
  projectManagerId: string;
  resourceManagerName: string;
  resourceManagerId: string;
  deliveryManager: ICommonOption;
}

export interface ISocialNetworks {
  id?: string;
  behance: string;
  dribbble: string;
  facebook: string;
  instagram: string;
  linkedIn: string;
  telegram?: string;
  gmail?: string;
  viber?: string;
  content?: string;
}

export interface IUserMain {
  hrManager: ITechnologyStackTags;
  level: string;
  department: string;
  resourceManager: ITechnologyStackTags;
  roles: string[];
  startDate: any;
  technologyStackTags: ITechnologyStackTags[];
  vacationDays: number;
  dayOff: number;
  type: string;
}

export interface ITechnologyStackTags {
  id: string;
  name: string;
}

export interface IUserPrivate {
  birthDate: string;
  email: string;
  fullNameEn: string;
  fullNameRu: string;
  mobilePhone: string;
  photo: string;
  skype: string;
  location: ILocation;
}

export interface ILocation {
  id: string;
  name: string;
}

export interface IEmployeeParams extends IEmployeeFilter {
  page?: string;
}

export interface IEmployeeFilter {
  surname?: string;
  project?: string;
  resourceManagers?: string;
  locations?: string;
  technologies?: string;
  roles?: string;
  userRoles?: string;
}

export interface IRequestEmployeeParams {
  page?: string;
  pageSize?: string;

  [params: string]: string | string[];
}

export interface IMappedSocialNetwork {
  name: string;
  value: string;
  icon: SafeHtml;
  url?: string;
}

export interface IPaginationConfig {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}


export interface IEmployeePhoto {
  id: string;
  name: string;
  photo: string;
}

export interface IEmployeeRoles {
  admin?: boolean;
  hr?: boolean;
  pm?: boolean;
  supervisor?: boolean;
  assessmentCoordinator?: boolean;
}

export const enum Roles {
  ADMIN = 'Admin',
  ASSESSMENT_COORDINATOR = 'AssessmentCoordinator',
  CONTENT_MANAGER = 'ContentManager',
  HR = 'HR',
  MANAGER = 'Manager',
  PM = 'PM',
  RM = 'RM',
  SUPERVISOR = 'Supervisor',
  AHR = 'AHR',
  headOfAHR = 'HeadOfAHR',
  headOfSales = 'HeadOfSales',
  adminOfActivities = 'AdminOfActivities',
  headOfExperts = 'HeadOfExperts',
}

export interface ILikes {
  count: number;
  isSent: boolean;
}

export interface ILikesComment {
  userId: string;
  name: string;
  comment: string;
  date: string;
}

export interface ITabsPermissions {
  hasReviews: boolean;
  hasObjectives: boolean;
  hasAssessments: boolean;
  hasFeedback?: boolean;
  hasOneToOne?: boolean;
  hasCoordinate?: boolean;
  hasVacationPlan?: boolean;
  hasCertificates?: boolean;
  haveAccessToProjectFeedback?: boolean;
}

export interface IDisplayedTabs {
  hasFeedback: boolean;
  hasOneToOne: boolean;
}

export interface IUserRole {
  value: string;
  text: string;
}

export interface IEmployeeTeammates {
  id: string;
  name: string;
  photo: string;
  position: string;
  disabled?: boolean;
  isEnabled: boolean;
  roles: string[];
  projectNames: string[];
}

export interface IDefaultTabPermissions {
  hasAssessments: boolean;
  hasFeedback: boolean;
  hasObjectives: boolean;
  hasReviews: boolean;
  hasOneToOne: boolean;
  hasCoordinate: boolean;
  hasVacationPlan: boolean;
}
