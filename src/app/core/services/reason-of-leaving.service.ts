import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';

@Injectable({
  providedIn: 'root'
})
export class ReasonOfLeavingService {
  constructor(private httpClient: HttpClient) { }

  public getReasons(): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>('filter/reasonsforleaving');
  }
}
