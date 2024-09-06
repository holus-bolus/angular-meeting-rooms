import { Color } from '@pages/merch-page/color-select/color.enum';

export interface ColorOption {
  color: string;
  value: Color;
}

export const colorOptions: ColorOption[] = [
  {
    value: Color.BLACK,
    color: '#000000',
  },
  {
    value: Color.YELLOW,
    color: '#EAB20F',
  }
];
