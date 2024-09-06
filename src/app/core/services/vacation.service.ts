import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVacationData, IVacationInfo } from '@interfaces/vacation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(private httpClient: HttpClient) { }

  public getVacationInfo$(employeeId: string): Observable<any> {
    return this.httpClient.get<any>(`vacation?empId=${employeeId}`);
  }

  public createVacation(vacationData: any): Observable<any> {
    return this.httpClient.post('vacation', vacationData);
  }

  public updateVacation(vacationData: any): Observable<any> {
    return this.httpClient.put('vacation', vacationData);
  }
}
