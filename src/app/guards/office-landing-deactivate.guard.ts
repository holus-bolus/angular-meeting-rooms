import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DefaultOfficeLandingComponent } from '@pages/office-select/default-office-landing/default-office-landing.component';
import { OfficeService } from '@services/office.service';
import { mapTo, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OfficeLandingDeactivateGuard implements CanDeactivate<DefaultOfficeLandingComponent> {
  constructor(private service: OfficeService) { }

  canDeactivate(
        component: DefaultOfficeLandingComponent
    ): Observable<boolean> | boolean {
    if (component.selectedOffice) {
      return this.service.getMyOffice$().pipe(
                mapTo(true),
                catchError(err => of(false))
            );
    }

    return false;
  }
}
