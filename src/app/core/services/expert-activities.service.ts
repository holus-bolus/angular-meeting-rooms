import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IActivities,
  IActivitiesParams,
  IActivitiesResponse, IActivity
} from '@interfaces/expert-activities.interface';

@Injectable()
export class ExpertActivitiesService {
  public userId = new BehaviorSubject('');

  constructor(
    private httpClient: HttpClient
  ) { }

  public getExpertActivities(params: IActivitiesParams): Observable<IActivitiesResponse> {
    return this.httpClient.get<IActivitiesResponse>('expertactivities', { params });
  }

  public getEmployeeExpertActivities(employeeId: string): Observable<IActivity[]> {
    return this.httpClient.get<IActivity[]>(`expertactivities/${employeeId}`);
  }

  public updateEmployeeExpertActivity(employeeId: string, expertActivityId: string, dueDate: string): any {
    return this.httpClient.post('expertactivities/update', { employeeId, expertActivityId, dueDate });
  }

  public getFilteredList(params: IActivitiesParams): Observable<string[]> {
    return this.httpClient.get<string[]>(`expertactivities/filter/employeepreviews`, { params });
  }

  public getListOfActivities(): Observable<any> {
    return this.httpClient.get('expertactivities/getlistofactivities');
  }

  public updateExpertActivities(expertActivities: string[], employeeId: string): Observable<boolean> {
    return this.httpClient.post<boolean>('expertactivities/update', { employeeId, expertActivities });
  }

  public updateActivities(userId: string): void {
    this.userId.next(userId);
  }
}
