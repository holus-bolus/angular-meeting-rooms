import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserDetails } from '@interfaces/authentication';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IAccountSettings } from '@interfaces/employee';
import { userMock } from 'src/app/mock/userMock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfo$: Observable<IUserDetails>;

  constructor(
    private httpClient: HttpClient) {
  }

  public getUserInfo$(): Observable<IUserDetails> {
    if (!this.userInfo$) {
      this.userInfo$ = this.httpClient.get<IUserDetails>('account/userinfo').pipe(
        shareReplay(1),
      );
    }

    return this.userInfo$;
  }

  public setHiddensBirthdayAndPhone<T>(payload: IAccountSettings): Observable<T> {
    return this.httpClient.put<T>('account/birthday-private', payload);
  }
}
