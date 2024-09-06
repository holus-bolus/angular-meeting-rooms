import { AbstractControl, ValidatorFn } from '@angular/forms';
import { getStartOfDay } from './dates.validator';

export function getCurrentReviewDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } => {
    const reviewDate = getStartOfDay(new Date(control.value));
    const currentDate = getStartOfDay(new Date());

    return reviewDate >= currentDate ? null : {currentReviewDateError: control.value};
  };
}
