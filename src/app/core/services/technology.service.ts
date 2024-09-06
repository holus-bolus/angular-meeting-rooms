import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';
import { ITechnologyLevel } from '@interfaces/technology-levels';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private httpClient: HttpClient) { }

  getTechnologies(): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`filter/technologies`);
  }

  getTechnologyLevels(): Observable<ITechnologyLevel[]> {
    return this.httpClient.get<ITechnologyLevel[]>(`filter/technologylevels`);
  }
}
