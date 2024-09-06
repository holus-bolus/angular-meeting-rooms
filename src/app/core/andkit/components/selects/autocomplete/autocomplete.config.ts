export enum DropDownSearchMode {
  CONTAINS = 'contains',
  STARTSWITH = 'startswith',
}

export interface AutoCompleteSettings {
  noneText: string;
  searchMode: DropDownSearchMode;
  searchExpr: string;
  displayExpr: string;
  searchTimeout: number;
  minSearchLength: number;
  searchEnabled: boolean;
}
