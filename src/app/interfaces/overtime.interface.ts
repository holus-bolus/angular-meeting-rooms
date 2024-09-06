import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICommonOption } from './filter';
import { IProjectApprovers } from './project.interface';

export type overtimeType = 'techhelp' | 'assessment' | 'systemAdministratorBonus';

export interface IOvertimeCommon {
  id: string;
  employee: ICommonOption;
  status: string;
  project: ICommonOption;
  approvers: IProjectApprovers;
  period: string;
  ratio: number;
  hours: number;
  sum: number;
  currency: string;
  wardEmployee: IWardEmployee;
  comment: string;
  jiraLink?: string;
  position?: ICommonOption;
  level?: string;
  additionalApprover?: ICommonOption;
  location?: ICommonOption;
}

export interface IWardEmployee {
  id: string;
  name: string;
  position: ICommonOption;
  level: string;
}

export interface IOvertimePopups {
  modals: IOvertimeModals;
  notification: boolean;
}

export interface IOvertimeModals {
  add: boolean;
  view: boolean;
  edit: boolean;
  confirmation: boolean;
}

export interface IOvertimeNotifications {
  add: string;
  edit: string;
  delete: string;
}

export interface IOvertimeResponse extends IOvertimeCommon {
  overType: IOvertimeConfigurationResponse;
  attachments: IAttachment[];
}

export interface IOvertime extends IOvertimeCommon {
  overType: IOvertimeConfiguration;
  attachments: IAttachment[];
  currencyRestrictions?: IOvertimeCurrency[];
  locationSelectRequired?: boolean;
}

export interface IOvertimeForEditing {
  id: string;
  configuration: IOvertimeConfiguration;
}

export interface IAttachment {
  link?: string;
  name: string;
  id?: string;
  isRemoved?: boolean;
  file?: File;
}

export interface IOvertimePayload {
  employeeId: string;
  overTypeId: string;
  projectId: string;
  additionalApproverId?: string;
  ratio?: number;
  hours?: number;
  sum?: number;
  currency?: string;
  wardEmployeeId?: string;
  position?: string;
  level?: string;
  comment?: string;
  attachments?: IAttachment[];
  removeAttachment?: boolean;
  deleteAttachments?: string[];
  LocationId?: string;
}

export interface IOvertimeCurrency {
  currency?: string;
  description?: string;
  max?: number;
  compensationPercentage?: number;
}

export interface IOvertimeConfigurationResponse {
  id: string;
  name: string;
  projectsOther: boolean;
  additionalApproverRequired: boolean;
  ratioRequired: boolean;
  ratioDefault: number;
  hoursRequired: boolean;
  currencyRequired: boolean;
  sumRequired: boolean;
  wardEmployeeRequired: boolean;
  positionRequired: boolean;
  levelRequired: boolean;
  commentRequired: boolean;
  projectAndersen?: boolean;
  hintLink?: string;
  defaultCurrency?: string;
  currencyRestrictions: IOvertimeCurrency[];
  locationSelectRequired: boolean;
  location?: ICommonOption;
  jiraLink?: boolean;
  subtypes?: any;
  description?: string;
}

export interface ICurrencies {
  name: string;
}

export interface IOvertimeValues {
  ratio: number;
  overType: ICommonOption;
  project?: ICommonOption;
  additionalApprover?: ICommonOption;
  hours?: number;
  sum?: number;
  currency?: string;
  wardEmployee?: ICommonOption;
  position?: ICommonOption;
  level?: ICommonOption;
  comment?: string;
  attachment?: string;
  id?: string;
}

export interface IOvertimeConfiguration {
  values: {
    ratio: number;
    overType: ICommonOption;
    project?: ICommonOption;
    additionalApprover?: ICommonOption;
    hours?: number;
    sum?: number;
    currency?: string;
    wardEmployee?: ICommonOption;
    position?: ICommonOption;
    level?: ICommonOption;
    comment?: string;
    attachments?: IAttachment[];
    id?: string;
    projectAndersen?: boolean;
    projectsOther?: boolean;
    hintLink?: string;
    jiraLink?: string;
  };
  required: {
    overTypeId: boolean;
    projectId: boolean;
    additionalApproverId: boolean;
    ratio: boolean;
    hours: boolean;
    sum: boolean;
    currency: boolean;
    wardEmployeeId: boolean;
    position: boolean;
    level: boolean;
    comment?: boolean;
    jiraLink?: boolean;
    attachment: boolean;
    projectAndersen?: boolean;
    projectsOther?: boolean;
    hintLink?: string;
    additionalApproverRequired?: boolean;
    currencyRestrictions: IOvertimeCurrency[];
    locationSelectRequired: boolean;
    location?: ICommonOption;
  };
}

export interface IOvertimeControls {
  [key: string]: FormControl | AbstractControl;

  projectId: FormControl | AbstractControl;
  additionalApproverId: FormControl | AbstractControl;
  ratio: FormControl | AbstractControl;
  hours: FormControl | AbstractControl;
  sum: FormControl | AbstractControl;
  currency: FormControl | AbstractControl;
  wardEmployeeId: FormControl | AbstractControl;
  position: FormControl | AbstractControl;
  level: FormControl | AbstractControl;
  comment: FormControl | AbstractControl;
  attachments: FormControl | AbstractControl;
  location: FormControl | AbstractControl;
  jiraLink: FormControl | AbstractControl;
}

export interface IOvertimeFormErrors<T> {
  type$: Observable<T>;
  project$: Observable<T>;
  approvers$: Observable<T>;
  ratio$: Observable<T>;
  hours$: Observable<T>;
  sum$: Observable<T>;
  wardEmployee$: Observable<T>;
  position$: Observable<T>;
  level$: Observable<T>;
  comment$: Observable<T>;
  attachment$: Observable<T>;
  currencyControl$: Observable<T>;
  jiraLink$: Observable<T>;
}

// export interface IOvertimeOptions {
//   project$: Observable<ICommonOption[]>;
//   approvers$: Observable<ICommonOption[]>;
//   employee$: Observable<ICommonOption[]>;
//   technology$: Observable<ICommonOption[]>;
//   level$: Observable<ICommonOption[]>;
// }
