import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {
  triggerWindowWidth(): Observable<number> {
    return fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth)
      );
  }
}
