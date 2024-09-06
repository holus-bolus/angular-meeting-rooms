import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

export function getXoRValidator(): ValidatorFn {
  return (formGroup: FormGroup) => {
    const requireErrors = Object.values(formGroup.controls).map(control => Validators.required(control));
    const isAllFieldsEmpty = requireErrors.every(error => error !== null);
    const isAllFieldsFull = requireErrors.every(error => error === null);

    return (isAllFieldsEmpty || isAllFieldsFull) ? null : requireErrors;
  };
}
