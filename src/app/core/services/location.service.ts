import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';
import { map } from 'rxjs/operators';
import { ILocation } from '@interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  getLocations(): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`filter/locations`).pipe(
      map((locations: ICommonOption[]) => locations.filter((option: ICommonOption) => option.name))
    );
  }

  getCurrentLocation(): Observable<ILocation> {
    return this.httpClient.get<ILocation>(`location/getcurrentuserlocation`);
  }

  getCountry(countryName: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`location/countrysearch?str=${countryName}`);
  }

  getCity(cityName: string, countryId: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`location/citysearch?str=${cityName}&countryId=${countryId}`);
  }

  getAllCityByCountryId(id: string): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>(`location/citiesgetbycountryidall?id=${id}`);
  }

  getAllCountries(): Observable<ICommonOption[]> {
    return this.httpClient.get<ICommonOption[]>('location/countryall');
  }

  updateLocation(cityId: string, cityName: string): any {
    const body = {
      id: cityId,
      name: cityName,
    };

    return this.httpClient.put(`location/updatecurrentuserlocation?cityId=${cityId}`, body);
  }
}
