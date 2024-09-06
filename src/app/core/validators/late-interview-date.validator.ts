import { FormGroup, ValidatorFn } from '@angular/forms';
import { getStartOfDay } from './dates.validator';

export function getLateReviewDateValidator(): ValidatorFn {
  return (controls: FormGroup): { [key: string]: boolean } => {
    const isoFormatInterviewDate = controls.get('interviewDate').value;
    const isoFormatReviewDate = controls.get('reviewDate').value;

    if (isoFormatInterviewDate && isoFormatReviewDate) {
      const interviewDate = getStartOfDay(new Date(isoFormatInterviewDate));
      const reviewDate = getStartOfDay(new Date(isoFormatReviewDate));

      return reviewDate > interviewDate ? null : { lateInterviewDateError: isoFormatInterviewDate};
    }
  };
}
