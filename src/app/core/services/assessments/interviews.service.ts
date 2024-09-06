import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  IEmployeeInterview, IEmployeeInterviewResponse, IInterviewAssessmentResponse,
  IInterviews,
  IInterviewsResponse,
  IParsedInterviewPart
} from '@interfaces/interview';
import { AssessmentService } from './assessment.service';
import { catchError, map } from 'rxjs/operators';
import { IInterviewerPreview } from '@interfaces/candidate';

@Injectable({
  providedIn: 'root'
})
export class InterviewsService {
  constructor(
    private httpClient: HttpClient,
    private assessmentService: AssessmentService
  ) {}

  public getInterviewers(surnameFilter: string): Observable<IInterviewerPreview[]> {
    return this.httpClient.get<IInterviewerPreview[]>('interviewers', { params: { surname: surnameFilter } });
  }

  public getInterviews(interviewerId: string, page: number, isCurrent: boolean = true): Observable<IInterviews> {
    const queryParams = { interviewerId, page: String(page), isCurrent: String(isCurrent) };

    return this.httpClient.get<IInterviewsResponse>(`employees/${interviewerId}/assessments`, { params: queryParams })
      .pipe(
        map((interviews: IInterviewsResponse) => ({ ...interviews, data: interviews.data.map(this.parseInterview) })),
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }

  public finishInterview(salaryReviewId: string): Observable<void> {
    return this.httpClient.post<void>(`reviews/${salaryReviewId}/complete`, {})
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }

  private parseInterview(interviews: IEmployeeInterviewResponse): IEmployeeInterview {
    const parsedPart = interviews.assessments
      .reduce<IParsedInterviewPart>(
        (parsed: IParsedInterviewPart, assessment: IInterviewAssessmentResponse) => {
          const { id, technology, currentLevel, interviewer, matrix, isCurrent, interviewDate } = assessment;
          const isUniqueDates = interviewDate
            && parsed.interviewsDates.every((uniqueDate: string) => uniqueDate !== interviewDate);
          const uniqueDates = isUniqueDates
            ? [...parsed.interviewsDates, interviewDate]
            : parsed.interviewsDates;

          return {
            interviewsDates: uniqueDates,
            assessments: [...parsed.assessments, { id, technology, currentLevel, interviewer, matrix, isCurrent }]
          };
        },
        { interviewsDates: [], assessments: [] }
      );

    return { ...interviews, ...parsedPart };
  }
}
