import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of, throwError } from 'rxjs';
import { IOffice } from '@interfaces/office';
import { distinctUntilChanged, take, tap, catchError, switchMap } from 'rxjs/operators';
import { officeMock } from '../../mock/officeMock';
import { TimeService } from './portal/time.service';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  private myOfficeStream$: ReplaySubject<IOffice>;
  private myOffice$: Observable<IOffice> = of(officeMock);

  constructor(
    private httpClient: HttpClient,
    private timeService: TimeService
  ) {}

  public getMyOffice$(): Observable<IOffice> {
    if (this.myOffice$) {
      return this.myOffice$;
    }

    return this.httpClient.get<IOffice>(`offices/myoffice`).pipe(
      this.connectToMyOfficeStream(),
      tap(({ timeZone }) => this.timeService.setTimeZone(timeZone)),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  public getAll<T>(): Observable<T> {
    return this.httpClient.get<T>('offices');
  }

  public setCurrentOffice(id: string): Observable<IOffice> {
    return this.httpClient.put<IOffice>('offices/updateuseroffice', null, { params: { newOfficeId: id } })
      .pipe(
        this.connectToMyOfficeStream(),
        tap(({ timeZone }) => this.timeService.setTimeZone(timeZone)),
      );
  }

  private connectToMyOfficeStream(): (source: Observable<IOffice>) => Observable<IOffice> {
    return (source: Observable<IOffice>) => source
      .pipe(
        take(1),
        switchMap((office) => {
          if (!this.myOfficeStream$) {
            this.myOfficeStream$ = new ReplaySubject<IOffice>(1);
            this.myOffice$ = this.myOfficeStream$.asObservable().pipe(
              distinctUntilChanged()
            );
          }
          this.myOfficeStream$.next(office);

          return this.myOffice$;
        }),
      );
  }
}
