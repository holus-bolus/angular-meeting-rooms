export interface ICoordinates {
  id: string;
  name: string;
  level?: string;
  language?: ICoordinatesLanguage;
  technology?: string;
  allocations?: ICoordinatesAllocations[];
  nextAssessmentDate?: Date;
  lastOneToOne?: ICoordinatesLastOneToOne;
  nextOneToOneInterviewDate: Date;
  resourceManager?: ICoorinatesResourseManager;
  location?: string;
}

export interface ICoordinatesLanguage {
  name: string;
  level: string;
  shortName: string;
}

export interface ICoordinatesAllocations {
  projectId: string;
  projectName: string;
  allocationType: string;
  allocationHours: number;
}

export interface ICoordinatesLastOneToOne {
  interviewDate: Date;
  riskOfLeaving: string;
}

export interface ICoorinatesResourseManager {
  id: string;
  name: string;
  isWork: boolean;
}

export interface ISuperiorRmSubordinate {
  id: string;
  name: string;
  hasWardEmployees: boolean;
}

export interface ICoordinatesDropList {
  level: boolean;
  language: boolean;
  technology: boolean;
  project: boolean;
  assessment: boolean;
  oneToOne: boolean;
  riskOfLeaving: boolean;
  rm: boolean;
  isEnabledRmColumn: boolean;
  location: boolean;
}
