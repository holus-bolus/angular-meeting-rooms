import { AbstractControl, ValidationErrors } from '@angular/forms';

const IMAGE_SIZE = 3145728;

export function imageMaxSizeValidator(control: AbstractControl): ValidationErrors | null {
  const values = control.value;

  if (values) {
    const isValid = IMAGE_SIZE > values.size;

    return isValid
      ? null
      : {sizeError: {value: 'size limit'}};
  }

  return null;
}
