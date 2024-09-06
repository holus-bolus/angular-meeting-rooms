import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICoordinates, ISuperiorRmSubordinate, ICoordinatesDropList } from '@interfaces/coordinates';

@Injectable()
export class CoordinatesService {
  constructor(private httpClient: HttpClient) { }

  public getCoordinatesList$(employeeId: string): Observable<ICoordinates[]> {
    return this.httpClient.get<ICoordinates[]>(`coordinates?employeeId=${employeeId}`);
  }

  getRmSubordinatesList$(superiorRMId: string): Observable<ISuperiorRmSubordinate[]> {
    return this.httpClient.get<ISuperiorRmSubordinate[]>(`filter/resourcemanagersubordinates?superiorRMId=${superiorRMId}`);
  }

  public getCoordinatesDropList$(): Observable<ICoordinatesDropList> {
    return this.httpClient.get<ICoordinatesDropList>(`coordinates/columns`);
  }

  public setCoordinatesDropList(coordinateName: string, coordinateValue: boolean): Observable<ICoordinatesDropList> {
    const formData = new FormData();

    formData.append(coordinateName, `${coordinateValue}`);

    return this.httpClient.put<ICoordinatesDropList>(`coordinates/columns`, formData);
  }
}
