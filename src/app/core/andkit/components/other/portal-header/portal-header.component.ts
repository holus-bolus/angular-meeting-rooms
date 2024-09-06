import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, merge, Observable, Subject, timer } from 'rxjs';
import { ADD_EVENT_ROUTE_NAME, ADD_NEWS_ROUTE_NAME } from '@constants/routes-name';
import { HeaderService } from '@services/header.service';
import { OfficeService } from '@services/office.service';
import { RolesService } from '@services/roles.service';
import { HeaderTypes } from '@andkit/components/other/header/header';
import { WindowResizeService } from '@services/windowResize.service';
import { MessageService } from '@services/message.service';
import { ScrollService } from '@services/scroll.service';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { IOffice } from '@interfaces/office';
import { DataToAnotherComponentService } from '@services/dataToAnotherComponent.service';
import { UserService } from '@services/user.service';
import { CompanyService } from '@services/company.service';
// tslint:disable-next-line:import-name
import alertIcon from '!!raw-loader!./icons/alert.svg';
import locationSvg from '!!raw-loader!./icons/location.svg';

interface IProblemPayload {
  message: string;
  images: string[];
}

const MENU_OPTIONS = {
  SUPPORT: 'Request tech support',
  HR: 'Report to HR',
  CHAT: 'Portal support chat',
  FUNCTIONALITY: 'Request for a new functionality',
};

const WINDOW_WIDTH = 1350;

@Component({
  selector: 'andteam-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalHeaderComponent implements OnInit, OnDestroy {
  public locationSvgIcon = locationSvg as string;
  public logoIcon: SafeHtml;
  public logoTextIcon: SafeHtml;
  public longLogoIcon: SafeHtml;
  public alertIcon: SafeHtml;
  public showLongHeaderLogo: boolean;

  public isScrollableHeader = false;
  public destroy$ = new Subject();
  public portalHeaders = false;
  public isOpenProblemModal = false;
  public isOpenAlertModal = false;
  public isOpenModalOfficeWindow = false;
  public isAddDropdownOpen = false;
  public headerTypes = HeaderTypes;
  public isAssessmentCoordinator$: Observable<boolean>;
  public routeName: string;
  // public meetingRoomUrl: SafeResourceUrl; // changed to a separate route
  public isShowMettingRoom: boolean;
  public addEventRouteName = ADD_EVENT_ROUTE_NAME;
  public addNewsRouteName = ADD_NEWS_ROUTE_NAME;
  public isBlockBackground: boolean;
  public avatar: string | ArrayBuffer;

  readonly menuOptions = MENU_OPTIONS;

  @Input() headerType: string;
  @Input() username: string;
  @Input() externalId: string;
  @Input() location: string;
  @Input() isBlockBackground$: BehaviorSubject<boolean>;

  get isAssessmentPath(): boolean {
    return window.location.pathname === `/assessment`;
  }

  get userAccountPath(): string {
    return `${window.location.origin}/employee/${this.externalId}`;
  }

  constructor(
    private scrollService: ScrollService,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private headerService: HeaderService,
    private router: Router,
    private rolesService: RolesService,
    private messageService: MessageService,
    private officeService: OfficeService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private windowResizeService: WindowResizeService,
    private dataService: DataToAnotherComponentService,
    private userService: UserService,
    private companyService: CompanyService) {
    this.showLongHeaderLogo = !!this.companyService.companyHeaderLogo && !this.companyService.companyLogoText;
    this.logoIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyLogo as any);
    this.logoTextIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyLogoText as any);
    this.longLogoIcon = this.sanitizer.bypassSecurityTrustHtml(this.companyService.companyHeaderLogo as any);
  }

  public ngOnInit(): void {
    this.isBlockBackground = this.dataService.isChangeStatusOfState;
    // this.setupMeetingRoomUrl();
    this.alertIcon = this.sanitizer.bypassSecurityTrustHtml(alertIcon as any);

    this.routeName = this.route.snapshot.data.name;

    merge(
      this.headerService.getScrollableHeader()
        .pipe(
          tap(scrollableHeader => this.portalHeaders = scrollableHeader)
        ),
      this.scrollService.triggerScroll(),
    )
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((scrollableHeader: boolean) => {
        this.isScrollableHeader = scrollableHeader || this.portalHeaders;
        this.isAddDropdownOpen = false;
        this.changeDetectorRef.markForCheck();
      });

    this.router.events.pipe(
      filter(event => event instanceof ActivationStart)
    ).subscribe(() => this.isAddDropdownOpen = false);

    this.isAssessmentCoordinator$ = this.rolesService.isAssessmentCoordinator$();

    this.isShowMettingRoom = window.innerWidth > WINDOW_WIDTH;
    this.windowResizeService.triggerWindowWidth()
      .pipe(
        map(width => width > WINDOW_WIDTH),
        takeUntil(this.destroy$)
      )
      .subscribe((isShowMettingRoom: boolean) => {
        this.isShowMettingRoom = isShowMettingRoom;
        this.changeDetectorRef.markForCheck();
      });
    this.initAvatar();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public closeTimePicker(): void {
    const timePickerElement = document.getElementById('time-picker');

    if (timePickerElement) {
      this.renderer.setStyle(timePickerElement, 'display', 'none');
    }
  }

  public onNavigatePath(path: string): void {
    if (path !== this.addEventRouteName && path !== this.addNewsRouteName) {
      this.headerType = this.headerTypes.Team;
    }

    timer(0).subscribe(() => {
      this.router.navigate([path]);
    });
  }

  public onOpenProblemModal(isOpen: boolean): void {
    this.isOpenProblemModal = isOpen;
  }

  public onOpenModalOfficeWindow(isOpen: boolean): void {
    this.isOpenModalOfficeWindow = isOpen;
  }

  public locationNewOffice(office: IOffice): void {
    this.location = office.name;
  }

  public onSend({ message, images }: IProblemPayload): void {
    this.isOpenProblemModal = false;
    this.isOpenAlertModal = true;

    const formData = new FormData();

    formData.append('text', message);

    if (images.length) {
      formData.append('image', images[0]);
    }

    this.messageService.post<FormData>(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  public onOpenAlertModal(): void {
    this.isOpenAlertModal = false;
  }

  public onCloseDropdown(isDropdownClick: boolean): void {
    if (!isDropdownClick) {
      this.isAddDropdownOpen = false;
    }
  }

  public refresh(): void {
    if (this.isNotMainPage()) {
      this.router.navigate(['/']);
    } else {
      const newUrl = this.router.url.split('/').filter(urlSegment => !urlSegment.includes('#')).join('/');

      this.isScrollableHeader
        ? window.scrollTo({ top: 0, behavior: 'smooth' })
        : window.location.assign(newUrl);
    }
  }

  public selectMenuOption(menuOption: string): string | void {
    switch (menuOption) {
      case this.menuOptions.SUPPORT:
        return this.companyService.companyResourcesUrls.JiraSupport;
      case this.menuOptions.HR:
        return this.onOpenProblemModal(true);
      case this.menuOptions.CHAT:
        return this.companyService.companyResourcesUrls.TeamsSupport;
      case this.menuOptions.FUNCTIONALITY:
        return this.companyService.companyResourcesUrls.Functionality;
      default:
        return;
    }
  }

  private isNotMainPage(): boolean {
    return this.router.url !== '/';
  }

  // private setupMeetingRoomUrl(): void {
  //   this.officeService.getMyOffice$()
  //     .subscribe(
  //       ({ meetingRoomUrl }: IOffice) => {
  //         this.meetingRoomUrl = this.sanitizer.bypassSecurityTrustResourceUrl(meetingRoomUrl);
  //         this.changeDetectorRef.markForCheck();
  //       }
  //     );
  // }

  private initAvatar(): void {
    this.userService.getUserInfo$()
      .pipe(
        takeUntil(this.destroy$),
        tap(
          ({ photo }) => {
            this.avatar = `data:image/jpeg;base64,${photo}`;
          }),
      ).subscribe();
  }
}
