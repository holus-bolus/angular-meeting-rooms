import { POSITION_TYPE } from './feedback-const';

export interface IPositionType {
  positionType: string;
  commonProjects: ICommonProject[];
}

interface ICommonProject {
  id: string;
  name: string;
}

export interface IFeedbackType {
  id: POSITION_TYPE;
  name: string;
  value: string;
  isSecret?: boolean;
  description: string;
}

export interface Ifeedback {
  accessRule: string;
  employeeId: string;
  id: string;
  interviewerId: string;
  textQuestion1: string;
  textQuestion2: string;
  type?: string;
  positionType?: string;
}