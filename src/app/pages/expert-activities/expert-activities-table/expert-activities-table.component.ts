import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import arrowUpSvg from '!!raw-loader!@assets/images/arrow-up.svg';
import arrowDownSvg from '!!raw-loader!@assets/images/arrow-down.svg';
import plusSvg from '!!raw-loader!@assets/images/plus.svg';
import noActivitiesIconSvg from '!!raw-loader!@assets/images/no-data.svg';
import { IPaginationConfig } from '@interfaces/employee';
import {
  IActivities,
  IActivitiesParams,
  IActivitiesResponse,
  IActivity,
} from '@interfaces/expert-activities.interface';
import {
  EXPERT_ACTIVITIES_MODAL_WIDTH,
  PAGINATOR_DEFAULT_OPTION,
  PAGINATOR_OPTIONS,
  SORT_OPTIONS,
} from '@pages/expert-activities/expert-activities.const';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICommonOption } from '@interfaces/filter';
import { MatDialog } from '@angular/material/dialog';
import { ExpertActivitiesModalComponent } from '../expert-activities-modal/expert-activities-modal.component';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { takeUntil } from 'rxjs/operators';
import { forIn } from 'lodash';

@Component({
  selector: 'andteam-expert-activities-table',
  templateUrl: './expert-activities-table.component.html',
  styleUrls: ['./expert-activities-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertActivitiesTableComponent implements OnInit, OnDestroy {
  @Input() set expertActivitiesList(value: IActivitiesResponse) {
    if (value) {
      this.expertActivitiesList$.next(value);
      this.setupPaginationConfig(value.page);
      this.totalItemsCountEmit.emit(value.totalItems);
    }

    if (this.isFilteredList) {
      this.resetSortOptions();
    }
  }
  @Input() public isFilteredList: boolean;

  @Output() sendPageNumber = new EventEmitter<number>();
  @Output() updateSortOptions = new EventEmitter<IActivitiesParams>();
  @Output() sendItemsCount = new EventEmitter<string>();
  @Output() editedActivitiesEmit = new EventEmitter<IActivities[]>();
  @Output() totalItemsCountEmit = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<IActivitiesParams>();

  public displayedColumns: string[] = ['name', 'level', 'technology', 'language', 'location', 'activities'];
  public arrowUp = arrowUpSvg;
  public arrowDown = arrowDownSvg;
  public plusIcon = plusSvg;
  public paginationConfig: IPaginationConfig;
  public expertActivitiesList$ = new BehaviorSubject<IActivitiesResponse>(null);
  public paginationOptions: ICommonOption[] = PAGINATOR_OPTIONS;
  public paginationDefaultOption: ICommonOption = PAGINATOR_DEFAULT_OPTION;
  public isActivitiesUpdate$ = new BehaviorSubject<boolean>(false);
  public noActivitiesSvg: string = noActivitiesIconSvg;
  public sortOptions = SORT_OPTIONS;
  public byDescendingParam = String(!SORT_OPTIONS.surname.isDesc);
  public sortingParam = String(SORT_OPTIONS.surname.control);
  public allActivities: any;

  private destroy$ = new Subject();

  constructor(
    private modalWindow: MatDialog,
    private expertActivitiesService: ExpertActivitiesService,
    private cdr: ChangeDetectorRef)
  { }

  public ngOnInit(): void {
    this.getUserActivities();
    this.getAllActivities();
  }

  public editActivitiesModal(user: any, canEdit: boolean = false, isEdit: boolean = false, userActivities?: any, activity?: any): void {
    if (!isEdit && userActivities.length >= this.allActivities.length) {
      return;
    }

    if (canEdit) {
      const editDialogRef = this.modalWindow.open(ExpertActivitiesModalComponent, {
        width: EXPERT_ACTIVITIES_MODAL_WIDTH,
        disableClose: true,
        data: {
          isEdit,
          activity,
          userActivities,
          expertActivities: this.allActivities,
          userId: user,
        },
      });

      editDialogRef.componentInstance.checkedActivities
        .subscribe(() => {
          this.getUserActivities();
        });
    }
  }

  public getUserActivities(): void {
    this.expertActivitiesList$.subscribe((value) => {
      for (const user in value?.expertActivities) {
        this.expertActivitiesService.getEmployeeExpertActivities(value.expertActivities[user].employeeId)
          .subscribe((activities: IActivity[]) => {
            value.expertActivities[user].expertActivities = activities;
            this.cdr.detectChanges();
          });
      }
    });
  }

  public getAllActivities(): void {
    this.expertActivitiesService.getListOfActivities()
      .subscribe((response) => {
        this.allActivities = response;
      });
  }

  public setupPaginationConfig(currentPage: number): void {
    this.paginationConfig = {
      currentPage,
      itemsPerPage: this.expertActivitiesList$.value.pageSize,
      totalItems: this.expertActivitiesList$.value.totalItems
    } as IPaginationConfig;
  }

  public onSendPageNumber(page: number): void {
    this.updateSortOptions.emit({ byDescending: this.byDescendingParam, sorting: this.sortingParam });
    this.sendPageNumber.emit(page);
    this.setupPaginationConfig(page);
  }

  public onSendItemsCount(count: string): void {
    this.updateSortOptions.emit({ byDescending: this.byDescendingParam, sorting: this.sortingParam });
    this.sendItemsCount.emit(count);
  }

  public onFadeOut(): void {
    this.isActivitiesUpdate$.next(false);
  }

  public updateExpertActivities(activities: IActivities[], employeeId: string): void {
    const activitiesIds = activities.map(({ id }) => id);

    this.expertActivitiesService.updateExpertActivities(activitiesIds, employeeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateExpertActivitiesList(activities, employeeId);
        this.isActivitiesUpdate$.next(true);
      });
  }

  public onSortChange(key: string, control: number): void {
    forIn(this.sortOptions, (option) => {
      if (option.control !== control) {
        option.isDesc = true;
        option.isActive = false;
      }
    });
    this.isFilteredList = false;
    this.sortOptions[key].isDesc = !this.sortOptions[key].isDesc;
    this.sortingParam = control.toString();
    this.byDescendingParam = String(!this.sortOptions[key].isDesc);
    this.sortChange.emit({ byDescending: this.byDescendingParam, sorting: this.sortingParam });
    this.sortOptions[key].isActive = true;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateExpertActivitiesList(activities: IActivities[], id: string): void {
    const activitiesNames = activities.map(({ activityName }) => activityName);
    const currentEmployee = this.expertActivitiesList$.value.expertActivities.find(({ employeeId }) => employeeId === id);

    currentEmployee.expertActivities = activitiesNames;
  }

  private resetSortOptions(): void {
    forIn(this.sortOptions, (option) => {
      option.isDesc = true;
      option.isActive = false;
    });

    this.sortOptions.surname.isActive = true;
  }
}
