import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  TemplateRef,
  ViewChild,
  AfterContentChecked,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ADD_EVENT_ROUTE_NAME, ADD_NEWS_ROUTE_NAME } from '@constants/routes-name';
import { RolesService } from '@services/roles.service';
import { HeaderTypes } from '@andkit/components/other/header/header';
import { AuthenticationService } from '@services/authentication.service';
import { ScrollService } from '@services/scroll.service';
import { CompanyService } from '@services/company.service';
import { SalaryInvoiceService } from '@services/salary-invoice.service';
import { FeedbackService } from '@services/feedback.service';

import burgerSvg from '!!raw-loader!@assets/images/burger.svg';

const enum MenuType {
  BURGER = 'burger'
}

@Component({
  selector: 'andteam-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, AfterContentChecked, OnDestroy {

  get isPortalHeader(): boolean {
    return this.headerType === this.headerTypes.Portal;
  }

  @ViewChild('burgerIconMenu', { static: true }) burgerIconMenu: TemplateRef<void>;

  @Input() username: string;
  @Input() externalId: string;
  @Input() headerType: string;
  @Input() isScrollableHeader: boolean;
  // @Input() meetingRoomUrl: SafeResourceUrl; // no need, we use a separate route for rooms
  @Input() isShowMettingRoom: boolean;
  @Input() isAssessmentCoordinator: boolean;

  @Output() navigatePath = new EventEmitter<string>();
  @Output() openProblemModal = new EventEmitter<boolean>();

  public isOpenList = false;
  public isOpen = true;
  public burgerIcon: SafeHtml;
  public headerTypes = HeaderTypes;
  public isBurgerMenuActive$: Observable<boolean>;
  public dropDownMenuConfig: Record<MenuType, TemplateRef<void>>;
  public currentMenuTemplate$: Observable<TemplateRef<void>>;
  public destroy$ = new Subject();
  public isShowMerch: boolean;
  public isShowEmployeeList$: Observable<boolean>;
  public isShowExternalResources$: Observable<boolean>;
  public isAdmin$: Observable<boolean>;
  public isHr$: Observable<boolean>;
  public isContentManager$: Observable<boolean>;
  public isAdminOfActivities$: Observable<boolean>;
  public isHeadOfExperts$: Observable<boolean>;
  public isRm$: Observable<boolean>;
  public isManager$: Observable<boolean>;
  public isSupervisor$: Observable<boolean>;
  public hasSalaryInvoice$: Observable<boolean>;
  public hasFop$: Observable<boolean>;
  public addEventRouteName = ADD_EVENT_ROUTE_NAME;
  public addNewsRouteName = ADD_NEWS_ROUTE_NAME;

  private currentMenuType = new BehaviorSubject<MenuType>(null);

  get isExpertActivities$(): Observable<boolean> {
    return this.isVisibleOption$(
      [this.isHeadOfExperts$, this.isAdminOfActivities$, this.isRm$, this.isManager$, this.isSupervisor$]
    );
  }

  get isAddEvent$(): Observable<boolean> {
    return this.isVisibleOption$([this.isHr$, this.isAdmin$]);
  }

  get isAddNews$(): Observable<boolean> {
    return this.isVisibleOption$([this.isContentManager$, this.isAdmin$]);
  }

  get isPartition$(): Observable<boolean> {
    return this.isVisibleOption$([this.isHr$, this.isAdmin$, this.isContentManager$]);
  }

  constructor(
    private sanitizer: DomSanitizer,
    private rolesService: RolesService,
    private scrollService: ScrollService,
    private authService: AuthenticationService,
    public companyService: CompanyService,
    private salaryInvoiceService: SalaryInvoiceService,
    private feedbackService: FeedbackService,
  ) {}

  public ngOnInit(): void {
    this.burgerIcon = this.sanitizer.bypassSecurityTrustHtml(burgerSvg as any);
    this.currentMenuTemplate$ = this.getCurrentMenu$();
    this.isBurgerMenuActive$ = this.getIsBurgerActive$();
    this.scrollService.triggerScroll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isOpenList = false;
        this.isOpen = true;
        this.currentMenuType.next(null);
      });
    this.isShowMerch = this.companyService.showMerch;
    this.isShowEmployeeList$ = this.rolesService.isNotEmployee$();
    this.isShowExternalResources$ = this.rolesService.isSupervisor$();
    this.isAdmin$ = this.rolesService.isAdmin$();
    this.isHr$ = this.rolesService.isHr$();
    this.isContentManager$ = this.rolesService.isContentManager$();
    this.isAdminOfActivities$ = this.rolesService.isAdminOfActivities$();
    this.isHeadOfExperts$ = this.rolesService.isHeadOfExperts$();
    this.isRm$ = this.rolesService.isRm$();
    this.isManager$ = this.rolesService.isManager$();
    this.isSupervisor$ = this.rolesService.isSupervisor$();
    this.hasSalaryInvoice$ = this.salaryInvoiceService.checkAccess$();
    this.hasFop$ = this.feedbackService.checkAccessToFopPage$();
  }

  public ngAfterContentChecked(): void {
    this.dropDownMenuConfig = {
      [MenuType.BURGER]: this.burgerIconMenu,
    };
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public isVisibleOption$(roles: Observable<boolean>[]): Observable<boolean> {
    return combineLatest(roles)
      .pipe(
        map((array: boolean[]) => array.some(Boolean)),
      );
  }

  public onBurgerIconClick(isOpen: boolean): void {
    this.processIconClick(isOpen);
    isOpen
      ? this.currentMenuType.next(MenuType.BURGER)
      : this.currentMenuType.next(null);

    this.isOpen = !this.isOpen;
  }

  public onBurgerIconMouseleave(): void {
    this.isOpen = true;
  }

  public onBurgerIconMouseenter(): void {
    if (this.isOpen && this.isOpenList) {
      this.isOpen = !this.isOpen;
    }
  }

  public processIconClick(isOpen: boolean): void {
    if (!isOpen) {
      this.currentMenuType.next(null);
    }

    this.isOpenList = isOpen;
  }

  public goToPage(path: string): void {
    this.isOpen = true;
    this.isOpenList = !this.isOpenList;
    this.currentMenuType.next(null);
    this.navigatePath.emit(path);
  }

  public onOpenPortalModal(isOpen: boolean): void {
    this.openProblemModal.next(isOpen);
  }

  public isDisabled(routeName: string): boolean {
    return window.location.pathname === routeName;
  }

  public singOut(): void {
    this.authService.logout()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private getIsBurgerActive$(): Observable<boolean> {
    return this.currentMenuType
      .pipe(
        distinctUntilChanged(),
        map((menuType: MenuType) => menuType === MenuType.BURGER),
        takeUntil(this.destroy$),
      );
  }

  private getCurrentMenu$(): Observable<TemplateRef<void>> {
    return this.currentMenuType
      .pipe(
        distinctUntilChanged(),
        map((menuType: MenuType) => this.dropDownMenuConfig[menuType]),
        takeUntil(this.destroy$),
      );
  }
}
