import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  IEmployeeVacationPlan,
  IPlannedVacationsInfo,
  IVacationApprovers,
  IPlannedVacationsPostData,
  IUpdateVacationPlanPostData,
  IApproverVacationsPlan,
  IPlannedVacationDecline
} from '@interfaces/planned-vacations';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PlannedVacationsService {

  constructor(private httpClient: HttpClient) { }

  public getPlannedVacationsInfo$(employeeId: string): Observable<IPlannedVacationsInfo> {
    return this.httpClient.get<IPlannedVacationsInfo>(`vacationPlans/vacationInfo?employeeId=${employeeId}`);
  }

  public getAvailableMonths$(vacationId?: string): Observable<string[]> {
    const queryParams = vacationId ? { vacationId } : {};

    return this.httpClient.get<string[]>(`vacationPlans/availableMonths`, { params: queryParams })
      .pipe(
      catchError(() => of(null))
    );
  }

  public getVacationApprovers$(): Observable<IVacationApprovers> {
    return this.httpClient.get<IVacationApprovers>('vacationPlans/myApprovers')
      .pipe(
      catchError(() => of(null))
    );
  }

  public getEmployeeVacationPlan$(employeeId: string): Observable<IEmployeeVacationPlan[]> {
    return this.httpClient.get<IEmployeeVacationPlan[]>(`vacationPlans/myVacationPlan?employeeId=${employeeId}`)
      .pipe(
        catchError(() => of(null))
      );
  }

  public addVacationPlan(employeeVacationPlanPostData: IPlannedVacationsPostData): Observable<string> {
    const formData = new FormData();

    formData.append('part1', `${employeeVacationPlanPostData.part1}`);
    formData.append('part2', `${employeeVacationPlanPostData.part2}`);
    for (let i = 0; i < employeeVacationPlanPostData.approvers.length; i++) {
      formData.append(`approvers[${i}]`, `${employeeVacationPlanPostData.approvers[i]}`);
    }

    return this.httpClient.post<string>('vacationPlans', formData);
  }

  public updatePlannedVacation(vacationId: string, vacationPlanPostData: IUpdateVacationPlanPostData): Observable<string> {
    const formData = new FormData();

    formData.append('month', `${vacationPlanPostData.month}`);
    if (vacationPlanPostData.approvers.length) {
      for (let i = 0; i < vacationPlanPostData.approvers.length; i++) {
        formData.append(`approvers[${i}]`, `${vacationPlanPostData.approvers[i]}`);
      }
    }

    return this.httpClient.put<string>(`vacationPlans/${vacationId}`, formData);
  }

  public getApproverPlannedVacations$(queryParams: {
    employeeId: string,
    projectId?: string,
    outOfPlan?: string,
    status?: string,
    page: string,
    pageSize: string
  }): Observable<IApproverVacationsPlan> {
    return this.httpClient.get<IApproverVacationsPlan>(`vacationPlans`, { params: queryParams })
      .pipe(
        catchError(() => of(null))
      );
  }

  public approvePlannedVacation(id: string): Observable<string> {
    return this.httpClient.post<string>(`vacationPlans/${id}/approve`, {});
  }

  public declinePlannedVacation(data: IPlannedVacationDecline): Observable<string> {
    const body = `"${data.message}"`;

    return this.httpClient.post<string>(`vacationPlans/${ data.plannedVacationId }/decline`, body,
                                        { headers: { 'content-type': 'application/json-patch+json' } });
  }
}
