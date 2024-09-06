import {FormGroup, ValidatorFn} from '@angular/forms';

export function getCurrentInterviewDateValidator(timeControlName: string, dateControlName: string): ValidatorFn {
  return (formGroupControls: FormGroup) => {

    const isExistControls = formGroupControls.get(timeControlName) && formGroupControls.get(dateControlName);

    if (isExistControls) {
      const time = formGroupControls.get(timeControlName).value;
      const date = new Date(formGroupControls.get(dateControlName).value);

      const [hours, minutes] = time.split(':');

      const transformedHours = Number(hours);
      const transformedMinutes = Number(minutes);

      date.setHours(transformedHours);
      date.setMinutes(transformedMinutes);

      const currentDate = new Date();

      return date > currentDate ? null : {currentInterviewDateError: time};
    }
  };
}
