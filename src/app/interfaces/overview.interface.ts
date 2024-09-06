import { TableMenu } from '@andkit/components/other/table/table.config';

export interface IAttachment {
  icon: string;
  name: string;
}

export interface IOverviewShort {
  id: number;
  type: string;
  period: string;
  status: string;
  project: string;
  attachment: string;
  comment: string;
}

export interface  IEmployee {
  id: string;
  name: string;
}

export interface IOverviewShortForTable {
  id: number;
  type: string;
  date: string;
  status: string;
  project: string;
  attachment: IAttachment;
  menu: TableMenu;
  comment: string;
  wardEmployee?: IEmployee;
}
