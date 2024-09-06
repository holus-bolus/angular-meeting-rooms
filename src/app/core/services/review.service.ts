import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  IParsedPart,
  IEmployeesReview,
  IReviewsHistory,
  IEmployeesReviewResponse,
  IReviewsHistoryResponse, IEmployeesAssessmentResponse
} from '@interfaces/candidate';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  public getReviewHistory(employeeId: string): Observable<IReviewsHistory> {
    return this.httpClient.get<IReviewsHistoryResponse>(`employees/${employeeId}/reviewResults`)
      .pipe(
        map(reviews => ({ ...reviews, salaryReviews: reviews.salaryReviews.map(this.parseReview) })),
        catchError(({ code, message }) => {
          this.errorService.triggerError([message]);

          return throwError(null);
        })
      );
  }

  private parseReview(salaryReview: IEmployeesReviewResponse): IEmployeesReview {
    const parsedPart = salaryReview.assessments
      .reduce<IParsedPart>(
        (parsed: IParsedPart, assessment: IEmployeesAssessmentResponse) => {
          const { matrix, assessmentTechnology, interviewer, assessmentDate } = assessment;
          const isUniqueInterviewers = interviewer
            && parsed.interviewers.every(uniqueInterviewer => uniqueInterviewer.id !== interviewer.id);
          const isUniqueDates = assessmentDate
          && parsed.interviewsDatesTimes.every(uniqueDateTime => uniqueDateTime !== assessmentDate);
          const uniqueInterviewers = isUniqueInterviewers
          ? [...parsed.interviewers, interviewer]
          : parsed.interviewers;
          const uniqueDates = isUniqueDates
          ? [...parsed.interviewsDatesTimes, assessmentDate]
          : parsed.interviewsDatesTimes;

          return {
            interviewers: uniqueInterviewers,
            interviewsDatesTimes: uniqueDates,
            assessments: [...parsed.assessments, { assessmentTechnology, matrix }]
          };
        },
        { assessments: [], interviewers: [], interviewsDatesTimes: [] });

    return { ...salaryReview, ...parsedPart };
  }
}
