import { AbstractControl, ValidatorFn } from '@angular/forms';

export function requireObjectPropertyValidator(objectKey: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value[objectKey]
      ? control.value[objectKey].length ? null : {[objectKey]: 'required'}
      : {[objectKey]: 'required'};
  };
}
