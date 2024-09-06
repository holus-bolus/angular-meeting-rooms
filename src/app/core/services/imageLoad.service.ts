import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { catchError, delay, share, switchMap, takeUntil, tap } from 'rxjs/operators';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { CacheService } from './cache.service';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class ImageLoadService {

  constructor(private cacheService: CacheService,
              private employeeService: EmployeeService) {}

  getImage(employeeId: string): Observable<string | ArrayBuffer> {
    const image$ = this.employeeService.getPhoto(employeeId)
      .pipe(
        share(),
        switchMap(file => this.readFile(file)),
        tap((image) => {
          const value = { image, lastRead: Date.now() };

          this.cacheService.set(employeeId, value);
        }),
        catchError(() => of(null)),
      );
    const delay$ = of(null).pipe(
      delay(INITIAL_DELAY),
      takeUntil(image$)
    );

    return merge(image$, delay$);
  }

  readFile(file: Blob): Observable<string | ArrayBuffer> {
    return new Observable((observable) => {
      const reader = new FileReader();

      reader.onerror = err => observable.error(err);
      reader.onabort = err => observable.error(err);
      reader.onload = () => observable.next(reader.result);
      reader.onloadend = () => observable.complete();
      reader.readAsDataURL(file);
    });
  }

  readFileAsText(file: Blob): Observable<string | ArrayBuffer> {
    return new Observable((observable) => {
      const reader = new FileReader();

      reader.onerror = err => observable.error(err);
      reader.onabort = err => observable.error(err);
      reader.onload = () => observable.next(reader.result);
      reader.onloadend = () => observable.complete();
      reader.readAsText(file);
    });
  }
}
