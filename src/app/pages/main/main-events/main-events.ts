export interface IOptionsChangesEvent {
  options: Array<string>;
  selectionName: string;
}

export interface IDatesChangesEvent {
  options: Array<Date>;
  current: boolean;
}


export const CURRENT_SEARCH_RANGE = 31536000; // 1 year
export const FIRST_HOURS = 0;
export const FIRST_MINUTES = 0;
export const FIRTS_SECONDS = 0;
export const LAST_DAY = 0;
export const LAST_HOURS = 23;
export const LAST_MINUTES = 59;
export const LAST_SECONDS = 59;
