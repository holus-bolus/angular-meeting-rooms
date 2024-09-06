import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  Input
} from '@angular/core';
import { IEvent } from '@interfaces/event';
import {
  CURRENT_SEARCH_RANGE,
  FIRST_HOURS,
  FIRST_MINUTES, FIRTS_SECONDS,
  IDatesChangesEvent,
  IOptionsChangesEvent,
  LAST_DAY, LAST_HOURS, LAST_MINUTES, LAST_SECONDS
} from './main-events';
import { EventsParametersService } from '@services/portal/eventsParameters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '@services/header.service';
import { FORMATS } from '@constants/moment.constant';
import { RolesService } from '@services/roles.service';
import { TimeService } from '@services/portal/time.service';
import { EventService } from '@services/portal/event.service';
import { PORTAL_CONFIRMATION } from '@constants/modals/confirmation';
import { Observable, Subject } from 'rxjs';
import { ScrollService } from '@services/scroll.service';

import nothingFoundSvg from '!!raw-loader!./images/nothing-found.svg';
import vectorYellowSvg from '!!raw-loader!@assets/images/vector-yellow.svg';

@Component({
  selector: 'andteam-main-events',
  templateUrl: './main-events.component.html',
  styleUrls: ['./main-events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainEventsComponent implements OnInit, OnDestroy {
  @Input() events: IEvent[];
  @Input() hasNextPage: boolean;
  @Input() pageSize: number;

  @Output() moreClick = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<string>();

  public event: IEvent;
  public isOpenConfirmationModal = false;
  public isAdminHr$: Observable<boolean>;
  public nothingFoundIcon: string = nothingFoundSvg;
  public vectorIcon = vectorYellowSvg;
  public hasDefaultPage = false;
  public title = PORTAL_CONFIRMATION.TITLE;
  public subTitle = PORTAL_CONFIRMATION.SUB_TITLE;

  private destroy$ = new Subject();
  private firstPageSize = 5;
  private commonPageSize = 6;

  constructor(private rolesService: RolesService,
              private eventsService: EventService,
              private timeService: TimeService,
              private eventsParametersService: EventsParametersService,
              private changeDetectorRef: ChangeDetectorRef,
              private route: ActivatedRoute,
              private router: Router,
              private headerService: HeaderService,
              private scrollService: ScrollService) {
  }

  public ngOnInit(): void {
    this.isAdminHr$ = this.rolesService.isAdminHr$();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackEvent(index: number, { id }: IEvent): string {
    return id;
  }

  public onMoreClick(): void {
    this.moreClick.emit();
    const newPageSize = this.pageSize + this.commonPageSize;
    this.eventsParametersService.patchRequestParameters({ pageSize: `${newPageSize}` });
    if (newPageSize) {
      this.hasDefaultPage = true;
    }
  }

  public onClick(name: string): void {
    this.onLessClick();
    this.onScroll(name);
  }

  public onLessClick(): void {
    const newPageSize = this.firstPageSize;
    this.eventsParametersService.patchRequestParameters({ pageSize: `${newPageSize}` });
    if (newPageSize) {
      this.hasDefaultPage = false;
    }
  }

  public onScroll(name: string): void {
    this.router.navigate([''], { fragment: name });
    this.headerService.addFragment(name);
  }

  public onOpenConfirmationModal(event: IEvent): void {
    this.isOpenConfirmationModal = !this.isOpenConfirmationModal;
    this.event = event;
  }

  public onDeleteEvent(eventId: string): void {
    this.eventsService.delete<void>(eventId)
      .subscribe(() => {
        this.isOpenConfirmationModal = false;
        this.eventsParametersService.patchRequestParameters({});
      });
  }

  public onSearchChanges(searchText: string): void {
    this.eventsParametersService.patchRequestParameters({ search: searchText });
  }

  public onOptionsChanges({ options: selectedOptions, selectionName }: IOptionsChangesEvent): void {
    const params = selectedOptions.join(',');
    this.eventsParametersService.patchRequestParameters({ [selectionName]: params });
  }

  public onDatesChanges({ options: selectedOptions, current }: IDatesChangesEvent): void {
    const datesRanges = this.getDatesRanges(selectedOptions, current);
    this.eventsParametersService.patchRequestParameters({ dates: datesRanges });
  }

  public onClearAll(): void {
    const refreshedParameters = { offices: '', dates: '', search: '', topics: '' };
    this.eventsParametersService.patchRequestParameters(refreshedParameters);
  }

  public onEventCardCLick(eventContainer: HTMLElement): void {
    const scrollPosition = Math.trunc(eventContainer.getBoundingClientRect().top + window.pageYOffset);
    this.scrollService.setScrollPosition(scrollPosition);
  }

  private getDatesRanges(dates: Date[], isCurrent: boolean): string {
    if (isCurrent) {
      return dates.length ? this.getCurrentDatesRanges(dates) : this.getAllCurrentDates();
    }

    return dates.map((date) => {
      const firstDay = this.timeService.getUTCDate(date).format(FORMATS.MILLISECONDS_FORMAT);
      const lastDayOfTheMonth = this.getLastDayWithUtc(date);

      return `${firstDay}-${lastDayOfTheMonth}`;
    }).join(',');
  }

  private getCurrentDatesRanges(dates: Date[]): string {
    const currentMonth = new Date().getMonth();

    return dates.map((date) => {
      const month = date.getMonth();
      const firstDay = this.timeService.getUTCDate(date).format(FORMATS.MILLISECONDS_FORMAT);
      const lastDayOfTheMonth = this.getLastDayWithUtc(date);
      const currentDay = this.getCurrentDayWithUtc(new Date());

      return month === currentMonth
        ? `${currentDay}-${lastDayOfTheMonth}`
        : `${firstDay}-${lastDayOfTheMonth}`;
    })
      .join(',');
  }

  private getAllCurrentDates(): string {
    const unixTimeSeconds = Number(this.timeService.getUTCDate(new Date()).format(FORMATS.MILLISECONDS_FORMAT));

    return `${unixTimeSeconds}-${unixTimeSeconds + CURRENT_SEARCH_RANGE}`;
  }

  private getCurrentDayWithUtc(date: Date): number {
    const mappedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      FIRST_HOURS,
      FIRST_MINUTES,
      FIRTS_SECONDS
    );

    return this.timeService.getTimezoneDate(mappedDate).format(FORMATS.MILLISECONDS_FORMAT);
  }

  private getLastDayWithUtc(date: Date): number {
    const mappedDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      LAST_DAY,
      LAST_HOURS,
      LAST_MINUTES,
      LAST_SECONDS
    );

    return this.timeService.getUTCDate(mappedDate).format(FORMATS.MILLISECONDS_FORMAT);
  }
}
