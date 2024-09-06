import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewsTag } from '@interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  public allTagsList: INewsTag[];

  constructor(private httpClient: HttpClient) {}

  get<T>(tags?: string[]): Observable<T> {
    const param = tags
      ? { filterTags: tags }
      : {};

    return this.httpClient.get<T>('tags', { params: param });
  }

  getAll<T>(): Observable<T> {
    return this.httpClient.get<T>('tags/all');
  }

  post<T>(tagName: string): Observable<T> {
    const formData = new FormData();

    formData.append('tagName', `${tagName}`);

    return this.httpClient.post<T>('tags/', formData);
  }

  delete<T>(id: string): Observable<T> {
    return this.httpClient.delete<T>(`tags/${id}`);
  }
}
