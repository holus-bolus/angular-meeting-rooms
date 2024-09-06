import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILikes, ILikesComment } from '@interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpClient: HttpClient) {
  }

  public getLikes(employeeId: string): Observable<ILikes> {
    return this.httpClient.get<ILikes>(`like/${employeeId}`);
  }

  public like(employeeId: string, comment: string): Observable<void> {
    return this.httpClient.post<void>(`like`, { employeeId, comment });
  }

  public getLikesComment(employeeId: string): Observable<ILikesComment[]> {
    return this.httpClient.get<ILikesComment[]>(`like/${employeeId}/getuserlikecomments`);
  }
}
