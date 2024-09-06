import { AbstractControl, ValidationErrors } from '@angular/forms';

const pattern = /(\.jpg|\.jpeg|\.png)$/i;

export function imageExtensionValidator(control: AbstractControl): ValidationErrors | null {
  const { name } = control.value;
  const regExp = new RegExp(pattern);
  const isPermittedExtension = regExp.test(name);

  return isPermittedExtension ? null : { extensionError: name };
}
