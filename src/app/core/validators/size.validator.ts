import { AbstractControl, ValidatorFn } from '@angular/forms';

export function sizeValidator(imageSize: number): ValidatorFn {
  return (control: AbstractControl) => {
    const values: File | File[] = control.value;
    const error = { sizeError: { value: 'size limit' } };

    if (values instanceof File) {
      return imageSize > values.size
        ? null
        : error;
    }

    if (Array.isArray(values)) {
      const isValid = values.every(item => !(item instanceof File) || imageSize > item.size);

      return isValid
        ? null
        : error;
    }

    return null;
  };
}
