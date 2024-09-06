export const EXPERT_ACTIVITIES_MODAL_WIDTH = '480px';

export const FILTER_PLACEHOLDERS = {
  search: 'Last name',
  technology: 'Technology',
  location: 'Location',
  type: 'Type of Activity',
  technologyLevel: 'Level of Technology',
  languageLevel: 'Level of Language',
};

export const TYPE_OF_ACTIVITIES = [
  {
    name: 'Demo Interview',
    id: 'Demo Interview',
  },
  {
    name: 'Mentoring',
    id: 'Mentoring',
  },
  {
    name: 'Project Estimation',
    id: 'Project Estimation',
  },
  {
    name: 'Service Presentation',
    id: 'Service Presentation',
  },
  {
    name: 'Technical Interview',
    id: 'Technical Interview',
  },
  {
    name: 'Technical Task Implementation',
    id: 'Technical Task Implementation',
  },
];

export const EXPERT_ACTIVITIES_TECH_LEVEL = [
  {
    id: 'J1',
    name: 'J1',
  },
  {
    id: 'J2',
    name: 'J2',
  },
  {
    id: 'J3',
    name: 'J3',
  },
  {
    id: 'M1',
    name: 'M1',
  },
  {
    id: 'M2',
    name: 'M2',
  },
  {
    id: 'S',
    name: 'S',
  },
];

export const EXPERT_ACTIVITIES_ENGLISH_LEVEL = [
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

export enum expertActivitiesFilterControls {
  SURNAME = 'surname',
  LOCATIONS = 'locations',
  TECHNOLOGIES = 'technologies',
  EXPERT_ACTIVITIES = 'expertActivities',
  TECHNOLOGY_LEVELS = 'technologyLevels',
  ENGLISH_LEVELS = 'englishLevels',
}

export const SORT_OPTIONS = {
  surname: { isDesc: true, isActive: true, control: 0 },
  level: { isDesc: true, isActive: false, control: 1 },
  engLevel: { isDesc: true, isActive: false, control: 2 },
};

export const PAGINATOR_OPTIONS = [
  {
    id: '20',
    name: '20',
  },
  {
    id: '30',
    name: '30',
  },
  {
    id: '40',
    name: '40',
  },
];

export const PAGINATOR_DEFAULT_OPTION = {
  id: '30',
  name: '30',
};
