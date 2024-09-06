export const SORT_OPTIONS = {
  lastFeedback:     { isDesc: true, isActive: true },
  amountOfFeedback: { isDesc: true, isActive: false },
  rating:           { isDesc: true, isActive: false },
};

const STATUS_FILTER_OPTIONS = {
  active: true,
  closed: true,
};

export const FILTERS = {
  project: { value: null, isActive: false },
  manager: { value: null, isActive: false },
  status: { value: STATUS_FILTER_OPTIONS, isActive: false },
  onlySelected: { value: false, isActive: false },
};

export enum MANAGER_TYPE {
  projectManager = 'projectManager',
  deliveryManager = 'deliveryManager',
  pc = 'pc',
  sdm = 'sdm',
  dd = 'dd',
  adm = 'adm'
}

export const MANAGER_TYPES = [
  { title:'PM', value: MANAGER_TYPE.projectManager },
  { title:'DM', value: MANAGER_TYPE.deliveryManager },
];
