import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICancelEvent } from '@interfaces/assessment';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private currentTab$ = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  public getTab(): Observable<string> {
    return this.currentTab$.asObservable();
  }

  public setTab(tab: string): void {
    this.currentTab$.next(tab);
  }

  public cancelInterview(reviewId: string, cancelPayload: ICancelEvent): Observable<void> {
    return this.httpClient.post<void>(`reviews/${reviewId}/cancel`, cancelPayload);
  }

  public addToConsideration(reviewId: string): Observable<void> {
    return this.httpClient.post<void>(`reviews/${reviewId}/confirm`, reviewId);
  }
}
