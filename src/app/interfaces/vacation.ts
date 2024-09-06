import { ICommonOption } from '@interfaces/filter';

export interface IVacationInfo {
  availableMonths?: ICommonOption[];
  canCreate: boolean;
  vacation?: IVacationData;
  workingYear: string;
}

export interface IVacationData {
  employeeId: string;
  firstMonth: ICommonOption;
  secondMonth: ICommonOption;
}
