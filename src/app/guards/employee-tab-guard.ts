import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { ITabsPermissions, IDisplayedTabs } from '@interfaces/employee';
import { EmployeeService, TAB_KEYS } from '@services/employee.service';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EmployeeTabGuard implements CanActivateChild {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const [, , id, tab] = state.url.split('/');

    return forkJoin<ITabsPermissions, IDisplayedTabs>([
      this.employeeService.getTabsDataPermission$(id)
          .pipe(
            catchError(() => of(this.employeeService.getDefaultTabsPermission))
          ),
      this.employeeService.getTabData$(id),
    ])
      .pipe(
        map(([tabsPermissions, displayedTabs]: [ITabsPermissions, IDisplayedTabs]) => {
          const check = this.checkPermissions(tabsPermissions, displayedTabs, tab);

          if (check) {
            return check;
          }

          this.router.navigate(['/403']);
        })
      );
  }

  private checkPermissions(tabsPermissions: ITabsPermissions, displayedTabs: IDisplayedTabs, tab: string): boolean {
    const permissions = { ...tabsPermissions, ...displayedTabs };

    switch (tab) {
      case TAB_KEYS.SALARY_REVIEW:
        return permissions.hasReviews;
      case TAB_KEYS.INTERVIEW:
        return permissions.hasAssessments;
      case TAB_KEYS.OBJECTIVES:
        return permissions.hasObjectives;
      case TAB_KEYS.FEEDBACK:
        return permissions.hasFeedback;
      case TAB_KEYS.ONE_TO_ONE:
        return permissions.hasOneToOne;
      case TAB_KEYS.COORDINATES:
        return permissions.hasCoordinate;
      case TAB_KEYS.VACATION:
        return permissions.hasVacationPlan;
      case TAB_KEYS.FEEDBACK_ON_PROJECT:
        return permissions.haveAccessToProjectFeedback;
      default:
        return true;
    }
  }
}
