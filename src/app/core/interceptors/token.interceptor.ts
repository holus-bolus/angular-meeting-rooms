import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationMockService} from 'src/app/core/services/authentication-mock.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthenticationMockService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //check if the token is available and attach a token to the request
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    //catch error
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {

        return this.handle401Error(request, next);
      } else {

        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      //executing the token refreshing
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      //get the new token
      return this.authService.getRefreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          //emit a new token through the behaviour subject
          this.refreshTokenSubject.next(token.jwt);
          //continue with the request that initialized the handle401Error method
          return next.handle(this.addToken(request, token.jwt));
        }));
    } else {
      //blocking and releasing all queries which we put on hold until the token is invalid
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
