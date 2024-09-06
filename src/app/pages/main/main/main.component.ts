import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IEventRequest, IEventResponse } from '@interfaces/event';
import { EventsParametersService } from '@services/portal/eventsParameters.service';
import { HeaderService } from '@services/header.service';
import { UserService } from '@services/user.service';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { EventService } from '@services/portal/event.service';
import { ImageLoadService } from '@services/imageLoad.service';
import { EmployeeService } from '@services/employee.service';
import { ScrollService } from '@services/scroll.service';
import { DataToAnotherComponentService } from '@services/dataToAnotherComponent.service';
import { IUserInfo } from '@interfaces/userInfo.interface';
import { CompanyService } from '@services/company.service';

export const NEWS = 'hot-news';
const HEADER_HEIGHT = 83;

@Component({
  selector: 'andteam-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject();
  public eventsLoaded$ = new Subject();
  public newsLoaded$ = new Subject();
  public events: IEvent[];
  public page = 1;
  public pageSize: number;
  public topics = '';
  public offices = '';
  public dates = '';
  public search = '';
  public hasNextPage = false;
  public isBlockBackGround: boolean;
  public externalId: string;
  public avatar: string | ArrayBuffer;
  public imgBackground: string | ArrayBuffer;
  public isOpenSuccessImageModal = false;
  public userData$: Observable<IUserInfo>;
  public backGround$: Observable<string | ArrayBuffer>;

  @ViewChild('eventsBlock') eventsBlock: ElementRef;
  @ViewChild('newsBlock') newsBlock: ElementRef;

  constructor(private scrollService: ScrollService,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private eventsService: EventService,
              private eventsParametersService: EventsParametersService,
              private employeeService: EmployeeService,
              private headerService: HeaderService,
              private userService: UserService,
              private employee: EmployeeService,
              public imageLoadService: ImageLoadService,
              public transmitData: DataToAnotherComponentService,
              public companyService: CompanyService,
              ) {
  }

  ngOnInit(): void {

    this.userData$ = this.userService.getUserInfo$()
      .pipe(
        switchMap(
          ({ externalId, photo }) => {
            this.externalId = externalId;
            this.transmitData.mainExtendUserId = this.externalId;
            this.avatar = `data:image/jpeg;base64,${photo}`;

            this.backGround$ = this.employee.getBackground(externalId)
                .pipe(
                  switchMap(file => this.imageLoadService.readFile(file)),
                  tap(value => this.imgBackground = value)
                );

            return this.employeeService.getUserInfo$(externalId);
          }),
      );

    this.setupEvents();

    const fragment = this.route.snapshot.fragment;

    this.headerService.addFragment(fragment);

    combineLatest([
      this.newsLoaded$.asObservable(),
      this.eventsLoaded$.asObservable()
    ])
      .pipe(take(1))
      .subscribe(() => {
        this.setupFragment();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onOpenSuccessImageModal(): void {
    this.isOpenSuccessImageModal = false;
  }

  public onCloseSuccessImageModal(): void {
    this.isOpenSuccessImageModal = true;
  }

  public onChangeBg(newBackground: {fileData: FormData, background: string | ArrayBuffer}): void {
    this.employee.putBackground(newBackground.fileData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.imgBackground = newBackground.background;
        this.changeDetectorRef.markForCheck();
      });
  }

  public changeBlockBackground($event: boolean): void {
    this.isBlockBackGround = $event;
  }

  private triggerScrollIntoView(elementName: string, animation: ScrollBehavior): void {
    const offsetTop = elementName === NEWS
      ? this.newsBlock.nativeElement.offsetTop
      : this.eventsBlock.nativeElement.offsetTop;

    window.scrollTo({ top: offsetTop, behavior: animation });
  }

  private getEvents(parameters: IEventRequest): Observable<IEventResponse> {
    return this.eventsService.getAll<IEventResponse>(parameters);
  }

  private setupFragment(): void {
    this.headerService.getFragment()
      .pipe(
        filter(fragment => !!fragment),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (fragment) => {
          const scrollPosition = this.scrollService.getScrollPosition();

          if (fragment === 'events' && scrollPosition) {
            window.requestAnimationFrame(() => window.scrollTo({ top: scrollPosition - HEADER_HEIGHT }));
            this.scrollService.clearScrollPosition();
          } else {
            window.requestAnimationFrame(() => this.triggerScrollIntoView(fragment, 'smooth'));
          }
        });
  }

  private setupEvents(): void {
    this.eventsParametersService.getRequestParameters().pipe(
      switchMap((parameters) => {
        this.page = Number(parameters.page);
        this.pageSize = Number(parameters.pageSize);
        this.topics = parameters.topics;
        this.offices = parameters.offices;
        this.dates = parameters.dates;
        this.search = parameters.search;
        const selectedParameters = this.getQueryParams();

        return this.getEvents(selectedParameters);
      }),
      takeUntil(this.destroy$)
    )
      .subscribe(
        ({ data, pageInfo }) => {
          this.hasNextPage = pageInfo.hasNextPage;
          this.events = data;
          this.eventsLoaded$.next();
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private getQueryParams(): IEventRequest {
    const params: IEventRequest = {
      page: String(this.page),
      pageSize: String(this.pageSize),
    };

    if (this.offices !== '') {
      params.offices = this.offices;
    }

    if (this.topics !== '') {
      params.topics = this.topics;
    }

    if (this.dates !== '') {
      params.dates = this.dates;
    }

    if (this.search !== '') {
      params.search = this.search;
    }

    return params;
  }
}
