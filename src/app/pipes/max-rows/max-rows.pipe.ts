import { Pipe, PipeTransform } from '@angular/core';

const ROWS_ONE_TECHNOLOGY_NO_BUTTON = 5;
const ROWS_TWO_TECHNOLOGIES_NO_BUTTON = 7;
const ROWS_ONE_TECHNOLOGY_BUTTON = 5;
const ROWS_TWO_TECHNOLOGIES_BUTTON = 5;

@Pipe({
  name: 'maxRows'
})
export class MaxRowsPipe implements PipeTransform {

  transform(amountOfAssessments: number, isFinishButton: boolean): number {
    return isFinishButton
      ? amountOfAssessments < 2 ? ROWS_ONE_TECHNOLOGY_BUTTON : ROWS_TWO_TECHNOLOGIES_BUTTON
      : amountOfAssessments < 2 ? ROWS_ONE_TECHNOLOGY_NO_BUTTON : ROWS_TWO_TECHNOLOGIES_NO_BUTTON;
  }

}
