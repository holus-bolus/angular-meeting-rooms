import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  post<T>(payload: FormData): Observable<T> {
    return this.httpClient.post<T>(`messages`, payload);
  }
}
