import { LABEL_TYPES } from '@constants/labelTypes';

export const RISK_OF_LEAVING_NONE = {
  id: '0',
  name: 'None',
  labelClass: LABEL_TYPES.LABEL_RISK_NONE
};

export const RISKS_OF_LEAVING_LOW = {
  id: '1',
  name: 'Low',
  labelClass: LABEL_TYPES.LABEL_RISK_LOW
};

export const RISK_OF_LEAVING_MID = {
  id: '2',
  name: 'Mid',
  labelClass: LABEL_TYPES.LABEL_RISK_MID
};

export const RISK_OF_LEAVING_HIGH = {
  id: '3',
  name: 'High',
  labelClass: LABEL_TYPES.LABEL_RISK_HIGH
};

export const RISK_OF_LEAVING_CRITICAL = {
  id: '4',
  name: 'Critical',
  labelClass: LABEL_TYPES.LABEL_RISK_CRITICAL
};

export const RISKS_OF_LEAVING = {
  [RISK_OF_LEAVING_NONE.name]: RISK_OF_LEAVING_NONE,
  [RISKS_OF_LEAVING_LOW.name]: RISKS_OF_LEAVING_LOW,
  [RISK_OF_LEAVING_MID.name]: RISK_OF_LEAVING_MID,
  [RISK_OF_LEAVING_HIGH.name]: RISK_OF_LEAVING_HIGH,
  [RISK_OF_LEAVING_CRITICAL.name]: RISK_OF_LEAVING_CRITICAL
};

export const ONE_TO_ONE_TYPE_NONE = {
  id: '0',
  name: '--',
};

export const ONE_TO_ONE_TYPE_PLANNED = {
  id: '1',
  name: 'Planned',
};

export const ONE_TO_ONE_TYPE_UNPLANNED = {
  id: '2',
  name: 'Unplanned',
};

export const ONE_TO_ONE_TYPE_ASSESSMENT = {
  id: '3',
  name: 'Assessment',
};

export const ONE_TO_ONE_TYPE_EXIT = {
  id: '4',
  name: 'Exit',
};

export const ONE_TO_ONE_TYPE_ADAPTATION = {
  id: '7',
  name: 'Adaptation',
};

export const ONE_TO_ONE_TYPES = {
  [ONE_TO_ONE_TYPE_NONE.name]: ONE_TO_ONE_TYPE_NONE,
  [ONE_TO_ONE_TYPE_PLANNED.name]: ONE_TO_ONE_TYPE_PLANNED,
  [ONE_TO_ONE_TYPE_UNPLANNED.name]: ONE_TO_ONE_TYPE_UNPLANNED,
  [ONE_TO_ONE_TYPE_ASSESSMENT.name]: ONE_TO_ONE_TYPE_ASSESSMENT,
  [ONE_TO_ONE_TYPE_EXIT.name]: ONE_TO_ONE_TYPE_EXIT,
  [ONE_TO_ONE_TYPE_ADAPTATION.name]: ONE_TO_ONE_TYPE_ADAPTATION,
};

export const INTERVIEWER_POSITION_DM = {
  name: 'DeliveryManager',
  label: 'DM'
};

export const INTERVIEWER_POSITION_DD = {
  name: 'DeliveryDirector',
  label: 'DD'
};

export const INTERVIEWER_POSITION_HR = {
  name: 'HrManager',
  label: 'HR'
};

export const INTERVIEWER_POSITION_RM = {
  name: 'ResourceManager',
  label: 'RM'
};

export const INTERVIEWER_POSITIONS = {
  [INTERVIEWER_POSITION_DM.name]: INTERVIEWER_POSITION_DM,
  [INTERVIEWER_POSITION_DD.name]: INTERVIEWER_POSITION_DD,
  [INTERVIEWER_POSITION_HR.name]: INTERVIEWER_POSITION_HR,
  [INTERVIEWER_POSITION_RM.name]: INTERVIEWER_POSITION_RM
};

export const ONE_TO_ONE_MODAL_WINDOW_WIDTH = '760px';
export const ONE_TO_ONE_INSTRUCTION_MODAL_WINDOW_WIDTH = '580px';
export const ONE_TO_ONE_CONFIRM_MODAL_WINDOW_WIDTH = '496px';

export const RISK_OF_LEAVING_SELECT_OPTIONS = [
  {
    id: '1',
    name: 'Low'
  },
  {
    id: '2',
    name: 'Mid',
  },
  {
    id: '3',
    name: 'High',
  },
  {
    id: '4',
    name: 'Critical',
  },
];

export const ONE_TO_ONE_SELECT_OPTIONS = [
  {
    id: '1',
    name: 'Planned',
  },
  {
    id: '2',
    name: 'Unplanned',
  },
  {
    id: '3',
    name: 'Assessment',
  },
  {
    id: '6',
    name: 'Bench',
  },
  {
    id: '7',
    name: 'Adaptation',
  },
];

export const LENGTH_OF_ONE_TO_ONE_LIST = 7;
export const MAX_COMMENT_ROWS = 5;
export const ONE_WEEK_LENGTH = 7;

export const VALIDATOR_LENGTH = {
  COMMENT_MIN_LENGTH: 1,
  COMMENT_MAX_LENGTH: 5000,
  UPDATE_COMMENT_MAX_LENGHT: 5000,
};

export const MAX_COMMENT_LENGTH = 5000;

export const ONE_TO_ONE_MODAL_TIME_PICKER = {
  top: 188,
  left: '51%',
  offTopHeight: 0
};

export enum ONE_TO_ONE_FILTER {
  RISK_OF_LEAVING = 'riskOfLeaving',
  TYPE = 'type'
}

export const RISK_OF_LEAVING_INFO = [
  'Low – no risks for the employee to leave, the employee is satisfied with the work.',
  'Mid – the employee is not satisfied with: project, salary, career, etc.',
  'High – a direct or indirect talk about leaving the company.',
  'Critical – the employee has an offer from another company and discusses leaving'
];

export const CONFIRM_MODAL_TITLES = {
  add: { title: 'Cancel adding one to one?', subtitle: 'Your one to one won’t be added' },
  edit: { title: 'Cancel editing one to one?', subtitle: 'Your changes won’t be saved' },
  addupdate: { title: 'Cancel editing one to one?', subtitle: 'Your changes won’t be saved' }
};

export const REQUIRED_FIELD = 'Required Field';
