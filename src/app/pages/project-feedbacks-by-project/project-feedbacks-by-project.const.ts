import { ICommonOption } from '@interfaces/filter';

export const IS_GOOD_OPTIONS = [
  {
    id: 1,
    name: '=> 3',
    value: true,
    checked: false,
  },
  {
    id: 2,
    name: '< 3',
    value: false,
    checked: false,
  },
] as ICommonOption<number, boolean>[];

export const VALUABLE_OPTIONS = [
  {
    id: 0,
    name: 'Valuable',
    value: 0,
    checked: false,
  },
  {
    id: 1,
    name: 'Not valuable',
    value: 1,
    checked: false,
  },
  {
    id: 3,
    name: 'Not marked',
    value: 3,
    checked: false,
  },
] as ICommonOption<number, number>[];
