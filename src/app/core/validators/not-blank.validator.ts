import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notBlankValidator(control: AbstractControl): ValidationErrors | null {
  return control.value ? null : {value: 'value is required'};
}
