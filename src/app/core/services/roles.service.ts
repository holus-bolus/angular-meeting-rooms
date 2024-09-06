import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { ITabsPermissions, Roles } from '@interfaces/employee';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';
import { RoutesHistoryService } from './routesHistory.service';
import { UserService } from './user.service';
import { ERROR_CODES } from '@constants/errors';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private roles = new BehaviorSubject<Roles[]>([]);
  private deniedPermissionsByUrl = {
    'employee-list': [
      Roles.ADMIN, Roles.HR, Roles.SUPERVISOR, Roles.ASSESSMENT_COORDINATOR, Roles.PM, Roles.MANAGER, Roles.RM
    ],
    'add-news': [Roles.CONTENT_MANAGER, Roles.ADMIN],
    'edit-news': [Roles.CONTENT_MANAGER, Roles.ADMIN],
    'add-event': [Roles.HR, Roles.ADMIN],
    'edit-event': [Roles.HR, Roles.ADMIN],
    employee: [
      Roles.SUPERVISOR,
      Roles.ASSESSMENT_COORDINATOR,
      Roles.RM,
      Roles.HR,
      Roles.MANAGER,
      Roles.AHR,
      Roles.headOfAHR,
      Roles.headOfSales
    ],
    assessment: [Roles.ASSESSMENT_COORDINATOR],
    'expert-activities': [
      Roles.adminOfActivities,
      Roles.headOfExperts,
      Roles.RM,
      Roles.SUPERVISOR,
      Roles.MANAGER,
    ]
  };

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    private routesHistoryService: RoutesHistoryService) { }

  public getRoles$(): Observable<Roles[]> {
    return this.roles.asObservable();
  }

  public addRoles$(roles: Roles[]): void {
    this.roles.next(roles);
  }

  public isAdmin$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.ADMIN)));
  }

  public isAssessmentCoordinator$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.ASSESSMENT_COORDINATOR)));
  }

  public isContentManager$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.CONTENT_MANAGER)));
  }

  public isHr$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.HR)));
  }

  public isAHr$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.AHR)));
  }

  public isHeadOfAHr$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.headOfAHR)));
  }

  public isManager$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.MANAGER)));
  }

  public isPm$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.PM)));
  }

  public isRm$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.RM)));
  }

  public isSupervisor$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.SUPERVISOR)));
  }

  public isHeadOfSales$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.headOfSales)));
  }

  public isAdminOfActivities$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.adminOfActivities)));
  }

  public isHeadOfExperts$(): Observable<boolean> {
    return this.getRoles$().pipe(map(roles => roles.some(role => role === Roles.headOfExperts)));
  }

  public isNotEmployee$(): Observable<boolean> {
    return combineLatest([
      this.isHr$(), this.isAdmin$(), this.isAssessmentCoordinator$(), this.isPm$(), this.isSupervisor$(),
      this.isManager$(), this.isRm$(), this.isAHr$(), this.isHeadOfAHr$()
    ])
      .pipe(map(roles => roles.some(role => role)));
  }

  public isAdminHr$(): Observable<boolean> {
    return combineLatest([this.isHr$(), this.isAdmin$()])
      .pipe(map(roles => roles.some(role => role)));
  }

  public isAdminContentManager$(): Observable<boolean> {
    return combineLatest([this.isContentManager$(), this.isAdmin$()])
      .pipe(map(roles => roles.some(role => role)));
  }

  public isAdminHrContentManager$(): Observable<boolean> {
    return combineLatest([this.isHr$(), this.isContentManager$(), this.isAdmin$()])
      .pipe(map(roles => roles.some(role => role)));
  }

  public isSupervisorHrAssessmentCoordinator$(): Observable<boolean> {
    return combineLatest([this.isSupervisor$(), this.isHr$(), this.isAssessmentCoordinator$()])
      .pipe(map(roles => roles.some(role => role)));
  }


  public isSupervisorAssessmentCoordinatorManagerRm$(): Observable<boolean> {
    return combineLatest([this.isSupervisor$(), this.isAssessmentCoordinator$(), this.isManager$(), this.isRm$()])
      .pipe(map(roles => roles.some(role => role)));
  }

  public checkPermissionsByUrl$(route: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Observable<boolean> {
    const path = route.data.name;
    const permissions = this.deniedPermissionsByUrl[path];

    if (!permissions) {
      return of(true);
    }

    return this.getRoles$().pipe(
      first(),
      switchMap((roles) => {
        const hasPermissionByRoles = this.hasPermissionByRoles(roles, permissions);

        if (path === 'employee') {
          return this.hasEmployeePermission$(route, url, hasPermissionByRoles);
        }

        return of(hasPermissionByRoles);
      }),
    );
  }

  private hasPermissionByRoles(roles: string[], permissions: string[]): boolean {
    return roles.some(role => permissions.includes(role));
  }

  private hasEmployeePermission$(route: ActivatedRouteSnapshot, url: string, hasPermissionByRoles: boolean): Observable<boolean> {
    const employeeId = route.firstChild.paramMap.get('id');
    const urlSegments = url.split('/');
    const childPath = this.routesHistoryService.getPath(urlSegments);

    return childPath === 'personal-info'
      ? of(true)
      : forkJoin([
        this.userService.getUserInfo$(),
        this.employeeService.getTabsDataPermission$(employeeId),
      ])
        .pipe(
          map(([{ externalId }, tabs]) => {
            return (employeeId === externalId || hasPermissionByRoles) && this.hasDataInTab(childPath, tabs);
          }),
          catchError(({ code }) => {
            if (code === ERROR_CODES.ACCESS_DENIED) {
              return of(null);
            }
          }),
        );
  }

  private hasDataInTab(childPath: string, tabsPermissions: ITabsPermissions): boolean {
    if (childPath === 'salary-review') {
      return tabsPermissions.hasReviews;
    }

    if (childPath === 'interview') {
      return tabsPermissions.hasAssessments;
    }

    return true;
  }
}
