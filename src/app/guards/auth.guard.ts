import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationMockService} from "@services/authentication-mock.service";
import {AuthenticationService} from "@services/authentication.service";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivateChild {

  // constructor(
  //   private authenticationService: AuthenticationService) { }
  //
  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  //   const params = route.queryParams;
  //   if (params.code) {
  //     return this.authenticationService.completeAuthentication(params.code);
  //   }
  //
  //   return this.authenticationService.refreshRoles();
  // }

  constructor(private authenticationMockService: AuthenticationMockService, private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //check if the user is logged in. If true, we redirect the user to the meeting room
    if (this.authenticationMockService.isLoggedIn()) {
      this.router.navigate(['/meeting-rooms/meet-now'])
    }
    return !this.authenticationMockService.isLoggedIn();
  }
}
