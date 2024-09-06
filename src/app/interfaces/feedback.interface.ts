import { POSITION_TYPE } from '@pages/feedback/feedback-const';
import { IProject } from './userInfo.interface';

export interface IFeedbackSkill {
  skill: string;
  name: string;
  description: string;
  blockDesccription?: string;
  hasDisableCheckbox?: boolean;
  disableCheckboxText?: string;
  skillGroup: {title: string, description?: string}[];
}

export interface IFeedbackData {
  averageFeedbackScale: IAverageFeedbackScale;
  canCreateSelfFeedback?: boolean;
  nextSelfCreateAccessDate?: Date;
  employeeName: string;
  feedbacks: (IFeedback | IUniversalFeedbackData)[];
  selfFeedbackScale: IAverageFeedbackScale;
  canAskFeedback: boolean;
  canAskFeedbackExternal?: boolean;
}

export interface IAverageFeedbackScale {
  communicationSkills: number;
  overallPerformance: number;
  problemSolvingSkills: number;
  professionalSkills: number;
  qualityOfWork: number;
  reliability: number;
}

export interface IAverageUniversalFeedbackScale {
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  question6: number;
  question7?: number;
}

export interface IProjectFeedbackData extends IAverageUniversalFeedbackScale {
  id?: string;
  projectId: string;
  createDate?: string;
  textQuestion1: string;
  feedbackId?: string;
}

export interface IUniversalFeedbackData extends IAverageUniversalFeedbackScale {
  id?: string;
  customer?: IFeedbackCustomer;
  employeeId: string;
  employee?: IFeedbackEmployee;
  feedbackDate?: string;
  createDate?: string;
  positionType?: number;
  feedbackAccessRule: string;
  textQuestion1?: string;
  textQuestion2?: string;
  feedbackAverageMark?: number;
  feedbackComment?: string;
  feedbackId?: string;
  feedbackWhatToImprove?: string;
  feedbackScale?: IAverageUniversalFeedbackScale;
  projectName?: string;
  projectId?: string;
  project?: IProject;
  valuable?: boolean;
  employeePosition?: string;
  employeeTechnology?: string;
}

export interface IAverageUniversalFeedbackScale {
  question1: number;
  question2: number;
  question3: number;
  question4: number;
  question5: number;
  question6: number;
  question7?: number;
}

export interface IFeedbackPostData extends IAverageFeedbackScale {
  employeeId?: string;
  personsStrengths?: string;
  whatToImprove?: string;
  projectId?: string;
  positionType?: POSITION_TYPE;
  accessRule?: string;
  date?: Date;
  externalFeedbackRequestId?: string;
}

export interface IFeedbackValueData {
  id: string;
  value: number;
}

export interface IFeedbackOpinionPostData {
  personsStrengths: string;
  whatToImprove: string;
}

export interface IFeedback {
  employee?: IFeedbackEmployee;
  customer?: IFeedbackCustomer;
  feedbackAverageMark: number;
  feedbackComment: string;
  feedbackId: string;
  feedbackWhatToImprove?: string;
  feedbackDate: string;
  feedbackScale?: IAverageFeedbackScale;
  type?: string;
  accessRule?: string;
  isCustomer?: boolean;
  projectName?: string;
  feedbackValue?: string;
  textQuestion1?: string;
  textQuestion2?: string;
  positionType: string;
}

export interface IFeedbackEmployee {
  isWork: boolean;
  id: string;
  name: string;
  position: string;
  photoUrl: string;
}

export interface IFeedbackCustomer {
  customerName: string;
  customerPosition: string;
}

export interface IFeedbackInfo {
  employeeName: string;
  previousFeedbacksCount?: number;
  lastFeedbackDate?: Date;
  showTip?: boolean;
  selfFeedback?: boolean;
  disablePrivateSettings?: boolean;
  customerName?: string;
  projectName?: string;
}

export interface IFeedbackRequestData {
  employeeId: string;
  receiverIds: string[];
}

export interface IFeedbackRadioOptions {
  name: string;
  description?: string;
  id: string;
}

export interface IExternalFeedbackPostData {
  employeeId: string;
  projectId: string;
  customerName: string;
  customerEmail?: string;
  customerPosition: string;
}

export interface IProjectFeedbackResponse {
  page: number;
  pageSize: number;
  projectFeedbacks: IUniversalFeedbackData[];
  totalItems: number;
  totalPages: number;
}

export interface IProjectWithFeedbacks {
  id: string;
  lastFeedback?: string;
  lastFeedbackDate?: number;
  amountOfFeedback: number;
  rating: number;
  project: IProject;
  checked?: boolean;
  status?: ActiveStatus;
}

export interface IProjectWithFeedbacksFilter {
  sortByRate?: boolean;
  valuableFilter?: number;
  isGood?: boolean;
  fromDate?: string;
  toDate?: string;
  take: number;
  skip: number;
}

export interface IProjectFeedbackValueData {
  feedbackId: string;
  value: number;
}

export enum ActiveStatus {
  active = 'active',
  closed = 'closed'
}

export enum ValuableFilter {
  Valuable = 0,
  NotValueble = 1,
  DontHaveMark = 3,
}
