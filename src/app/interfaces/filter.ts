import { SafeHtml } from '@angular/platform-browser';

export interface ICommonOption<T = string, V = string> {
  id: T;
  name?: string;
  value?: V;
  checked?: boolean;
  disabled?: boolean;
  description?: string;
  selectionName?: string;
  place?: string;
  photo?: string | SafeHtml;
  photoUrl?: string | SafeHtml;
  level?: string;
  technologyId?: string;
  currency?: string;
  position?: string;
  abbreviation?: string;
  approverName?:string;
  title?: string;
}

export interface ITag {
  id: string;
  name: string;
  selectionName?: string;
}

export interface ISelectOption<T> {
  label: string;
  value: T;
  checked?: boolean;
  disabled?: boolean;
}

export interface IOption {
  id: string | number;
  name: string;
  disabled?: boolean;
  checked?: boolean;
}
