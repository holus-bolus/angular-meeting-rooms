import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {config, Observable, of} from "rxjs";
import {catchError, mapTo, tap} from "rxjs/operators";
import {Tokens} from "js-tokens";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationMockService {

  private readonly JWT_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvLnVzdGlub3ZAYW5kZXJzZW5sYWIuY29tIiwiaXNSZWZyZXNoIjpmYWxzZSwiaWF0IjoxNjc4ODkzNzQzLCJleHAiOjE2Nzk0OTg1NDN9.2Y6d2TslC-Bs31XCiQBvPiFMebnP7H9_8zVFJO4uD33m-pdJH_CdQwet9NP9G-x0RZomhiGFAM6e17WcpVEtgQ';
  private readonly REFRESH_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvLnVzdGlub3ZAYW5kZXJzZW5sYWIuY29tIiwiaXNSZWZyZXNoIjp0cnVlLCJpYXQiOjE2Nzg4OTM3NDMsImV4cCI6MTY3ODk4MDE0M30.cetGTRhE1U4ZTZmeJXn0-AjW1bnYzxUVbV2iaF6wEacEBPSiwfOcWTw3oYBlfdmexl2VOZ56w0tDk6BEzgx2dw';
  private loggedUser: string;

  constructor(private httpClient: HttpClient) {
  }

//http call to the backend api with user credentials
  login(user: { username: string, password: string }): Observable<boolean> {
    //post method with the user credentials
    return this.httpClient.post<any>(`${config}/login`, user, {withCredentials: true})
      .pipe(
        //take the value from the stream and apply the method doLogin
        tap(tokens => {
          this.doLoginUser(user.username, tokens);
        }),
        //if successful
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        })
      )
  }

  logout() {
    return this.httpClient.post<any>(`account/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => {
        this.doLogoutUser()
      }),
      mapTo(true),
      catchError(error => {
        return of(false)
      })
    )
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  storeTokens(tokens: Tokens): any {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  getRefreshToken() {
    return this.httpClient.post<any>(`{config.apiUrl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeTokens(tokens.jwt);
    }))
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
