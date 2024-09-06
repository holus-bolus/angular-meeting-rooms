export interface IInterviewsPageInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface ISimpleEmployee {
  id: string;
  name: string;
  skype?: string;
  isWork?: boolean;
}

export interface IInterviewAssessmentResponse {
  id: string;
  technology: string;
  currentLevel: string;
  interviewDate: string;
  interviewer: ISimpleEmployee;
  matrix: IInterviewMatrix;
  isCurrent: true;
}

export interface IInterviewAssessment {
  id: string;
  technology: string;
  currentLevel: string;
  interviewer: ISimpleEmployee;
  matrix: IInterviewMatrix;
  isCurrent: true;
}

export interface IInterviewMatrix {
  link: string;
  isDone: boolean;
}

export interface IEmployeeInterviewResponse {
  salaryReviewId: string;
  employee: ISimpleEmployee;
  assessments: IInterviewAssessmentResponse[];
  comment: string;
  isCurrent: boolean;
  firstInterviewDate: string;
}

export interface IParsedInterviewPart {
  interviewsDates: string[];
  assessments: IInterviewAssessment[];
}

export interface IEmployeeInterview extends IParsedInterviewPart {
  salaryReviewId: string;
  employee: ISimpleEmployee;
  comment: string;
  isCurrent: boolean;
  firstInterviewDate: string;
}

export interface IInterviews extends IInterviewsPageInfo {
  data: IEmployeeInterview[];
}

export interface IInterviewsResponse extends IInterviewsPageInfo {
  data: IEmployeeInterviewResponse[];
}
