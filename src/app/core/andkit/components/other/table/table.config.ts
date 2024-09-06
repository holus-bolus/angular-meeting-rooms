import { ISelectOption } from '@interfaces/filter';

export interface TableOptions {
  paginationEnabled?: boolean;
  paginationPageSize?: number;
  rowHeight?: number;
  cellRenderers?: { [p: string]: (params: CellRendererParams) => string; };
  colWidth?: number;
}

/**
 * Based on ICellRendererParams of ag-grid
 */
export interface CellRendererParams {
  value: any;
  valueFormatted: any;
  getValue: () => any;
  setValue: (value: any) => void;
  formatValue: (value: any) => any;
  data: any;
  rowIndex: number;
  refreshCell: () => void;
}

/**
 * Based on IColumnDefinitions of ag-grid
 */
export interface ColumnDefinitions {
  headerName: string;
  field: string;
  sortable: boolean;
  comparator?: (a: number, b: number) => number;
  cellRenderer?: string;
  suppressSizeToFit: boolean;
  resizable?: boolean;
}

export const MAX_PAGES_COUNT = 5;

export interface TableDataOptions {
  [name: string]: TableDataOptionItem;
}

export interface TableDataOptionItem {
  fieldType?: string;
  valueType?: string;
  options?: ISelectOption<any>[];
  placeholder?: string;
}

export const enum MENU_ACTIONS {
  DELETE = 'Delete',
  EDIT = 'Edit',
  OPEN = 'Open'
}

export interface TableMenu {
  icon: string;
  actions?: MENU_ACTIONS[];
}

export interface TableMenuAction {
  item: any;
  action?: MENU_ACTIONS;
}

export interface TableFieldAction {
  item: any;
  fieldName: string;
  newValue?: any;
}
