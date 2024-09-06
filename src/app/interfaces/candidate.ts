import { CURRENCIES } from '@constants/currencies';
import { Moment } from 'moment-timezone/moment-timezone';

export interface IReviewsResponse {
  reviews: ICandidate[];
  filtersSource: ICandidatesDataSources;
  currencies?: string[];
}

export interface ICurrencyOption {
  name: CURRENCIES;
  id: string;
}

export interface ICandidate {
  id: string;
  reviewDate: string;
  isUnscheduled: boolean;
  reviewDateFrom1C: string;
  technologies?: string[];
  interviewers?: string[];
  employee: IEmployeeCandidate;
}

export interface IEnglishInterviewResult {
  englishLevel?: string;
  englishLevelComment?: string;
}

export interface ISalaryPayloadComment {
  salaryComment: string;
}

export interface ISalaryPayload {
  salaryRequirement: string;
  salaryCurrency: string;
}

export interface ICandidatesDataSources {
  technologies: string[];
  resourceManagers: string[];
  reviewDates?: string[];
  interviewers?: string[];
}

export interface ICandidatesFilters {
  resourceManager?: string;
  technology?: string;
  interviewer?: string;
  date?: string;
}

export interface ILanguageAssessment {
  id: string;
  languageId: string;
  language: string;
  level: string;
  comment: string;
}

export interface ISalaryReview {
  id: string;
  isUnscheduled: boolean;
  employee: IEmployeeCandidate;
  reviewDate: string;
  reviewDateERP: string;
  coordinatorComment: string;
  languageAssessments: ILanguageAssessment[];
  englishInterviewResult: string;
  englishInterviewComment: string;
  salaryRequirement: string;
  salaryComment: string;
  salaryCurrency: string;
  managerComment: string;
  assessments: IAssessment[];
  confirmationManager: IConfirmationManager;
}

export interface IEmployeesReviewResponse {
  isCurrent: boolean;
  isCanceled: boolean;
  reviewDate: string;
  position: string;
  assessments?: IEmployeesAssessmentResponse[];
}

export interface IEmployeesReview extends IParsedPart {
  isCurrent: boolean;
  isCanceled: boolean;
  reviewDate: string;
  position: string;
}

export interface IEmployeeAssessment {
  assessmentTechnology: string;
  matrix: IMatrix;
}

export interface IParsedPart {
  interviewsDatesTimes: string[];
  interviewers: IInterviewerPreview[];
  assessments?: IEmployeeAssessment[];
}

export interface IConfirmationManager {
  id: string;
  name: string;
  skype?: string;
  isWork?: boolean;
}

export interface IEmployeeCandidate {
  id: string;
  location?: string;
  name: string;
  position: string;
  isWork?: boolean;
  level: string;
  skype: string;
  resourceManager: IConfirmationManager;
  projects?: string[];
  interviewer: string;
  positionLevel?: string;
}

export interface IAssessment {
  id: string;
  assessmentStatus: string;
  technology: string;
  currentLevel: string;
  isInProcessing: boolean;
  selfMatrix: IMatrix;
  interviewerMatrix: IMatrix;
  mergeMatrix: IMatrix;
  interviewDateTime: string | Moment;
  interviewer: IInterviewerPreview;
  interviewerFeedback: string;
  projects?: string[];
  resourceManager?: IConfirmationManager;
  isInterviewerMatrixSend: boolean;
}

export interface IEmployeesAssessmentResponse {
  assessmentTechnology: string;
  matrix: IMatrix;
  assessmentDate: string;
  interviewer: IInterviewerPreview;
}

export interface IMatrix {
  link: string;
  isDone: boolean;
}

export interface IInterviewerPreview  {
  id: string;
  name: string;
  isWork?: boolean;
  skype?: string;
  skypeLogin?: string;
  surname?: string;
}

export interface IPlannedAssessment {
  reviewDate: string;
  interviewDate: string;
  interviewerId: string;
}

export interface IReviewsHistoryResponse {
  total: number;
  nextReviewDate: string;
  salaryReviews: IEmployeesReviewResponse[];
}

export interface IReviewsHistory {
  total: number;
  nextReviewDate: string;
  salaryReviews: IEmployeesReview[];
}
