import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AssessmentService } from './assessments/assessment.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewersFeedbackService {

  constructor(private httpClient: HttpClient,
              private assessmentService: AssessmentService) { }

  saveFeedback(salaryReviewId: string, interviewerComment: string): Observable<void> {
    return this.httpClient.post<void>(`reviews/${salaryReviewId}/assessments/updateInterviewerFeedback`, {interviewerComment})
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }
}
