import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { CompanyService } from '@services/company.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyDefinedGuard implements CanActivate {
  constructor(
    private companyService: CompanyService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const path = route.data.name;
    switch (path) {
      case 'merch':
        return this.companyService.showMerch;
      case 'planned-vacations':
        return this.companyService.showVacation;
      default:
        return true;
    }
  }
}
