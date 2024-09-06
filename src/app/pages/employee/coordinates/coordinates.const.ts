export enum CoordinatesTitleList {
  NAME = 'NAME & SURNAME',
  LEVEL = 'LEVEL',
  TECHNOLOGY = 'TECHNOLOGY',
  LANGUAGE = 'LANG.',
  PROJECT_EMPLOYMENT = 'PROJECT EMPLOYMENT',
  ASSESSMENT = 'ASSM.',
  ONE_TO_ONE = '1 TO 1',
  RISK_OF_LEAVING = 'LEAVING',
  RESOURCE_MANAGER = 'RESOURCE MANAGER',
  LOCATION = 'LOCATION',
}

export enum COORDINATES_FILTER {
  TECHNOLOGY = 'technology',
  NAME = 'name',
  LOCATION = 'location',
}

export const COLUMN_NAME = {
  id: 'name',
  name: 'Name',
};

export const COLUMN_LEVEL = {
  id: 'level',
  name: 'Level',
};

export const COLUMN_LANGUAGE = {
  id: 'language',
  name: 'Language',
};

export const COLUMN_TECHNOLOGY = {
  id: 'technology',
  name: 'Technology',
};

export const COLUMN_PROJECT_EMPLOYMENT = {
  id: 'project',
  name: 'Project employment',
};

export const COLUMN_ASSESSMENT = {
  id: 'assessment',
  name: 'Assessment',
};

export const COLUMN_ONE_TO_ONE = {
  id: 'oneToOne',
  name: '1 to 1',
};

export const COLUMN_RISK_OF_LEAVING = {
  id: 'riskOfLeaving',
  name: 'Risk of leaving',
};

export const COLUMN_RESOURCE_MANAGER = {
  id: 'rm',
  name: 'Resource manager',
};

export const COLUMN_LOCATION = {
  id: 'location',
  name: 'Location',
};

export const COORDINATES_COLUMNS = {
  [COLUMN_LEVEL.id]: COLUMN_LEVEL,
  [COLUMN_TECHNOLOGY.id]: COLUMN_TECHNOLOGY,
  [COLUMN_LANGUAGE.id]: COLUMN_LANGUAGE,
  [COLUMN_PROJECT_EMPLOYMENT.id]: COLUMN_PROJECT_EMPLOYMENT,
  [COLUMN_ASSESSMENT.id]: COLUMN_ASSESSMENT,
  [COLUMN_ONE_TO_ONE.id]: COLUMN_ONE_TO_ONE,
  [COLUMN_RISK_OF_LEAVING.id]: COLUMN_RISK_OF_LEAVING,
  [COLUMN_RESOURCE_MANAGER.id]: COLUMN_RESOURCE_MANAGER,
  [COLUMN_LOCATION.id]: COLUMN_LOCATION,
};

export const LIST_RISK_OF_LEAVING = [
  {
    id: 0,
    name: 'None',
  },
  {
    id: 1,
    name: 'Low'
  },
  {
    id: 2,
    name: 'Mid',
  },
  {
    id: 3,
    name: 'High'
  },
  {
    id: 4,
    name: 'Critical'
  }
];

export const NONE = 'None';

export enum activeIconNames {
  LEVEL_ICON = 'levelIcon',
  LANGUAGE_ICON = 'languageIcon',
  ASSESSMENT_ICON = 'assessmentIcon',
  ONE_TO_ONE_ICON = 'oneToOneIcon'
}

export enum sortedColumnsNames {
  LEVEL = 'levelSortOrder',
  LANGUAGE = 'languageSortOrder',
  ASSESSMENT = 'assessmentSortOrder',
  ONE_TO_ONE = 'oneToOneSortOrder'
}

export const COORDINATES_LIST_LENGTH = 7;
