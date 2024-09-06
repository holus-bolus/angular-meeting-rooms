import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { IProjectWithFeedbacks, IProjectWithFeedbacksFilter, IUniversalFeedbackData } from '@interfaces/feedback.interface';
import { IProject } from '@interfaces/userInfo.interface';
import { cloneDeep } from 'lodash';
import { MANAGER_PROJECT_FEEDBACK } from '@constants/routes-name';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Moment } from 'moment-timezone/moment-timezone';
import { ICommonOption } from '@interfaces/filter';
import { FormControl } from '@angular/forms';
import { FeedbackService } from '@services/feedback.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DatesPeriodPickerComponent } from '@andkit/components/pickers/dates-period-picker/dates-period-picker.component';
import { IS_GOOD_OPTIONS, VALUABLE_OPTIONS } from './project-feedbacks-by-project.const';

import noFeedbacksSvg from '!!raw-loader!@assets/images/no-feedbacks.svg';
import filterSvg from '!!raw-loader!@assets/images/filter.svg';
import arrowDownSvg from '!!raw-loader!@assets/images/arrow-down.svg';
import downloadSmallSvg from '!!raw-loader!@assets/images/download-small.svg';

@Component({
  selector: 'andteam-project-feedbacks-by-project',
  templateUrl: './project-feedbacks-by-project.component.html',
  styleUrls: ['./project-feedbacks-by-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFeedbacksByProjectComponent implements OnInit, OnDestroy {
  @ViewChild(DatesPeriodPickerComponent)
  datesPeriodPicker: DatesPeriodPickerComponent;

  public titleForLink = 'Back to previous page';
  public returnPath = MANAGER_PROJECT_FEEDBACK;
  public isGoodOptions = IS_GOOD_OPTIONS;
  public valuableOptions = VALUABLE_OPTIONS;
  public project: IProject;
  public projectWithFeedbacks: IProjectWithFeedbacks;
  public universalFeedbacks: IUniversalFeedbackData[];
  public isFilterActive = false;
  public isSortActive = null;
  public hasAccessToExtendedFilter = false;

  public universalFeedbacks$ = new Observable<IUniversalFeedbackData[]>();
  public universalFeedbacksFilteredRS = new ReplaySubject<IUniversalFeedbackData[]>(1);
  public destroy$ = new Subject();
  public refreshS = new Subject();
  public isLoader = new BehaviorSubject<boolean>(false);

  public isGoodControl = new FormControl(null);
  public valuableControl = new FormControl(null);
  public startDateControl = new FormControl(null);
  public endDateControl = new FormControl(null);

  public readonly noFeedbacksSvg = noFeedbacksSvg;
  public readonly sortIcon: string = arrowDownSvg;
  public readonly filterIcon: string = filterSvg;
  public readonly downloadIcon: string = downloadSmallSvg;

  public get isClearDisabled(): boolean {
    return  (this.isNullOrUndefined(this.isGoodControl.value)   || this.isGoodControl.value.length === 0) &&
            (this.isNullOrUndefined(this.valuableControl.value) || this.valuableControl.value.length === 0) &&
            !this.startDateControl.value && !this.endDateControl.value;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedbackService: FeedbackService,
  ) {}

  public ngOnInit(): void {
    this.isLoader.next(true);
    this.project = this.activatedRoute.snapshot.data.project;
    const feedbacks = this.activatedRoute.snapshot.data.data.feedbacks;
    this.projectWithFeedbacks = this.activatedRoute.snapshot.data.data.project[0];
    this.hasAccessToExtendedFilter = this.activatedRoute.snapshot.data.data.hasAccessToExtendedFilter;
    this.universalFeedbacks = feedbacks;
    this.universalFeedbacksFilteredRS.next(cloneDeep(this.universalFeedbacks));
    this.isLoader.next(false);

    this.refreshS
      .pipe(
        switchMap(() => {
          this.isLoader.next(true);

          return this.feedbackService.getProjectFeedbacks$(this.project.id, this.getFilter());
        }),
        takeUntil(this.destroy$))
      .subscribe((universalFeedbacks) => {
        this.universalFeedbacksFilteredRS.next(
          cloneDeep(universalFeedbacks));
        this.isLoader.next(false);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public changeDate(event: {startDate: Moment, endDate: Moment}): void {
    this.endDateControl.setValue(event.endDate);
    this.startDateControl.setValue(event.startDate);
    this.refreshS.next();
  }

  public onSelectIsGood(filterOptions: ICommonOption<number, boolean>[]): void {
    this.isGoodOptions = this.isGoodOptions.map(item => ({ ...item, checked: filterOptions.some(({ id }) => id === item.id) }));
    const values = this.isGoodOptions
      .filter(option => option.checked)
      .map(option => option.value);
    this.isGoodControl.setValue(values);
    this.refreshS.next();
  }

  public onValuableCheck(filterOptions: ICommonOption<number, number>[]): void {
    this.valuableOptions = this.valuableOptions.map(item => ({ ...item, checked: filterOptions.some(({ id }) => id === item.id) }));
    const values = this.valuableOptions
      .filter(option => option.checked)
      .map(option => option.value);
    this.valuableControl.setValue(values);
    this.refreshS.next();
  }

  public onClickSort(): void {
    if (this.isSortActive === null) {
      this.isSortActive = true;
    } else if (this.isSortActive === true) {
      this.isSortActive = false;
    } else {
      this.isSortActive = null;
    }

    this.refreshS.next();
  }

  public clearFilter():void {
    this.valuableControl.setValue(null);
    this.valuableOptions = this.valuableOptions.map(opt => ({ ...opt, checked: false }));
    this.isGoodControl.setValue(null);
    this.isGoodOptions = this.isGoodOptions.map(opt => ({ ...opt, checked: false }));
    this.resetDate();
    this.startDateControl.setValue(null);
    this.endDateControl.setValue(null);
    this.refreshS.next();
  }

  public downloadExcel(): void {
    this.isLoader.next(true);
    this.feedbackService.getExelReport$([this.project.id], this.getFilter())
      .subscribe((res) => {
        this.isLoader.next(false);
        const date = new Date().toLocaleDateString();
        const a = document.createElement('a');
        a.download = `${date}-project-feedbacks.xlsx`;
        a.setAttribute('style', 'display:none;');
        a.href = res;
        a.click();
      });
  }

  public resetDate(): void {
    this.datesPeriodPicker.reset();
  }

  private getFilter(): IProjectWithFeedbacksFilter {
    const filter = {} as IProjectWithFeedbacksFilter;
    if (!this.isNullOrUndefined(this.isGoodControl.value)) {
      filter.isGood = this.isGoodControl.value;
    }

    if (!this.isNullOrUndefined(this.valuableControl.value)) {
      filter.valuableFilter = this.valuableControl.value;
    }

    if (!this.isNullOrUndefined(this.startDateControl.value) && !this.isNullOrUndefined(this.endDateControl.value)) {
      const startDate = new Date(this.startDateControl.value).toLocaleDateString().split('.');
      const endDate = new Date(this.endDateControl.value).toLocaleDateString().split('.');
      filter.fromDate = `${startDate[1]}.${startDate[0]}.${startDate[2]}`;
      filter.toDate = `${endDate[1]}.${endDate[0]}.${endDate[2]}`;
    }

    if (!this.isNullOrUndefined(this.isSortActive)) {
      filter.sortByRate = this.isSortActive;
    }

    return filter;
  }

  private isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === 'undefined' || obj === null;
  }
}
