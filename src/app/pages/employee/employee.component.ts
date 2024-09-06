import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { catchError, filter, pairwise, pluck, switchMap, takeUntil } from 'rxjs/operators';
import { RoutesHistoryService } from '@services/routesHistory.service';
import { forkJoin, of, Subject } from 'rxjs';
import { EmployeeService, NAVS, TAB_KEYS } from '@services/employee.service';
import { IDisplayedTabs, ITabsPermissions } from '@interfaces/employee';
import { CompanyService } from '@services/company.service';
import { IUserDetails } from '@interfaces/authentication';

export interface INav {
  title: string;
  active: boolean;
  key: string;
}

export interface IEmployee {
  tabsPermissions: ITabsPermissions;
  displayedTabs: IDisplayedTabs;
  externalId?: string;
}

enum BUTTON_NAMES {
  EMPLOYEE_LIST = 'Back to employee list',
  ASSESSMENT = 'Back to coordinator\'s cabinet',
}

enum ROUTES {
  EMPLOYEE_LIST = '/employee-list',
  ASSESSMENT = '/assessment'
}

const PREVIOUS_HISTORY_STATE = 1;

@Component({
  selector: 'andteam-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements OnInit, OnDestroy {
  public isShowButton: boolean;
  public navs = [];
  public accountOwnerId: string;
  public hasPermissions: boolean;
  public isLazyTabs = true;
  public buttonName: BUTTON_NAMES;
  public backRoute: ROUTES;
  public currentUser: IUserDetails;

  private currentNavigationId: number;
  private destroy$ = new Subject();
  private tabsPermissions: ITabsPermissions = this.employeeService.getDefaultTabsPermission;
  private employee: IEmployee;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private routersHistoryService: RoutesHistoryService,
    private router: Router,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
  ) { }

  get isCurrentUser(): boolean {
    return this.currentUser.externalId === this.accountOwnerId;
  }

  public ngOnInit(): void {
    this.currentUser = this.activatedRoute.snapshot.data.employee;
    this.setupCurrentNavigationId();
    this.route.paramMap
      .pipe(
        pluck<ParamMap, string>('params', 'id'),
        switchMap((id: string) => forkJoin<ITabsPermissions, IDisplayedTabs>([
          this.employeeService.getTabsDataPermission$(id)
            .pipe(
              catchError(() => of(this.employeeService.getDefaultTabsPermission)),
            ),
          this.employeeService.getTabData$(id),
        ])),
        takeUntil(this.destroy$),
      )
      .subscribe(([tabsPermissions, displayedTabs]) => {
        this.tabsPermissions = { ...tabsPermissions, ...displayedTabs };
        this.employeeService.isShowSalaryTab$.next(this.tabsPermissions.hasFeedback);
        this.employeeService.isShowOneToOneTab$.next(this.tabsPermissions.hasOneToOne);
        this.employeeService.isShowCoordinatesTab$.next(this.tabsPermissions.hasCoordinate);
        this.employeeService.isShowVacationTab$.next(this.tabsPermissions.hasVacationPlan && this.companyService.showVacation);
        this.employeeService.isShowCertificateTab$.next(this.tabsPermissions.hasCertificates);
        this.employeeService.isShowFeedbackOnProjectTab$.next(this.tabsPermissions.haveAccessToProjectFeedback);
        this.employee = {
          tabsPermissions,
          displayedTabs,
        };
        this.checkPermissions();
        this.changeDetectorRef.markForCheck();
      });

    this.router.events
      .pipe(
        filter(routerEvent => routerEvent instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.checkPermissions();
        this.changeDetectorRef.markForCheck();
      });

    this.routersHistoryService.getPaths()
      .pipe(
        pairwise(),
        takeUntil(this.destroy$),
      )
      .subscribe(
        ([previousRoute, currentRoute]) => {
          this.setupButton(previousRoute, currentRoute);
          this.changeDetectorRef.markForCheck();
        },
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSelectTab(tabKey: string): void {
    switch (tabKey) {
      case TAB_KEYS.PERSONAL_INFO:
        this.router.navigate([TAB_KEYS.PERSONAL_INFO], { relativeTo: this.route });
        break;
      case TAB_KEYS.OBJECTIVES:
        this.router.navigate([TAB_KEYS.OBJECTIVES], { relativeTo: this.route });
        break;
      case TAB_KEYS.SALARY_REVIEW:
        this.router.navigate([TAB_KEYS.SALARY_REVIEW], { relativeTo: this.route });
        break;
      case TAB_KEYS.INTERVIEW:
        this.router.navigate([TAB_KEYS.INTERVIEW], { relativeTo: this.route });
        break;
      case TAB_KEYS.FEEDBACK:
        this.router.navigate([TAB_KEYS.FEEDBACK], { relativeTo: this.route });
        break;
      case TAB_KEYS.ONE_TO_ONE:
        this.router.navigate([TAB_KEYS.ONE_TO_ONE], { relativeTo: this.route });
        break;
      case TAB_KEYS.COORDINATES:
        this.router.navigate([TAB_KEYS.COORDINATES], { relativeTo: this.route });
        break;
      case TAB_KEYS.VACATION:
        this.router.navigate([TAB_KEYS.VACATION], { relativeTo: this.route });
        break;
      case TAB_KEYS.CERTIFICATE:
        this.router.navigate([TAB_KEYS.CERTIFICATE], { relativeTo: this.route });
        break;
      case TAB_KEYS.FEEDBACK_ON_PROJECT:
        this.router.navigate([TAB_KEYS.FEEDBACK_ON_PROJECT], { relativeTo: this.route });
        break;
    }
  }

  public goBack(): void {
    if (this.currentNavigationId === 1) {
      this.router.navigate([this.backRoute]);
    } else {
      const { navigationId } = window.history.state;
      const navigationBackQuantity = this.currentNavigationId - navigationId - PREVIOUS_HISTORY_STATE;

      window.history.go(navigationBackQuantity);
    }
  }

  private setupCurrentNavigationId(): void {
    const { navigationId } = window.history.state;

    this.currentNavigationId = navigationId;
  }

  private setupButton(previousRoute: string, currentRoute: string): void {
    this.isShowButton = (previousRoute === 'employee-list' || previousRoute === 'assessment')
      && currentRoute === 'employee';

    if (this.isShowButton) {
      const [buttonName, route] = previousRoute === 'employee-list'
        ? [BUTTON_NAMES.EMPLOYEE_LIST, ROUTES.EMPLOYEE_LIST]
        : [BUTTON_NAMES.ASSESSMENT, ROUTES.ASSESSMENT];

      this.buttonName = buttonName;
      this.backRoute = route;
    }
  }

  private checkPermissions(): void {
    const employee: IEmployee =
      {
        ...this.employee,
        externalId: this.route.snapshot.params.id,
      };
    const activeTabKey = this.getActiveTabKey();

    if (employee) {
      const { tabsPermissions, displayedTabs, externalId } = employee;
      this.accountOwnerId = externalId;
      this.tabsPermissions = { ...tabsPermissions, ...displayedTabs };
      this.hasPermissions = true;
    }

    this.setupNavs(activeTabKey);
  }

  private setupNavs(activeTabKey: string): void {
    this.navs = this.isCurrentUser || this.hasPermissions
      ? this.getNavs()
      : null;

    if (this.navs) {
      this.setNavs(activeTabKey);
    }
  }

  private getNavs(): INav[] {
    const hasDataInTabs = this.tabsPermissions.hasReviews
      || this.tabsPermissions.hasAssessments
      || this.tabsPermissions.hasFeedback
      || this.tabsPermissions.hasOneToOne
      || this.tabsPermissions.hasCoordinate
      || this.tabsPermissions.hasVacationPlan && this.companyService.showVacation
      || this.tabsPermissions.hasCertificates
      || this.tabsPermissions.haveAccessToProjectFeedback && this.isCurrentUser;

    if (!hasDataInTabs) {
      return;
    }

    return NAVS.filter((nav: INav) => {
      switch (nav.key) {
        case TAB_KEYS.SALARY_REVIEW:
          return this.tabsPermissions.hasReviews;
        case TAB_KEYS.INTERVIEW:
          return this.tabsPermissions.hasAssessments;
        case TAB_KEYS.OBJECTIVES:
          return this.tabsPermissions.hasObjectives;
        case TAB_KEYS.FEEDBACK:
          return this.tabsPermissions.hasFeedback;
        case TAB_KEYS.ONE_TO_ONE:
          return this.tabsPermissions.hasOneToOne;
        case TAB_KEYS.COORDINATES:
          return this.tabsPermissions.hasCoordinate;
        case TAB_KEYS.VACATION:
          return this.tabsPermissions.hasVacationPlan && this.companyService.showVacation;
        case TAB_KEYS.CERTIFICATE:
          return this.tabsPermissions.hasCertificates;
        case TAB_KEYS.FEEDBACK_ON_PROJECT:
          return this.tabsPermissions.haveAccessToProjectFeedback && this.isCurrentUser;
        default:
          return true;
      }
    });
  }

  private getActiveTabKey(): string {
    const urlSegments = this.router.routerState.snapshot.url.split('/');

    return this.routersHistoryService.getPath(urlSegments);
  }

  private setNavs(activeTabKey: string): void {
    this.navs = this.navs.map(nav => ({ ...nav, active: nav.key === activeTabKey }));
  }
}
