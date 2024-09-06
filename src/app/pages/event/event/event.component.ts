import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '@interfaces/event';
import { map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { IOffice } from '@interfaces/office';
import { RolesService } from '@services/roles.service';
import { TimeService } from '@services/portal/time.service';
import { EventService } from '@services/portal/event.service';
import { ImagesService } from '@services/images.service';
import { PORTAL_CONFIRMATION } from '@constants/modals/confirmation';
import { ImageLoadService } from '@services/imageLoad.service';
import { URL_TYPE } from '@constants/safe-pipe.constants';

@Component({
  selector: 'andteam-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit, OnDestroy {
  confirmationEvent: IEvent;
  isOpenConfirmationModal = false;
  urlSafeType = URL_TYPE;
  eventId: string;
  title = PORTAL_CONFIRMATION.TITLE;
  subTitle = PORTAL_CONFIRMATION.SUB_TITLE;

  event$: Observable<IEvent>;
  moreEvents$: Observable<IEvent[]>;
  place$: Observable<string>;
  image$: Observable<string | ArrayBuffer>;
  icon$: Observable<string | ArrayBuffer>;
  isAdminHr$: Observable<boolean>;
  isShowLink$: Observable<boolean>;

  private updatedMoreEvents$ = new Subject<IEvent[]>();
  private destroy$ = new Subject();

  constructor(
    public eventsService: EventService,
    private route: ActivatedRoute,
    private timeService: TimeService,
    private rolesService: RolesService,
    private imagesService: ImagesService,
    private imageLoadService: ImageLoadService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initOfDataRelatedToRouter();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.updatedMoreEvents$.complete();
  }

  public onFadeOut(): void {
    this.eventsService.isEventPublished$.next(false);
  }

  public onOpenConfirmationModal(event: IEvent): void {
    this.confirmationEvent = event;
    this.isOpenConfirmationModal = !this.isOpenConfirmationModal;
  }

  public onCloseConfirmationModal(): void {
    this.isOpenConfirmationModal = false;
  }

  public onDeleteEvent(eventId: string): void {
    this.isOpenConfirmationModal = false;
    this.eventsService.delete<void>(eventId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          if (eventId === this.eventId) {
            this.router.navigate(['/']);
          } else {
            this.updatedMoreEvents$.next();
          }
        }
      );
  }

  private initOfDataRelatedToRouter(): void {
    const routeData: Observable<IEvent> = this.route.data
      .pipe(
        map(({ event }) => event),
        tap(({ id }) => this.eventId = id),
        shareReplay(1),
      );
    const moreEvents$ = routeData.pipe(map(({ relatedEvents }) => relatedEvents));
    const updatedMoreEvents$ = this.updatedMoreEvents$.pipe(switchMap(() => this.getMoreEvents()));

    this.event$ = routeData.pipe(map(this.getMappedEvent));
    this.moreEvents$ = merge<IEvent[], IEvent[]>(updatedMoreEvents$, moreEvents$);
    this.image$ = routeData.pipe(switchMap(({ poster }) => this.getImage(poster)));
    this.icon$ = routeData.pipe(switchMap(({ topic: { alternativeIcon } }) => this.getIcon(alternativeIcon)));
    this.place$ = routeData.pipe(map(({ place, offices }) => this.getAddress(place, offices)));
    this.isAdminHr$ = this.rolesService.isAdminHr$();
    this.isShowLink$ = routeData.pipe(map(({ date, signupUrl }) => signupUrl && this.checkOnUpcoming(date)));
  }

  private getAddress(place: string, offices: IOffice[]): string {
    return (!place && offices.length === 1) ? offices[0].address : place;
  }

  private checkOnUpcoming(date: string): boolean {
    const dateNow = this.timeService.getTimezoneDate(new Date());

    return this.timeService.getTimezoneDate(date) > dateNow;
  }

  private getMappedEvent(event: IEvent): IEvent {
    const { signupUrl } = event;

    if (!signupUrl) {
      return event;
    }

    const mappedSignupUrl = signupUrl.includes('http')
      ? signupUrl
      : `https://${signupUrl}`;

    return { ...event, signupUrl: mappedSignupUrl };
  }

  private getMoreEvents(): Observable<IEvent[]> {
    return this.eventsService.get<IEvent>(this.eventId)
      .pipe(
        map(({ relatedEvents }) => relatedEvents),
        takeUntil(this.destroy$)
      );
  }

  private getImage(imageName: string): Observable<string | ArrayBuffer> {
    return this.imagesService.getImage(imageName).pipe(
      switchMap(file => this.imageLoadService.readFile(file)),
      takeUntil(this.destroy$)
    );
  }

  private getIcon(iconName: string): Observable<string | ArrayBuffer> {
    return this.imagesService.getIcon(iconName).pipe(
      switchMap(file => this.imageLoadService.readFileAsText(file)),
      takeUntil(this.destroy$)
    );
  }
}
