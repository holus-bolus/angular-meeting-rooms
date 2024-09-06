
export interface IUserObjectives {
  canEdit: boolean;
  nextAssessmentDate: string;
  currentObjectives: IObjective[];
  archivedObjectives: IObjective[];
}

export interface IObjective {
  id?: string;
  objectiveStatus?: number;
  objectiveType?: TYPE_SELECT_OPTIONS_IDS;
  interviewerId?: string;
  employeeId: string;
  objective: string;
  type: TYPE_SELECT_OPTIONS_NAME;
  dueDate: string;
  comment: string;
  status: TYPE_OBJECTIVE_STATUS_NAME;
}

export enum ObjectiveStatusEnum {
  OPEN = 'Open',
  DONE = 'Done',
  FAILED = 'Failed',
}

export interface ObjectivesListColumnsData {
  field: string;
  label: string;
}

export enum TYPE_SELECT_OPTIONS_NAME {
  NONE = 'None',
  SOFT_SKILLS = 'Soft Skills',
  HARD_SKILLS = 'Hard Skills',
  PROJECT = 'Project',
  MANAGEMENT = 'Management'
}

export enum TYPE_SELECT_OPTIONS_IDS {
  NONE = 'None',
  SOFT_SKILLS = 'SoftSkills',
  HARD_SKILLS = 'HardSkills',
  PROJECT = 'Project',
  MANAGEMENT = 'Management'
}

export interface TypeSelectOptions {
  id: TYPE_SELECT_OPTIONS_IDS;
  name: TYPE_SELECT_OPTIONS_NAME;
}

export enum TYPE_OBJECTIVE_STATUS_NAME {
  OPEN = 'Open',
  DONE = 'Done',
  FAILED = 'Failed'
}

export interface TypeObjectiveStatusOption {
  id: number;
  name: TYPE_OBJECTIVE_STATUS_NAME;
}

export const OBJECTIVE_TYPES = [
  {
    id: 0,
    name: 'Soft Skills',
  },
  {
    id: 1,
    name: 'Hard Skills',
  },
  {
    id: 2,
    name: 'Management',
  },
  {
    id: 4,
    name: 'Project',
  },
];
