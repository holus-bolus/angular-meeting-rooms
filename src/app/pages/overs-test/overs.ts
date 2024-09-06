import { Observable } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';

export interface OverTypeGroup {
  id: string;
  name: string;
  overTypeGroups: OverType[];
}

export interface OverType {
  id: string;
  name: string;
  description: string;
  isOpened?: boolean;
  overTypes?: OverType[];
}

export interface Overtime {
  id: string;
  name: string;
  description: string;
  isProject: boolean;
  isRequiredProject?: boolean;
  isHours: boolean;
  isSum: boolean;
  isComment: boolean;
  isGross: boolean;
  isJiraLink: boolean;
  isAttachment: boolean;
  isRequiredAttachment: boolean;
  isReferralProgram: boolean;
  isNeedGetDm: boolean;
  prompt?: string;
  patternJiraLink: string;
  overApprovers: [
    {
      approverId: string;
      approverName: string;
    }
  ];
  overJiraRules: string[];
  overRulesCurrencies: [
    {
      currency: string;
      maxValue?: string;
    }
  ];
  overAdditionalInformations: [
    {
      id: string;
      fieldName: string;
      value: string;
    }
  ];
}

export interface IOvertimeSubmittedList {
  annuallyOvers?: IOvertimeSubmittedItem[];
  annuallyPayDay: string;
  annuallySum: number;
  monthlyOvers?: IOvertimeSubmittedItem[];
  monthlyPaymentDate: string;
  monthlySum: number;
  overTypes: [];
  projects: [];
  quarterlyOvers?: IOvertimeSubmittedItem[];
  quarterlyPayDay: string;
  quarterlySum: number;
}

export interface IOvertimeSubmittedItem {
  id: string;
  name: string;
  overTypeId: string;
  createDate: string;
  payDay: string;
  status: string;
  hours?: number;
  sum?: number;
  projectName?: string;
  currency?: string;
  jiraLink?: string;
}

export interface IOvertimePostData {
  overTypeId: string;
  employeeId: string;
  approver?: {
    approverId: string
  };
  approverId?: string;
  project?: {
    projectId: string;
  };
  projectId?: string;
  comment?: string;
  sum?: number;
  currency?: number | string;
  hours?: number;
  jiraLink?: string;
  referralEmployeeId?: string;
  AdditionalInformation?: string | string[];
  overFiledAttachments?: string[];
}

export interface IOvertimeOptions {
  project$: Observable<ICommonOption[]>;
  fullNames$: Observable<ICommonOption[]>;
}

export const OVERTIME_RADIO_BUTTONS = [
  {
    title: 'Sum',
    value: 1
  },
  {
    title: 'Hours',
    value: 2
  }
];

export const CONFIRM_MODAL_CANCEL_PARAMS = {
  titleText: 'Are you sure you want to leave this page?',
  subtitleText: 'Your over won’t be applied',
  cancelBtnText: 'No',
  confirmBtnText: 'Yes',
};

export const OVERTIME_JIRALINK_ERROR = 'The format of the field should be: \'https://jira.andersenlab.com/browse/PRMT-XXX\' (or XXXX) - it\'s issue number';

export const OVERTIME_ATTACHMENT_TYPES = [
  'xls',
  'xlsx',
  'txt',
  'doc',
  'docx',
  'jpg',
  'jpeg',
  'heif',
  'png',
  'pdf',
  'zip',
  'rar',
  'csv',
  'gif'
];

export const OVERTIMES_ATTACHMENT_SIZE = {
  name: '5MB',
  value: 5242880
};

export const OVERTIME_CURRENCY = [
  {
    id: 0,
    name: 'USD'
  },
  {
    id: 1,
    name: 'RUB'
  },
  {
    id: 2,
    name: 'AUD'
  },
  {
    id: 3,
    name: 'BYN'
  },
  {
    id: 4,
    name: 'UAH'
  },
  {
    id: 5,
    name: 'EUR'
  },
  {
    id: 6,
    name: 'CAD'
  },
  {
    id: 7,
    name: 'GBP'
  },
  {
    id: 8,
    name: 'PLN'
  },
  {
    id: 9,
    name: 'HUF'
  },
  {
    id: 10,
    name: 'GEL'
  },
  {
    id: 11,
    name: 'KZT'
  }
];

export const OVERTIME_PERIODS = [
  {
    title: 'Monthly',
    value: 1
  },
  {
    title: 'Quarterly',
    value: 2
  },
  {
    title: 'Yearly',
    value: 3
  }
];

export const overs: OverTypeGroup[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Compensation',
    overTypeGroups: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Apartment rent',
        description: 'Apartment rent description',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Presales',
        description: 'Presales description',
        overTypes: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Candidate tech run',
            description: 'Candidate tech run description',
          },
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Demo interview',
            description: 'Demo interview description',
          },
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Services presentation',
            description: 'Services presentation description',
          },
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Services presentation',
            description: 'Services presentation description',
          },
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            name: 'Technical task completion',
            description: 'Technical task completion description',
          },
        ],
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Recruiter bonus',
        description: 'Recruiter bonus description',
      },
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Recruiting tech interview',
        description: 'Recruiting tech interview description',
      },
    ],
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Overs',
    overTypeGroups: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Assessment',
        description: 'Assessment description',
      },
    ],
  }
];
