import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export enum AssessmentTabs {
  approved = 'approved',
  interview = 'interview',
  preparation = 'preparation',
  ready = 'ready'
}

export const enum ASSESSMENT_PAGES {
  APPROVED = 'approved',
  INTERVIEW = 'interview',
  PREPARATION = 'preparation',
  READY = 'ready'
}

export const PLAN_MESSAGE = 'Salary review for';
export const INTERVIEW_PLAN_MESSAGE = 'Salary review and technical interview for';
export const START_INDEX = 0;
export const MAX_LENGTH_COMMENT = 999;
export const NO_EMPLOYEES_MESSAGE = 'There are no employees in this list';
export const NO_FILTERED_EMPLOYEES_MESSAGE = 'No matches for all filter criteria';
export const TABS = [
  { title: 'Approved', active: true, key: AssessmentTabs.approved },
  { title: 'Interview', active: false, key: AssessmentTabs.interview },
  { title: 'Preparation', active: false, key: AssessmentTabs.preparation },
  { title: 'Ready', active: false, key: AssessmentTabs.ready }
];


export function touchValidateDeep(formControl: FormGroup | FormArray, asTouchedOrUnTouched: 'touched' | 'untouched'): void {
  Object.values(formControl.controls)
    .filter((control: AbstractControl) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        control.updateValueAndValidity();
        touchValidateDeep(control, asTouchedOrUnTouched);

        return false;
      }

      return true;
    })
    .forEach((control: FormControl) => {
      switch (asTouchedOrUnTouched) {
        case 'touched':
          control.markAsTouched({ onlySelf: true });
          break;
        case 'untouched':
          control.markAsUntouched({ onlySelf: true });
          break;
        default:
          return;
      }
      control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    });
}
