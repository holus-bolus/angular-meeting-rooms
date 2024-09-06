import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISalaryInvoiceData } from '@interfaces/salary-invoice.interface';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SalaryInvoiceService {
  public hasAccess$: Observable<boolean>;
  private readonly url = 'salaryinvoice';

  constructor(private httpClient: HttpClient) {
  }

  public postSalaryInvoice$(salaryInvoicePostData: ISalaryInvoiceData): Observable<string> {
    return this.httpClient.post<string>(this.url, salaryInvoicePostData);
  }

  public checkAccess$(): Observable<boolean> {
    if (!this.hasAccess$) {
      this.hasAccess$ = this.httpClient.get<boolean>(this.url).pipe(
        shareReplay(1),
      );
    }

    return this.hasAccess$;
  }
}
