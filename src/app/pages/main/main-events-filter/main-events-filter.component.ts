import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISelectOption, ITag } from '@interfaces/filter';
import { IDatesChangesEvent, IOptionsChangesEvent } from '../main-events/main-events';
import { EventsParametersService } from '@services/portal/eventsParameters.service';
import { map, take, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { topics } from '@constants/dropdown-options/eventsDropdownOptions.constants';
import { formatDate } from '@angular/common';
import { OfficeService } from '@services/office.service';
import { IEventRequest, IOffice } from '@interfaces/event';
import { FormControl } from '@angular/forms';
import { EventService } from '@services/portal/event.service';

import searchYellowSvg from '!!raw-loader!./icons/search-yellow.svg';
import portalArrowSvg from '!!raw-loader!@assets/images/portal-arrow.svg';

const FIRST_DAY = 1;

export interface IFilterTag {
  id: string;
  name: string;
  selectionName: string;
}

export interface IOptionsData<T> {
  id: string;
  value: T;
}

export interface IEventsFilters {
  offices?: ISelectOption<string>[];
  dates?: ISelectOption<string>[];
  topics?: ISelectOption<string>[];
  search?: string;
  current?: boolean;
}

@Component({
  selector: 'andteam-main-events-filter',
  templateUrl: './main-events-filter.component.html',
  styleUrls: ['./main-events-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainEventsFilterComponent implements OnInit, OnDestroy {
  @Output() optionsChanges = new EventEmitter<IOptionsChangesEvent>();
  @Output() datesChanges = new EventEmitter<IDatesChangesEvent>();
  @Output() searchChanges = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();

  public topics: ISelectOption<string>[];
  public offices: ISelectOption<string>[];
  public dates = [];
  public search: string;
  public isChecked = false;
  public selectedFilters: ITag[];
  public searchIcon: string;
  public topicsList = new FormControl();
  public datesList = new FormControl();
  public officesList = new FormControl();
  public portalArrow: string = portalArrowSvg;
  public eventsTypes = {
    topics: 'topics',
    dates: 'dates',
    offices: 'offices',
    current: 'current'
  };

  private destroy$ = new Subject();

  constructor(
    private eventService: EventService,
    private eventsParametersService: EventsParametersService,
    private changeDetectorRef: ChangeDetectorRef,
    private officeService: OfficeService
  ) {}

  public ngOnInit(): void {
    this.updateParameters();
    this.setupDateList();
    this.checkForNextMonthEvents();
    this.searchIcon = searchYellowSvg as any;
    this.myOfficeName$.subscribe(myOffice => this.officesList.setValue([myOffice]));
  }

  public ngOnDestroy(): void {
    this.resetFilteredParameters();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onRemoveTag(tag: IFilterTag): void {
    const updatedOption = { label: tag.id, value: tag.name, checked: false };

    this.updateAndEmitOptions(tag.selectionName, updatedOption);
    this.createTags();

    switch (tag.selectionName) {
      case this.eventsTypes.offices:
        this.officesList.setValue(this.offices.map((value: ISelectOption<string>) => {
          if (value.checked) {
            return value.value;
          }
        }));
        break;
      case this.eventsTypes.dates:
        this.datesList.setValue(this.dates.map((value: ISelectOption<string>) => {
          if (value.checked) {
            return value.value;
          }
        }));
        break;
      case this.eventsTypes.topics:
        this.topicsList.setValue(this.topics.map((value: ISelectOption<string>) => {
          if (value.checked) {
            return value.value;
          }
        }));
    }
  }

  public onCheckOption(option: ISelectOption<string>, selectionName: string): void {
    option.checked = !option.checked;
    this.updateAndEmitOptions(selectionName, option);
    this.createTags();
  }

  public onKeyEnterUp(types: ISelectOption<string>[], typeControl: FormControl, eventsType: string): void {
    if (typeControl.value) {
      types.map((type: ISelectOption<string>) => {
        typeControl.value.includes(type.value)
            ? type.checked = true
            : type.checked = false;

        this.updateAndEmitOptions(eventsType, type);
      });
    }

    this.createTags();
  }

  public onCheckDate(option: ISelectOption<string>): void {
    option.checked = !option.checked;
    this.updateAndEmitOptions(this.eventsTypes.dates, option);
    this.createTags();
  }

  public onToggle(checked: boolean): void {
    this.eventsParametersService.patchFiltersParameters({ current: checked });
    const selectedCurrentDates = this.getSelectedOptions<Date>(this.eventsTypes.dates);
    this.emitDates(selectedCurrentDates);
    this.createTags();
  }

  public onClearAll(): void {
    this.topicsList.setValue([]);
    this.datesList.setValue([]);
    this.officesList.setValue([]);
    this.selectedFilters = [];
    const refreshedTopics = this.resetCheckedProperty(this.topics);
    const refreshedOffices = this.resetCheckedProperty(this.offices);
    const refreshedDates = this.resetCheckedProperty(this.dates);

    const filtersParameters = {
      offices: refreshedOffices,
      topics: refreshedTopics,
      dates: refreshedDates,
      search: '',
      current: false
    };

    this.eventsParametersService.patchFiltersParameters(filtersParameters);
    this.clearAll.emit();
  }

  public onSearch(searchText: string): void {
    this.eventsParametersService.patchFiltersParameters({ search: searchText });
    this.searchChanges.emit(searchText);
  }

  private setupDateList(): void {
    if (this.dates.length) {

      return;
    }
    const currentDate = new Date();

    currentDate.setDate(FIRST_DAY);

    for (let i = 1; i < 6; i++) {
      const date = formatDate(currentDate, 'dd MMM yyyy', 'en-US');

      this.dates.push({ id: i.toString(), value: date });
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
  }

  private updateParameters(): void {
    this.eventsParametersService.getFiltersParameters()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (options: IEventsFilters) => {
          this.topics = options.topics;
          this.offices = options.offices;
          this.dates = options.dates;
          this.search = options.search;
          this.isChecked = options.current;

          this.createTags();
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private fetchParameters(): void {
    this.officeService.getAll<IOffice[]>().pipe(
      map((allOffices: IOffice[]) => this.convertIOfficesToSelectOptions(allOffices))
    ).subscribe(
      (offices: ISelectOption<string>[]) => this.setOptions(offices)
    );
  }

  private get myOfficeName$(): Observable<string> {
    return  this.officeService.getMyOffice$()
      .pipe(
        map(({ name }) => name),
        take(1)
      );
  }

  private checkForNextMonthEvents(): void {
    this.eventService.getAll({ page: '1', pageSize: '5' }).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((events: IEventRequest) => {
      const nextMonthDate = new Date();

      nextMonthDate.setDate(FIRST_DAY);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

      if (new Date(events.data[0]['date']) > nextMonthDate && new Date(this.dates[0]?.value).getMonth() < nextMonthDate.getMonth()) {
        this.dates = [{ id: '0', value: formatDate(nextMonthDate, 'dd MMM yyyy', 'en-US') }, ...this.dates];
      }

      this.fetchParameters();
    });
  }

  private setOptions(offices: ISelectOption<string>[]): void {
    this.myOfficeName$.subscribe((name: string) => {
      this.datesChanges.emit({ current: true, options: [] });

      const topicsOptions = this.convertToSelectOptions(topics);
      const defaultOffices = offices.map(office => ({ ...office, checked: office.value === name }));
      const parsedDates = this.dates.map(date => ({ ...date, value: formatDate(date.value, 'MMM y', 'en-US') }));
      const datesOptions = this.convertToSelectOptions(parsedDates);
      const filtersOptions = { offices: defaultOffices, dates: datesOptions, topics: topicsOptions, current: true };

      this.eventsParametersService.patchFiltersParameters(filtersOptions);
      this.eventsParametersService.patchRequestParameters({ offices: name });
    });
  }

  private updateAndEmitOptions(selectionName: string, option?: ISelectOption<string>): void {
    switch (selectionName) {
      case  this.eventsTypes.current:
        this.eventsParametersService.patchFiltersParameters({ current: false });
        const selectedCurrentDates = this.getSelectedOptions<Date>(this.eventsTypes.dates);
        this.emitDates(selectedCurrentDates);
        break;
      case this.eventsTypes.dates:
        this.setSelectedOptions(this.eventsTypes.dates, option);
        const selectedDates = this.getSelectedOptions<Date>(this.eventsTypes.dates);
        this.emitDates(selectedDates);
        break;
      default:
        this.setSelectedOptions(selectionName, option);
        const selectedOptions = this.getSelectedOptions<string>(selectionName);
        this.emitSelected(selectedOptions, selectionName);
    }
  }

  private getSelectedOptions<T>(selectionName: string): T[] {
    let values = [];

    switch (selectionName) {
      case this.eventsTypes.topics:
        values = this.getFormData(this.topics);
        break;
      case this.eventsTypes.offices:
        values = this.getFormData(this.offices);
        break;
      case this.eventsTypes.dates:
        values = this.getFormData(this.dates).map((date: string) => {
          return new Date(`${FIRST_DAY} ${date}`);
        });
        break;
    }

    return values;
  }

  private setSelectedOptions(selectionName: string, option?: ISelectOption<string>): void {
    let updatedOptions: IEventsFilters;

    switch (selectionName) {
      case this.eventsTypes.topics:
        updatedOptions = { topics: this.getCheckedData(this.topics, option) };
        break;
      case this.eventsTypes.offices:
        updatedOptions = { offices: this.getCheckedData(this.offices, option) };
        break;
      case this.eventsTypes.dates:
        updatedOptions = { dates: this.getCheckedData(this.dates, option) };
        break;
    }
    this.eventsParametersService.patchFiltersParameters(updatedOptions);
  }

  private createTags(): void {
    const checkedTopics = this.topics.filter(item => item.checked);
    const checkedOffices = this.offices.filter(item => item.checked);
    const checkedDates = this.dates.filter(item => item.checked);
    const current = [{ value: 'Upcoming', label: 'empty', checked: this.isChecked }].filter(item => item.checked);
    this.selectedFilters = this.convertToTags(checkedTopics, this.eventsTypes.topics)
      .concat(
        this.convertToTags(checkedDates, this.eventsTypes.dates),
        this.convertToTags(checkedOffices, this.eventsTypes.offices),
        this.convertToTags(current, 'current')
      );
  }

  private getCheckedData(items: ISelectOption<string>[], option: ISelectOption<string>): ISelectOption<string>[] {
    return items.map((item: ISelectOption<string>) => {
      return item.label === option.label
        ? { ...item, checked: option.checked }
        : item;
    });
  }

  private getFormData(items: ISelectOption<string>[]): string[] {
    return items.reduce(
      (data: string[], item: ISelectOption<string>) => {
        if (item.checked) {
          data.push(item.value);
        }

        return data;
      },
      []);
  }

  private emitSelected(options: string[], selectedGroupName: string): void {
    this.optionsChanges.emit({ options, selectionName: selectedGroupName });
  }

  private emitDates(selectedDates: Date[]): void {
    const optionsToEmit = this.isChecked && selectedDates.length
      ? this.getCurrentDates(selectedDates)
      : selectedDates;

    this.datesChanges.emit({ options: optionsToEmit, current: this.isChecked });
  }

  private getCurrentDates(selectedDates: Date[]): Date[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentTime = currentDate.getTime();

    return selectedDates.filter((date: Date) => {
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear || date.getTime() >= currentTime;
    });
  }

  private convertToTags(items: ISelectOption<string>[], selectionName: string): ITag[] {
    return items.map((item: ISelectOption<string>) => {
      return {
        selectionName,
        id: item.label,
        name: item.value,
      };
    });
  }

  private resetCheckedProperty(items: ISelectOption<string>[]): ISelectOption<string>[] {
    return items.map((item: ISelectOption<string>) => {
      return { ...item, checked: false };
    });
  }

  private convertToSelectOptions(items: IOptionsData<string>[]): ISelectOption<string>[] {
    return items.map((item: IOptionsData<string>) => {
      return {
        value: item.value,
        label: item.id,
        checked: false
      };
    });
  }

  private convertIOfficesToSelectOptions(items: IOffice[]): ISelectOption<string>[] {
    return items.map((item: IOffice) => {
      return {
        value: item.name,
        label: item.id,
        checked: false
      };
    });
  }

  private resetFilteredParameters(): void {
    const refreshedParameters = { offices: [], topics: [], dates: [], search: '', current: true };

    this.eventsParametersService.patchFiltersParameters(refreshedParameters);
  }
}
