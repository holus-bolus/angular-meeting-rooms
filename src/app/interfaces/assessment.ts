import { ICandidate, IPlannedAssessment, ISalaryReview, IReviewsResponse } from './candidate';
import { AssessmentTabs } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { Moment } from 'moment-timezone/moment-timezone';

export interface IPlannedWithoutInterview {
  candidateId: string;
  reviewDate: string;
  name: string;
}

export interface IInterviewValues {
  reviewDate: Moment;
  interviewer: string;
  interviewDate: Moment;
  interviewTime: string;
}

export interface IPlanned {
  assessmentId: string;
  plannedAssessment: IPlannedAssessment;
  planningAssessmentsLength: number;
  name: string;
  candidateId: string;
}

export interface IDateErrors {
  isExpiredDate: boolean;
  isRequiredError: boolean;
  isReviewEarlierInterview: boolean;
}

export interface IAllCandidates extends IReviewsResponse {
  sidebarCandidates: ICandidate[];
}

export interface IToastNotification {
  message: string;
  name: string;
}

export interface ICandidateDetails {
  allCandidates: IAllCandidates;
  review: ISalaryReview;
}

export interface ITab {
  title: string;
  active: boolean;
  key: string;
}

export interface ICancelEvent {
  cancelReviewComment: string;
  newReviewDate: string;
}
