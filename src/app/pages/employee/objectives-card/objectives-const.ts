import {
  TYPE_OBJECTIVE_STATUS_NAME, TYPE_SELECT_OPTIONS_IDS,
  TYPE_SELECT_OPTIONS_NAME, TypeObjectiveStatusOption,
  TypeSelectOptions
} from '@interfaces/objective';

export const OBJECTIVES_INFO_WINDOW_WIDTH = '721px';
export const OBJECTIVES_MODAL_WINDOW_WIDTH = '780px';
export const OBJECTIVES_MODAL_TO_ATCHIVE_WIDTH = '480px';

export const TYPE_SELECT_OPTIONS: TypeSelectOptions[] = [
  {
    id: TYPE_SELECT_OPTIONS_IDS.NONE,
    name: TYPE_SELECT_OPTIONS_NAME.NONE
  },
  {
    id: TYPE_SELECT_OPTIONS_IDS.SOFT_SKILLS,
    name: TYPE_SELECT_OPTIONS_NAME.SOFT_SKILLS
  },
  {
    id: TYPE_SELECT_OPTIONS_IDS.HARD_SKILLS,
    name: TYPE_SELECT_OPTIONS_NAME.HARD_SKILLS
  },
  {
    id: TYPE_SELECT_OPTIONS_IDS.PROJECT,
    name: TYPE_SELECT_OPTIONS_NAME.PROJECT
  },
  {
    id: TYPE_SELECT_OPTIONS_IDS.MANAGEMENT,
    name: TYPE_SELECT_OPTIONS_NAME.MANAGEMENT
  }
];

export const OBJECTIVES_STATUS: TypeObjectiveStatusOption[] = [
  {
    id: 0,
    name: TYPE_OBJECTIVE_STATUS_NAME.DONE
  },
  {
    id: 1,
    name: TYPE_OBJECTIVE_STATUS_NAME.FAILED
  },
  {
    id: 2,
    name: TYPE_OBJECTIVE_STATUS_NAME.OPEN
  }
];

export const OBJECTIVE_VALIDATOR_LENGTH = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 255,
};

export const VALIDATOR_LENGTH = {
  COMMENT_MIN_LENGTH: 1,
  COMMENT_MAX_LENGTH: 500,
};

export const OBJECTIVE_NO_DATA_LABEL = 'Objective list is empty. Contact with RM to add an objective';

export const OBJECTIVE_NO_DATA_HR_LABEL = 'Objective list is empty';
