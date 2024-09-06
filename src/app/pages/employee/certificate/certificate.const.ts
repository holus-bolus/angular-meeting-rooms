export const CERTIFICATE_BACK_DATA = {
  canEditCertificates: true,
  skillLevels: [
    'Junior 1', 'Junior 2', 'Junior 3', 'Middle 1', 'Middle 2', 'Middle 3', 'Senior 1', 'Senior 2'
  ],
  certificates: [
    [
      {
        employeeName: 'Vasiliy Petrov',
        technology: 'QA Automation Python',
        level: 'Middle 2',
        certificateDate: '2020-03-14T00:00:00',
        certificateNumber: '00002',
        objectives: [
          {
            name: 'Take part in the interview procedure (сonduct at least 15 interviews)',
            id: '1'
          },
          {
            name: 'To make a presentation at an public event / meetup',
            id: '2'
          },
          {
            name: 'Participation in a meetup inside Tinkoff in order to identify opportunities for improving' +
              ' technical processes on the project',
            id: '3'
          },
          {
            name: 'Continue to help with preparations for the new candidates to project ( 3 candidates)',
            id: '4'
          },
          {
            name: 'Make a demo for the project',
            id: '5'
          },
        ],
        project: 'Tinkoff bank, Andersen Portal',
        englishLevel: 'B1',
        nextAssessment: '2020-10-15T00:00:00',
      }
    ],
    [
      {
        employeeName: 'Vasiliy Petrov',
        technology: 'QA Automation Python',
        level: 'Middle 1',
        certificateDate: '2020-10-15T00:00:00',
        certificateNumber: '00001',
        objectives: [
          {
            name: 'Take part in the interview procedure (сonduct at least 15 interviews)',
            id: '1'
          },
          {
            name: 'To make a presentation at an public event / meetup',
            id: '2'
          },
          {
            name: 'Participation in a meetup inside Tinkoff in order to identify opportunities for improving technical ' +
              'processes on the project',
            id: '3'
          },
          {
            name: 'Continue to help with preparations for the new candidates to project ( 3 candidates)',
            id: '4'
          },
          {
            name: 'Make a demo for the project',
            id: '5'
          },
        ],
        project: 'Tinkoff bank, Andersen Portal',
        englishLevel: 'A2',
        nextAssessment: '2020-10-15T00:00:00',
      },
      {
        employeeName: 'Vasiliy Petrov',
        technology: 'QA Automation Python',
        level: 'Middle 1',
        certificateDate: '2020-10-15T00:00:00',
        certificateNumber: '00001',
        objectives: [
          {
            name: 'Take part in the interview procedure (сonduct at least 15 interviews)',
            id: '1'
          },
          {
            name: 'To make a presentation at an public event / meetup',
            id: '2'
          },
          {
            name: 'Participation in a meetup inside Tinkoff in order to identify opportunities for improving technical ' +
              'processes on the project',
            id: '3'
          },
        ],
        project: 'Tinkoff bank, Andersen Portal',
        englishLevel: 'A2',
        nextAssessment: '2020-10-15T00:00:00',
      },
    ],
  ]
};

export const EDIT_MODAL_WIDTH = '840px';

export const EDIT_MODAL_HEIGHT = '880px';

export const CERTIFICATE_ENGLISH_LEVEL = [
  {
    id: 'A1',
    name: 'A1',
  },
  {
    id: 'A2',
    name: 'A2',
  },
  {
    id: 'B1',
    name: 'B1',
  },
  {
    id: 'B2',
    name: 'B2',
  },
  {
    id: 'C1',
    name: 'C1',
  },
  {
    id: 'C2',
    name: 'C2',
  },
];

export const CERTIFICATES_TECH_LEVEL = [
  {
    id: 'Junior 1',
    name: 'Junior 1',
  },
  {
    id: 'Junior 2',
    name: 'Junior 2',
  },
  {
    id: 'Junior 3',
    name: 'Junior 3',
  },
  {
    id: 'Middle 1',
    name: 'Middle 1',
  },
  {
    id: 'Middle 2',
    name: 'Middle 2',
  },
  {
    id: 'Senior',
    name: 'Senior',
  },
];

export const CONFIRM_MODAL_WIDTH = '496px';

export const CONFIRM_MODAL_HEIGHT = '346px';

export const CONFIRM_MODAL_DELETE_PARAMS = {
  titleText: 'Are you sure you want to delete the goal?',
  subtitleText: '',
  cancelBtnText: 'No',
  confirmBtnText: 'Yes',
  isOther: true
};

export const CONFIRM_MODAL_CLOSE_PARAMS = {
  titleText: 'Cancel editing the certificate?',
  subtitleText: 'Your changes will not be saved',
  cancelBtnText: 'No',
  confirmBtnText: 'Yes',
};

export const CONFIRM_MODAL_SEND_PARAMS = {
  titleText: 'Are you sure you want to send the certificate to',
  subtitleText: '',
  cancelBtnText: 'No',
  confirmBtnText: 'Yes',
  isOther: true
};

export const NO_CERTIFICATE_MESSAGE = 'There are no certificates yet';

export const DOWNLOAD_FILE_TYPES = [
  {
    fileName: '.pdf',
    checked: true
  },
  {
    fileName: '.jpg',
    checked: false
  }
];

export const DEFAULT_FILE_TYPE = '.pdf';

export enum FILE_TYPES {
  PDF = '.pdf',
  JPG = '.jpg'
}

export const CERTIFICATE_NOTIFICATION = 'The certificate has been successfully sent to';

export const CERTIFICATE_UPDATE_NOTIFICATION = 'The certificate has been successfully saved';

export const INITIAL_UUID_VALUE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

export const CERTIFICATE_HEADER_DELAY = 210;
