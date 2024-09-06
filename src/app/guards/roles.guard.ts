import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { RolesService } from '@services/roles.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RolesGuard implements CanActivate {

  constructor(
    private router: Router,
    private rolesService: RolesService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.rolesService.checkPermissionsByUrl$(route, state)
      .pipe(
        tap((isAllowed) => {
          if (!isAllowed) {
            this.router.navigateByUrl('/403');
          }
        }),
      );
  }
}
