export interface ICertificateData {
  canEdit: boolean;
  canPrint: boolean;
  canSave: boolean;
  certificates: ICertificate[][];
  skillLevels?: string[];
}

export interface ICertificate {
  id: string;
  serialNumber?: string;
  employeeName: string;
  employeeId?: string;
  currentReviewDate: string;
  createDate?: string;
  nextReviewDate?: string;
  mainTechnology: string;
  beforeTechnologyLevel?: string;
  afterTechnologyLevel: string;
  englishLevel: string;
  objectives?: ICertificateObjective[];
  projects?: ICertificateProject[];
  isHover?: boolean;
}

export interface ICertificateObjective {
  id: string;
  name: string;
}

export interface ICertificateProject {
  id: string;
  name: string;
}
