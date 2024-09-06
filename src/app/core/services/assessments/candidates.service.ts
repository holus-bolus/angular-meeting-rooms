import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AssessmentService } from './assessment.service';
import { ErrorService } from '@services/error.service';
import { IReviewsResponse } from '@interfaces/candidate';
import { REVIEW_STATES } from '@constants/candidates.constants';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private clearFilters$ = new Subject<void>();
  private reviewDates$ = new Subject<Date>();

  constructor(private httpClient: HttpClient,
              private errorService: ErrorService,
              private assessmentService: AssessmentService) { }

  public getCandidates(state: REVIEW_STATES): Observable<IReviewsResponse> {
    return this.httpClient.get<IReviewsResponse>('reviews', { params: { state } })
      .pipe(
        catchError(({ code, message }) => {
          this.errorService.triggerError([message]);

          return throwError(null);
        })
      );
  }

  public getInterviewedCandidates<T>(): Observable<T> {
    return this.httpClient.get<T>('reviews/inProgress')
      .pipe(
        catchError(({ code, message }) => {
          this.errorService.triggerError([message]);

          return throwError(null);
        })
      );
  }

  public getCandidateDetails<T>(id: string): Observable<T> {
    return this.httpClient.get<T>(`reviews/${id}`)
      .pipe(
        catchError(({ code, message }) => {
          this.errorService.triggerError([message]);

          return throwError(null);
        })
      );
  }

  public setCoordinatorComment<T>(id: string, coordinatorComment: string): Observable<T> {
    return this.httpClient.put<T>(`reviews/${id}/comment`, { coordinatorComment })
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }

  public setReviewDate(id: string, reviewDate: string): Observable<void> {
    return this.httpClient.post<void>(`reviews/${id}/updateReviewDate`, { reviewDate })
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }

  public savePlannedReviewDate<T>(id: string, reviewDate: string): Observable<T> {
    return this.httpClient.post<T>(`reviews/${id}/plan`, { reviewDate })
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }

  public clearFilters(): Observable<void> {
    return this.clearFilters$.asObservable();
  }

  public triggerClearFilters(): void {
    this.clearFilters$.next();
  }

  public getReviewDate(): Observable<Date> {
    return this.reviewDates$.asObservable();
  }

  public triggerReviewDate(value: Date): void {
    this.reviewDates$.next(value);
  }
}
