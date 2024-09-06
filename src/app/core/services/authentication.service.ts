import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';
import { PersistenceStorageService } from './persistenceStorage.service';
import { AUTH } from '@constants/auth';
import { Router, UrlTree } from '@angular/router';
import { RolesService } from './roles.service';
import { UserService } from './user.service';
import { IUserDetails } from '@interfaces/authentication';

const CALLBACK_URL = window.location.origin;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private persistenceStorageService: PersistenceStorageService,
    private router: Router,
    private rolesService: RolesService,
    private userService: UserService,
  ) {
  }

  public readManual(isRead: boolean): Observable<void> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json-patch+json',
      accept: 'text/plain'
    });
    const options = {
      headers: httpHeaders
    };

    return this.httpClient.post<void>(`account/feedback-tip-read`, isRead, options);
  }

  public refreshRoles(): Observable<boolean> {
    return this.userService.getUserInfo$()
      .pipe(
        tap((result: IUserDetails) => {
          const { roles } = result;
          this.rolesService.addRoles$(roles);
        }),
        mapTo(true)
      );
  }

  public logout(): Observable<void> {
    this.persistenceStorageService.remove('urlRoute');

    return this.httpClient.post<void>(`account/logout`, {})
      .pipe(
        tap(() =>  window.location.href = `${AUTH}/account/logout`)
      );
  }

  public completeAuthentication(code: string): Observable<UrlTree> {
    const redirectUrl = this.persistenceStorageService.get('urlRoute');

    this.persistenceStorageService.remove('urlRoute');

    const resultTree = this.router.parseUrl(redirectUrl);

    return this.obtainCookie(code)
      .pipe(
        tap(_ => this.refreshRoles()),
        mapTo(resultTree)
      );
  }

  public authenticate(urlRoute: string, urlError: string): void {
    this.persistenceStorageService.set('urlRoute', urlRoute);
    window.location.href = urlError;
  }

  private obtainCookie(code: string): Observable<any> {
    const model = {
      code,
      redirectUri: CALLBACK_URL
    };

    return this.httpClient.post('account/authentication', model);
  }
}
