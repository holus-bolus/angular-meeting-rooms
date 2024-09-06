import { ICommonOption } from '@interfaces/filter';

export interface IOneToOne {
  id: string;
  interviewDate: Date;
  nextInterviewDate: Date;
  interviewer: IOneToOneInterviewer;
  riskOfLeaving: string;
  riskFiringReason?: ICommonOption;
  type: string;
  typeOfNext?: string;
  comment: string;
  canEdit: boolean;
  isExpired?: boolean;
  updates: IOneToOneUpdate[];
  modifyDate: Date;
  isLastOneToOne: boolean;
}

export interface IOneToOneUpdate {
  id: number;
  updateComment: string;
  date: Date;
}

export interface IOneToOneInterviewer {
  id: string;
  position: string;
  name: string;
  isWork: boolean;
}

export interface IOneToOneData {
  oneToOne: IOneToOne;
  oneToOneActionData: { action: { name: string }; id: string };
}

export interface IOneToOneOption {
  id: number;
  name: string;
}

export interface IOneToOnePostData {
  employeeId: string;
  date: string;
  oneToOneType: string;
  nextInterviewType?: string;
  riskOfLeaving: string;
  comment: string;
  nextInterviewDate: string;
  riskFiringReasonId?: string;
  update: IOneToOneUpdatePostData;
  updates: IOneToOneUpdatePostData[];
  updatesForDelete: number[];
}

export interface IOneToOneUpdatePostData {
  oneToOneId: string;
  updateComment: string;
}
