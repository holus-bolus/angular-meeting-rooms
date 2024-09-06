import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IUserDetails } from '@interfaces/authentication';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeResolve implements Resolve<IUserDetails> {

  constructor(private userService: UserService) { }

  public resolve(): Observable<IUserDetails> {
    return this.userService.getUserInfo$();
  }
}
