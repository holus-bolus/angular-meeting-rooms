import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  navigationId = new BehaviorSubject<number>(window.history.state);

  public triggerNavigationId(navigationId: number): void {
    this.navigationId.next(navigationId);
  }
}
