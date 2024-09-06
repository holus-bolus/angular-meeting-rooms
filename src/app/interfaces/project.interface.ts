import { IEmployee, IEmployeeRow, ITechnologyStackTags } from '@interfaces/employee';

export interface IProjectDetails {
  id: string;
  name: string;
  teamQty: number;
  projectManager: ITechnologyStackTags;
  resourceManager: ITechnologyStackTags;
}

export interface IProjectResponseDetails extends IProjectDetails {
  employees: IEmployee[];
}

export interface IProjectRowDetails extends IProjectDetails {
  employees: IEmployeeRow[];
}

export interface IProjectApprovers {
  default: string;
  approvers: ITechnologyStackTags[];
}
