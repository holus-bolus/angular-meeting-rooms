import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpClient: HttpClient) { }

  getImage(image: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`images/${image}`, {responseType: 'blob' as 'json'});
  }

  getIcon(icon: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`icons/${icon}`, {responseType: 'blob' as 'json'});
  }

  post<T>(payload: FormData): Observable<T> {
    return this.httpClient.post<T>(`images`, payload);
  }
}
