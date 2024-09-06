import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOneToOne, IOneToOnePostData } from '@interfaces/one-to-one';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OneToOneService {
  constructor(private httpClient: HttpClient) { }

  public getOneToOneList$(employeeId: string): Observable<IOneToOne[]> {
    return this.httpClient.get<IOneToOne[]>(`onetoone?employeeId=${employeeId}`);
  }

  public deleteOneToOne(oneToOneId: string): Observable<string> {
    return this.httpClient.delete<string>(`onetoone/${oneToOneId}`);
  }

  public addOneToOne(oneToOnePostData: IOneToOnePostData): Observable<string> {
    return this.httpClient.post<string>('onetoone', oneToOnePostData);
  }

  public updateOneToOne(oneToOneId: string, oneToOnePostData: IOneToOnePostData): Observable<string> {
    return this.httpClient.put<string>(`onetoone/${oneToOneId}`, oneToOnePostData);
  }
}
