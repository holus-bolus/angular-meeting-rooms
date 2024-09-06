import { ICommonOption, IOption } from '@interfaces/filter';

export interface IPlannedVacationsInfo {
  hasMyVacations: boolean;
  hasMyVacationsAccess: boolean;
  hasVacationsToApprove: boolean;
  hasOutOfPlan?: boolean;
  workingYear: IWorkingYear;
  projectsVacationsRequests: IProjectVacationsRequest[];
}

export interface IWorkingYear {
  dateFrom: Date;
  dateTo: Date;
}

export interface IProjectVacationsRequest {
  id: string;
  name: string;
  data?: IApproverVacationsPlan;
}

export interface IVacationApprovers {
  approvers: IVacationApprover[];
  tip?: string;
}

export interface IVacationApprover {
  id: string;
  name: string;
  position?: string;
  isWork?: boolean;
}

export interface IVacationAutocompleteData {
  availableMonths: string[];
  plannedVacationsApprovers: IVacationApprovers;
}

export interface IEmployeeVacationPlan {
  id: string;
  workingYear: IWorkingYear;
  month: string;
  status: string;
  ahr: IAhr;
  approvers: IVacationApprover[];
  comment: string;
  canEdit: boolean;
}

export interface IAhr {
  id: string;
  name: string;
  isWork: boolean;
}

export interface IPlannedVacationsPostData {
  part1: string;
  part2: string;
  approvers: string[];
}

export interface IUpdateVacationPlanPostData {
  month: string;
  approvers?: string[];
}

export interface IApproverVacationsPlan {
  data: IPlannedVacation[];
  pageInfo: IPlannedVacationsPageInfo;
}

export interface IPlannedVacationsPageInfo {
  firstItemOnPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  lastItemOnPage: number;
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  totalItemCount: number;
}

export interface IPaginatorSettings {
  pageIndex: number;
  pageSize: number;
  status?: ICommonOption | IOption;
}

export interface IPlannedVacation {
  id: string;
  employee: IPlannedVacationEmployee;
  companyName?: string;
  workingYear: IWorkingYear;
  month: string;
  status: string;
  ahr: IAhr;
  approvers: IVacationApprover[];
  comment?: string;
  canApprove: boolean;
  canConfirm: boolean;
  vacationSummaries: IVacationSummaries[];
}

export interface IPlannedVacationEmployee extends IVacationApprover {
  location: string;
}

export interface IPlannedVacationDecline {
  message: string;
  plannedVacationId: string;
}

export interface IPlannedVacationsPostRequest {
  employeeId: string;
  projectId?: string;
  outOfPlan?: string;
  status?: string;
  page: string;
  pageSize: string;
}

export interface IVacationSummaries {
  year: number;
  workingYearFrom: Date;
  workingYearTo: Date;
  absencePeriodFrom: Date;
  absencePeriodTo: Date;
  annualNorm: number;
  accruedDays: number;
  usedDays: number;
  remainingDays: number;
  compensationDays: number;
  reason: string;
}
