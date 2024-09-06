import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OfficeService } from '@services/office.service';
import { catchError, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeDefinedGuard implements CanActivate {
  constructor(
    private officeService: OfficeService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.officeService.getMyOffice$().pipe(
      mapTo(true),
      catchError(() => {
        this.router.navigate(['/set-default-office']);

        return of(false);
      })
    );
  }
}
