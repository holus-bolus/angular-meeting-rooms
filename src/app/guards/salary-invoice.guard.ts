import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SalaryInvoiceService } from '@services/salary-invoice.service';

@Injectable({ providedIn: 'root' })
export class SalaryInvoiceGuard implements CanActivate {
  constructor(
    private router: Router,
    private salaryInvoiceService: SalaryInvoiceService) {
  }

  canActivate(): Observable<boolean> {
    return this.salaryInvoiceService.hasAccess$
      .pipe(
        tap((isAllowed) => {
          if (!isAllowed) {
            this.router.navigateByUrl('/403');
          }
        }),
    );
  }
}
