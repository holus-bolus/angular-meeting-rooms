import { IOvertimeNotifications } from '@interfaces/overtime.interface';

export const TABLE_HEAD = ['type', 'project', 'date', 'sum/hours', 'comment', 'status', 'menu'];

export const CONFIRMATION_MODAL_MESSAGE = {
  DELETE: 'Are you sure you want to delete an overtime?',
  CLOSE: 'Are you sure you want to close this tab?',
  CANCEL: 'Are you sure you want to cancel editing?',
  OVERTIME_ADD_CANCEL: 'Close this tab?',
  OVERTIME_ADD_CANCEL_SUBTEXT: 'Your overtime won\'t be added',
  OVERTIME_EDIT_CANCEL: 'Cancel editing this over?',
  OVERTIME_EDIT_CANCEL_SUBTEXT: 'Your changes won\'t be saved',
  OVERTIME_DELETE: 'Delete this over?',
  OVERTIME_DELETE_SUBTEXT: 'You will not be able to recover it',
};

export const NOTIFICATIONS_TEXTS: IOvertimeNotifications = {
  add: 'The overtime has been successfully added',
  edit: 'The overtime has been successfully edited',
  delete: 'The overtime has been successfully deleted',
};

export const OVERTIME_STATUS = {
  ACTIVE: 'Active',
  APPROVED: 'Approved',
  AUTO_GENERATED: 'Auto Generated',
  COLLECTED: 'Collected',
  NOT_COLLECTED: 'NotCollected',
  PENDING_APPROVAL: 'Pending Approval',
  PENDING_COLLECTION: 'Pending Collection',
  REJECTED: 'Rejected',
};

export const TEXT_LENGTH = {
  overtimeTitleLength: 32,
};

export const VALIDATOR_LENGTH = {
  HOURS_MAX_LENGTH: 7,
  HOURS_INTEGER: 3,
  HOURS_DECIMAL: 3,
  HOURS_REGULAR: /^\d{0,3}([.]\d{0,3})?$/,
  SUM_MAX_LENGTH: 12,
  SUM_INTEGER: 7,
  SUM_DECIMAL: 2,
  SUM_REGULAR: /^\d{0,7}([.]\d{0,2})?$/,
  COMMENT_MIN_LENGTH: 1,
  COMMENT_MAX_LENGTH: 500,

};

export const KEYBOARD_BUTTONS = {
  zero: 48,
  nine: 57,
  dot: 46,
  comma: 44,
};

export const OVERTIME_DETAIL = {
  REF_PROGRAM_ID: 'bb9a42b4-35b2-11e9-8c5e-00155d9c500d',
  REF_PROGRAM_HINT_LINK: '/pages/viewpage.action?pageId=93357998'
};

export const OVERTIME_ID_PLACEHOLDERS = {
  ASSESSMENT: '110489b0-56d4-11e9-aa12-00155d9c500d',
  REFERRAL_PROGRAM: 'bb9a42b4-35b2-11e9-8c5e-00155d9c500d'
};

export const OVERTIME_PLACEHOLDERS = {
  ASSESSMENT: 'Last name of an interviewee*',
  REFERRAL_PROGRAM: 'Last name of a newcomer*'
};

export const OVERTIME_ANDERSEN_PROJECT_ID = '52adb099-9e46-11e5-805b-0050569441cb';
export const OVERTIME_PM_BONUS_ID = '112a5e19-57a6-11e9-aa12-00155d9c500d';
export const OVERTIME_PRESALE_ID = '38d68961-7b06-11e9-b8a9-00155d9c500d';
export const OVERTIME_ID_FOR_PROJECTS = '7cc5453f-8f72-11e5-805b-0050569441cb';

export const OVERTIME_TYPES_IDS = {
  upsale: '02559880-4aa7-11eb-85e2-0c9d92c3d39d',
  clutch: '9632e5fa-f52b-11eb-85ea-0c9d92c3d39d',
  aws: 'a3588584-f52b-11eb-85ea-0c9d92c3d39d',
  contract: 'd08cd495-f52b-11eb-85ea-0c9d92c3d39d'
};

export const OVERTIME_PRESALE_TYPES_IDS = {
  evaluation: '5b783d7a-0a39-11ec-85ea-0c9d92c3d39d',
  techRun: '849d4e4a-0a39-11ec-85ea-0c9d92c3d39d',
  techAssigment: '8dd9d2b9-0a39-11ec-85ea-0c9d92c3d39d',
  demo: '97b86c88-0a39-11ec-85ea-0c9d92c3d39d',
  presentation: 'a59cbbef-0a39-11ec-85ea-0c9d92c3d39d'
};
