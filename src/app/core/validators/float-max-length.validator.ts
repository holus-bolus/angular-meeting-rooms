import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { values, entries } from 'lodash';

export function floatMaxLengthValidator(integerMaxLength: number, decimalMaxLength: number): ValidatorFn {
  const digitsSeparators = ['.', ','];
  const errorsMessages = {
    integer: { integerSize: `max length for integer is ${integerMaxLength}` },
    decimal: { decimalSize: `max length for decimal is ${decimalMaxLength}` }
  };

  return (control: AbstractControl) => {
    const value = String(control.value);
    const separatorInValue = digitsSeparators.find(separator => value.includes(separator));
    const [integer = '', decimal = ''] = value.split(separatorInValue);
    const errors = {
      integer: integer.length > integerMaxLength,
      decimal: decimal.length > decimalMaxLength
    };

    if (values(errors).every(error => !error)) {
      return null;
    }

    return entries(errors).reduce<ValidationErrors>((validationErrors, [errorName, isError]) => {
      return isError ? { ...validationErrors, [errorName]: errorsMessages[errorName] } : validationErrors;
    },                                              {});
  };
}
