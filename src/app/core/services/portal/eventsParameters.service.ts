import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEventRequest } from '@interfaces/event';
import { IEventsFilters } from '@pages/main/main-events-filter/main-events-filter.component';

@Injectable({
  providedIn: 'root'
})
export class EventsParametersService {
  private requestParameters = new BehaviorSubject<IEventRequest>(
    { page: '1', pageSize: '5', offices: '', dates: '', search: '', topics: '' }
    );
  private filtersParameters = new BehaviorSubject<IEventsFilters>(
    { offices: [], topics: [], dates: [], search: '', current: true }
    );

  public patchFiltersParameters(parameters: IEventsFilters): void {
    const patchedParameters = { ...this.filtersParameters.getValue(), ...parameters };
    this.filtersParameters.next(patchedParameters);
  }

  public getFiltersParameters(): Observable<IEventsFilters> {
    return this.filtersParameters.asObservable();
  }

  public patchRequestParameters(parameters: IEventRequest): void {
    const patchedParameters = { ...this.requestParameters.getValue(), ...parameters };
    this.requestParameters.next(patchedParameters);
  }

  public getRequestParameters(): Observable<IEventRequest> {
    return this.requestParameters.asObservable();
  }
}
