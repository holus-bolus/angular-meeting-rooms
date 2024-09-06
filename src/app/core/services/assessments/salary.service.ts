import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISalaryPayload, ISalaryPayloadComment } from '@interfaces/candidate';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AssessmentService } from './assessment.service';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private httpClient: HttpClient,
              private assessmentService: AssessmentService) { }

  updateSalary(id: string, salary: ISalaryPayload | ISalaryPayloadComment): Observable<void> {
    return this.httpClient.post<void>(`reviews/${id}/updateSalaryComment`, salary)
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }
}
