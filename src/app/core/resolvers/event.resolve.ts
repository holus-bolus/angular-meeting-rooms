import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { IEvent } from '@interfaces/event';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from '@services/portal/event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolve implements Resolve<IEvent> {

  constructor(private router: Router,
              private eventService: EventService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<IEvent> {
    const eventId = route.paramMap.get('id');

    if (eventId) {
      return this.eventService.get(eventId).pipe(
        catchError(() => {
          this.router.navigate(['/404']);

          return of(null);
        })
      );
    }
  }
}
