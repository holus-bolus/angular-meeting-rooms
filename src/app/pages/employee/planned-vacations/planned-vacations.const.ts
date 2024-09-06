import { LABEL_TYPES } from '@constants/labelTypes';

export const PLANNED_VACATION_STATUS_CREATED = {
  id: 'Created',
  name: 'Created',
  labelClass: LABEL_TYPES.LABEL_DEFAULT
};

export const PLANNED_VACATION_STATUS_AHR = {
  id: 'PendingForAHR',
  name: 'Pending for AHR',
  labelClass: LABEL_TYPES.LABEL_YELLOW
};

export const PLANNED_VACATION_STATUS_APPROVAL = {
  id: 'PendingForApproval',
  name: 'Pending for approval',
  labelClass: LABEL_TYPES.LABEL_BLUE
};

export const PLANNED_VACATION_STATUS_APPROVED = {
  id: 'Approved',
  name: 'Approved',
  labelClass: LABEL_TYPES.LABEL_GREEN
};

export const PLANNED_VACATION_STATUS_DECLINED = {
  id: 'Declined',
  name: 'Declined',
  labelClass: LABEL_TYPES.LABEL_RED
};

export const PLANNED_VACATION_STATUS_COLLECTED = {
  id: 'Collected',
  name: 'Collected',
  labelClass: LABEL_TYPES.LABEL_GREEN
};

export const PLANNED_VACATION_STATUS_NOT_COLLECTED = {
  id: 'NotCollected',
  name: 'Not collected',
  labelClass: LABEL_TYPES.LABEL_RED
};

export const PLANNED_VACATION_STATUS_NONE = {
  id: 'None',
  name: 'None',
};

export const PLANNED_VACATION_STATUSES = {
  [PLANNED_VACATION_STATUS_CREATED.id]: PLANNED_VACATION_STATUS_CREATED,
  [PLANNED_VACATION_STATUS_AHR.id]: PLANNED_VACATION_STATUS_AHR,
  [PLANNED_VACATION_STATUS_APPROVAL.id]: PLANNED_VACATION_STATUS_APPROVAL,
  [PLANNED_VACATION_STATUS_APPROVED.id]: PLANNED_VACATION_STATUS_APPROVED,
  [PLANNED_VACATION_STATUS_DECLINED.id]: PLANNED_VACATION_STATUS_DECLINED,
  [PLANNED_VACATION_STATUS_COLLECTED.id]: PLANNED_VACATION_STATUS_COLLECTED,
  [PLANNED_VACATION_STATUS_NOT_COLLECTED.id]: PLANNED_VACATION_STATUS_NOT_COLLECTED,
  [PLANNED_VACATION_STATUS_NONE.id]: PLANNED_VACATION_STATUS_NONE
};

export const CONFIRM_MODAL_DATA = {
  add: {
    titleText: 'Cancel adding vacation plan?',
    subtitleText: 'Your vacation plan won’t be added',
    cancelBtnText: 'No',
    confirmBtnText: 'Yes'
  },
  edit: {
    titleText: 'Cancel editing vacation plan?',
    subtitleText: 'Your changes won’t be saved',
    cancelBtnText: 'No',
    confirmBtnText: 'Yes'
  }
};

export const PLANNED_VACATIONS_MODAL_WINDOW_WIDTH = '450px';
export const PLANNED_VACATIONS_INSTRUCTION_MODAL_WINDOW_WIDTH = '721px';
export const CONFIRM_MODAL_WIDTH = '496px';
export const PLANNED_VACATIONS_DECLINE_MODAL_WINDOW_WIDTH = '480px';

export enum ApproverPlannedVacationsTitleList {
  NAME = 'NAME & SURNAME',
  LOCATION = 'LOCATION',
  COMPANY_NAME = 'COMPANY NAME',
  POSITION = 'POSITION',
  WORKING_YEAR = 'WORKING YEAR',
  PART = 'PART',
  APPROVERS = 'APPROVERS',
  STATUS = 'STATUS',
}

export enum EmployeePlannedVacationsTitleList {
  PART = 'PART',
  STATUS = 'STATUS',
  AHR = 'AHR',
  APPROVERS = 'APPROVERS',
  COMMENT = 'COMMENT',
}

export enum EmployeeVacationsTitleList {
  YEAR = 'YEAR №',
  WORKING_YEAR = 'WORKING YEAR',
  ABSENCE_PERIODS = 'ABSENCE PERIODS',
  ANNUAL_NORM = 'ANNUAL NORM',
  ACCRUED_DAYS = 'ACCRUED DAYS',
  USED_DAYS = 'USED DAYS',
  REMAINING_DAYS = 'REMAINING DAYS',
  COMPENSATION_DAYS = 'COMPENSATION DAYS',
  REASON = 'REASON'
}

export const VACATION_COMMENT_LENGTH = {
  min: 1,
  max: 250
};

export const PAGINATOR_SETTINGS = {
  page: 1,
  size: 10,
  sizeOptions: [5, 10, 15]
};

export const PLANNED_VACATIONS_COLUMNS_LIST = {
  pmColumnsList: [
    'name',
    'position',
    'location',
    'workingYear',
    'part',
    'status',
    'actions'
  ],
  rAhrColumnsList: [
    'name',
    'companyName',
    'workingYear',
    'part',
    'approvers',
    'status',
    'actions'
  ],
  bAhrColumnsList: [
    'name',
    'location',
    'workingYear',
    'part',
    'approvers',
    'status',
    'actions'
  ]
};

export const PLANNED_VACATION_STATUSES_OPTIONS = [
  {
    name: PLANNED_VACATION_STATUS_CREATED.name,
    id: PLANNED_VACATION_STATUS_CREATED.id
  },
  {
    name: PLANNED_VACATION_STATUS_AHR.name,
    id: PLANNED_VACATION_STATUS_AHR.id
  },
  {
    name: PLANNED_VACATION_STATUS_APPROVAL.name,
    id: PLANNED_VACATION_STATUS_APPROVAL.id
  },
  {
    name: PLANNED_VACATION_STATUS_DECLINED.name,
    id: PLANNED_VACATION_STATUS_DECLINED.id
  },
  {
    name: PLANNED_VACATION_STATUS_APPROVED.name,
    id: PLANNED_VACATION_STATUS_APPROVED.id
  },
  {
    name: PLANNED_VACATION_STATUS_COLLECTED.name,
    id: PLANNED_VACATION_STATUS_COLLECTED.id
  },
  {
    name: PLANNED_VACATION_STATUS_NOT_COLLECTED.name,
    id: PLANNED_VACATION_STATUS_NOT_COLLECTED.id
  },
  {
    name: 'None',
    id: 'None'
  }
];

export const VACATIONS_TEXT = {
  canCreateHeader: 'Vacation',
  canNotCreateHeader: 'Vacation plan of',
  addHeader: 'Add your vacation periods',
  editHeder: 'Your vacation periods were added',
};

export const CONFIRMATION_MODAL_DATA = {
  titleText: 'Are you sure you want to leave this page?',
  subtitleText: 'Your vacation periods won’t be saved',
  cancelBtnText: 'No',
  confirmBtnText: 'Yes'
};
