import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRequestEmployeeParams } from '@interfaces/employee';
import { IPayload } from '@interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public isNewsPublished$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  public getAll<T>(params: IRequestEmployeeParams): Observable<T> {
    return this.httpClient.get<T>(`news`, { params });
  }

  public get<T>(id: string): Observable<T> {
    return this.httpClient.get<T>(`news/${id}`);
  }

  public delete<T>(id: string): Observable<T> {
    return this.httpClient.delete<T>(`news/${id}`);
  }

  public post<T>(payload: IPayload): Observable<T> {
    return this.httpClient.post<T>('news', payload);
  }

  public put<T>(id: string, payload: IPayload): Observable<T> {
    return this.httpClient.put<T>(`news/${id}`, payload);
  }
}
