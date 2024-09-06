import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorEvent$ = new Subject<string[]>();

  public triggerError(error: string[]): void {
    this.errorEvent$.next(error);
  }

  public getError(): Observable<string[]> {
    return this.errorEvent$.asObservable();
  }
}
