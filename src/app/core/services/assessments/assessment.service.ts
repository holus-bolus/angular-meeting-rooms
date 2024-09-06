import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IAssessment, IPlannedAssessment } from '@interfaces/candidate';
import { catchError } from 'rxjs/operators';
import { ERROR_CODES } from '@constants/errors';
import { Moment } from 'moment-timezone/moment-timezone';
import { DATE_PIECES } from '@constants/moment.constant';
import { ErrorService } from '@services/error.service';
import { TimeService } from '@services/portal/time.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private httpClient: HttpClient,
              private timeService: TimeService,
              private errorService: ErrorService) { }

  public setInterviewer(assessmentId: string, interviewerId: string = null): Observable<void> {
    return this.httpClient.post<void>(`assessments/${assessmentId}/updateInterviewer`, { interviewerId })
      .pipe(
        catchError((error) => {
          this.triggerError(error);

          return throwError(null);
        })
      );
  }

  public setInterviewDate(assessmentId: string, assessmentDate: string): Observable<void> {
    return this.httpClient.post<void>(`assessments/${assessmentId}/updateAssessmentDate`, { assessmentDate });
  }

  public savePlannedInterview(assessmentId: string, plannedAssessment: IPlannedAssessment): Observable<void> {
    return this.httpClient.post<void>(`assessments/${assessmentId}/plan`, plannedAssessment)
      .pipe(
        catchError((error) => {
          this.triggerError(error);

          return throwError(null);
        })
      );
  }

  public getMinReviewDate(date: Moment): Moment {
    return this.timeService.getTimezoneDate(date).add(DATE_PIECES.DAY);
  }

  public getMinReviewDateFromAssessments(assessments: IAssessment[]): Moment {
    const interviewDates = assessments
      .filter(assessment => assessment.interviewDateTime)
      .map(assessment => Number(assessment.interviewDateTime));

    if (!interviewDates.length) {
      return;
    }

    const latestInterviewDate = Math.max(...interviewDates);

    return this.getMinReviewDate(this.timeService.getTimezoneDate(latestInterviewDate));
  }

  public triggerError(data: { code, message, errors }): void {
    const interviewerErrors = data.code === ERROR_CODES.VALIDATION_FAILED
      ? data.errors.map(error => error.message)
      : [data.message];

    this.errorService.triggerError(interviewerErrors);
  }
}
