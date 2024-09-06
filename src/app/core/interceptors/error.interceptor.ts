import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, delay, retryWhen, flatMap } from 'rxjs/operators';
import { ERROR_CODES } from '@constants/errors';
import { AuthenticationService } from '@services/authentication.service';
import { ErrorService } from '@services/error.service';
import { Location } from '@angular/common';

const SERVER_ERROR_MESSAGE = 'Server Error. Please try later.';
const BUSINESS_ERRORS_CODES = [400, 403, 404, 422];

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private location: Location,
    private errorService: ErrorService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retryWhen((errors) => {
          let retryCounter = 0;

          return errors.pipe(
            flatMap((error: any) => {
              if (retryCounter++ < 2 && error.status === 505) {
                return of(error.status).pipe(delay(500));
              }

              if (error.status === 505) {
                return throwError({ ...error, status: 401 });
              }

              return throwError(error);
            })
          );
        }),
        catchError((error) => {
          const urlForDirect = error.headers.get('loginpath');

          if (error.status === 401) {
            this.authenticationService.authenticate(this.location.path(), urlForDirect);
          } else if (this.hasBusinessErrors(error)) {
            return throwError(error.error);
          } else if (this.has1cError(error)) {
            this.errorService.triggerError([error.error.message]);
          } else {
            this.errorService.triggerError([SERVER_ERROR_MESSAGE]);
          }

          return of(null);
        })
      );
  }

  private hasBusinessErrors({ status, error: { code } }: HttpErrorResponse): boolean {
    return status === 500 && code === ERROR_CODES.RESOURCE_LOCKED_EXCEPTION
      || BUSINESS_ERRORS_CODES.some(errorCode => errorCode === status);
  }

  private has1cError({ status, error: { code } }: HttpErrorResponse): boolean {
    return status === 500 && code === ERROR_CODES.USER_FRIENDLY_MESSAGE;
  }
}
