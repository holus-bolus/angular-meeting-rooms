import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollPosition = new BehaviorSubject<number>(0);

  public getScrollPosition(): number {
    return this.scrollPosition.getValue();
  }

  public setScrollPosition(positionPx: number): void {
    this.scrollPosition.next(positionPx);
  }

  public clearScrollPosition(): void {
    this.scrollPosition.next(0);
  }

  public triggerScroll(): Observable<boolean> {
    return fromEvent(window, 'scroll')
      .pipe(
        map(() => !!window.pageYOffset),
    );
  }
}
