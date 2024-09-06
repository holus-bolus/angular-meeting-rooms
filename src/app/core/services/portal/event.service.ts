import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEventRequest } from '@interfaces/event';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public isEventPublished$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  public getAll<T>(params: IEventRequest): Observable<T> {
    return this.httpClient.get<T>(`events`, { params });
  }

  public get<T>(id: string): Observable<T> {
    return this.httpClient.get<T>(`events/${id}`);
  }

  public delete<T>(eventId: string): Observable<T> {
    return this.httpClient.delete<T>(`events/${eventId}`);
  }

  public post<T>(payload: FormData): Observable<T> {
    return this.httpClient.post<T>('events', payload);
  }

  public put<T>(id: string, payload: FormData): Observable<T> {
    return this.httpClient.put<T>(`events/${id}`, payload);
  }

  public joinEvent(id: string): Observable<void> {
    return this.httpClient.post<void>(`events/${id}/join`, {});
  }

  public leaveEvent(id: string): Observable<void> {
    return this.httpClient.post<void>(`events/${id}/cancel`, {});
  }

  public checkEventPossibilityForJoining(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`events/${id}/check`);
  }

  public getParticipants(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`events/${id}/participants`)
      .pipe(
        mapTo(true)
      );
  }
}
