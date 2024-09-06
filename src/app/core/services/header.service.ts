import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private scrollableHeader = new BehaviorSubject<boolean>(false);
  private fragment = new BehaviorSubject<string>('');

  public triggerScrollableHeader(scrollableHeader: boolean): void {
    this.scrollableHeader.next(scrollableHeader);
  }

  public getScrollableHeader(): Observable<boolean> {
    return this.scrollableHeader.asObservable();
  }

  public addFragment(fragmentName: string): void {
    this.fragment.next(fragmentName);
  }

  public getFragment(): Observable<string> {
    return this.fragment.asObservable();
  }
}
