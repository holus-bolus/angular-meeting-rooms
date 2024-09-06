import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IObjective, IUserObjectives } from '@interfaces/objective';
import { catchError } from 'rxjs/operators';
import { AssessmentService } from './assessments/assessment.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectivesService {
  private readonly controllerName = 'objectives';

  constructor(private httpClient: HttpClient,
              private assessmentService: AssessmentService) { }

  public getObjectives$(employeeId: string): Observable<IUserObjectives> {
    return this.httpClient.get<IUserObjectives>(`${this.controllerName}?employeeId=${employeeId}`)
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        }),
      );
  }

  public createObjective(newObjective: IObjective): Observable<string> {
    return this.httpClient.post<string>(`${this.controllerName}`, newObjective)
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        }),
      );
  }

  public updateObjective(objectiveId: string, updatedData: IObjective): Observable<string> {
    return this.httpClient.put<string>(`${this.controllerName}/${objectiveId}`, updatedData)
      .pipe(
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return throwError(null);
        })
      );
  }
}
