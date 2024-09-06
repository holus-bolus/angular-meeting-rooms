import { IActivities } from '@interfaces/expert-activities.interface';
import { ILocation } from '@interfaces/location.interface';

export interface IOffice {
  id: string;
  name: string;
}

export interface ITechnologies {
  id: string;
  name: string;
  level?: string;
  main: boolean;
  linkMatrix?: string;
}

export interface IManager {
  id: string;
  name: string;
  isWork: boolean;
}

export interface ILanguages {
  id: string;
  name: string;
  level: string;
}

export interface IExtraMile {
  isExtraMile: boolean;
  comment: string;
  canEdit: boolean;
}

export interface IVocations {
  from: string;
  to: string;
  typeOfVacation: string;
}

export interface IAllocation {
  type: string;
  hours: number;
  rate: boolean;
  role?: string;
  startDate: string;
  stopDate?: string;
  project?: IProject;
}

export interface IProject {
  id: string;
  name: string;
  teamQty: number;
  projectManager?: IManager;
  resourceManager?: IManager;
  deliveryManager?: IManager;
  pc?: IManager;
  sdm?: IManager;
  dd?: IManager;
  adm?: IManager;
  employees: IEmployee[];
  isActive: boolean;
  startDate?: string;
  stopDate?: string;
}

export interface IEmployee {
  id: string;
  externalId?: string;
  name?: string;
  fullNameRu?: string;
  isWork?: boolean;
  level: string;
  resourceManager?: IManager;
  roles: string[];
  location: IUserInfo;
  technology?: string;
  photo?: string;
}

export interface IVacation {
  fromDate: string;
  toDate: string;
}

export interface IUserInfo {
  externalId: string;
  fullNameRu: string;
  fullNameEn?: string;
  location: IOffice;
  cityCountryLocation?: ILocation;
  birthDate?: string;
  canEditExpertActivities: boolean;
  emailCorp: string;
  email: string;
  expertActivities: IActivities[];
  skype: string;
  mobilePhone?: string;
  isWork: boolean;
  nextAssessmentDate?: string;
  photo?: string;
  roles?: IUserRole[];
  level: string;
  startDate: string;
  vacations: IVocations[];
  dayOff: string[];
  position: string;
  department: string;
  technologies?: ITechnologies[];
  resourceManagerHierarchy: IManager[];
  hrManager: IManager;
  isHideBirthday: boolean;
  isHidePhone: boolean;
  languages: ILanguages[];
  extraMile?: IExtraMile;
  allocationsCurrent: IAllocation[];
  allocationsPrevious: IAllocation[];
  riskOfLeaving?: string;
  vacation?: IVacation;
}

export interface IUserRole {
  id: string;
  name: string;
}
