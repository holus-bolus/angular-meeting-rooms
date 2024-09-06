import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private httpClient: HttpClient) { }

  get<T>(category: string): Observable<T> {
    const url = category
      ? `topics/${category}`
      : 'topics';

    return this.httpClient.get<T>(url);
  }
}
