export interface IActivities {
  activityName: string;
  id: string;
  isActive?: boolean;
}

export interface IActivity {
  employeeId: string;
  expertActivityId: string;
  dueDate: string;
  activityName?: string;
  isActive?: boolean;
}

export interface IActivitiesResponse {
  page: number;
  pageSize: number;
  expertActivities: IActivityDetails[];
  totalItems: number;
  totalPages: number;
}

export interface IActivityDetails {
  canEdit: boolean;
  employeeId: string;
  englishLevel: string;
  expertActivities: any;
  location: string;
  nameEn: string;
  nameRu: string;
  technologies: ITechnologyDetails[];
}

export interface ITechnologyDetails {
  name: string;
  level: string;
}

export interface IActivitiesParams {
  [params: string]: string | string[];
}

export interface IActivitiesStorage {
  surname: string;
  expertActivities: string;
  technologies: string[];
  locations: string[];
  technologyLevels: string[];
  englishLevels: string[];
}

