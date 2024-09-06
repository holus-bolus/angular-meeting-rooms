import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';

@Injectable({
  providedIn: 'root',
})
export class ResourceManagerService {
  constructor(private httpClient: HttpClient) {}

  getResourceManagers(): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`filter/resourcemanagers`);
  }
}
