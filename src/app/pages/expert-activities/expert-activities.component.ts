import { Component, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { LocationService } from '@services/location.service';
import { TechnologyService } from '@services/technology.service';
import { ICommonOption } from '@interfaces/filter';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  EXPERT_ACTIVITIES_ENGLISH_LEVEL,
  SORT_OPTIONS
} from '@pages/expert-activities/expert-activities.const';
import {
  IActivitiesParams,
  IActivitiesResponse,
  IActivitiesStorage,
} from '@interfaces/expert-activities.interface';
import { catchError } from 'rxjs/operators';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { LocalStorageService } from '@services/local-storage.service';

import employeeSvg from '!!raw-loader!@assets/images/employees2.svg';

@Component({
  selector: 'andteam-expert-activities',
  templateUrl: './expert-activities.component.html',
  styleUrls: ['./expert-activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpertActivitiesComponent implements OnInit {
  public employeesIcon = employeeSvg;
  public locationsList$: Observable<ICommonOption[]>;
  public technologiesList$: Observable<ICommonOption[]>;
  public technologiesLevelList$: Observable<ITechnologyLevel[]>;
  public englishLevelLeList: ICommonOption[] = EXPERT_ACTIVITIES_ENGLISH_LEVEL;
  public pageSize = '30';
  public pageNumber = '1';
  public expertActivitiesList$: Observable<IActivitiesResponse>;
  public expertActivitiesStorageName = 'expert activities';
  public restoreFilterFromStorage;
  public isActivitiesUpdate$ = new BehaviorSubject<boolean>(false);
  public totalItemsCount$ = new BehaviorSubject(null);
  public isFilteredList = false;
  public byDescendingParam: string | string[] = String(!SORT_OPTIONS.surname.isDesc);
  public sortingParam: string | string[] = String(SORT_OPTIONS.surname.control);
  public showScrollButton = false;
  public isShowLoader$ = new BehaviorSubject<boolean>(false);

  constructor(
    private expertActivitiesService: ExpertActivitiesService,
    private locationService: LocationService,
    private technologyService: TechnologyService,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.locationsList$ = this.locationService.getLocations();
    this.technologiesList$ = this.technologyService.getTechnologies();
    this.technologiesLevelList$ = this.technologyService.getTechnologyLevels();
    this.setExpertActivitiesList();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollButton = window.pageYOffset > window.innerHeight;
  }

  public scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public onSendPageNumber(page: number): void {
    this.pageNumber = page.toString();
    this.setExpertActivitiesList();
    this.scrollTop();
  }

  public onSendItemsCount(count: string): void {
    this.pageSize = count;
    this.pageNumber = '1';
    this.setExpertActivitiesList();
    this.scrollTop();
  }

  public getFilteredList(filteredData: IActivitiesStorage): void {
    this.isShowLoader$.next(true);
    this.pageNumber = '1';

    const requestData = {
      page: this.pageNumber,
      pageSize: this.pageSize,
      surname: filteredData.surname,
      locations: filteredData.locations.toString(),
      technologies: filteredData.technologies.toString(),
      expertActivities: filteredData.expertActivities,
      technologyLevels: filteredData.technologyLevels.toString(),
      englishLevels: filteredData.englishLevels.toString(),
      sorting: this.sortingParam,
      byDescending: this.byDescendingParam,
    };

    this.expertActivitiesList$ = this.expertActivitiesService.getExpertActivities(requestData)
      .pipe(catchError(() => {
        this.isShowLoader$.next(false);

        return throwError(null);
      }));
  }

  public getTotalItemsCount(count: number): void {
    this.totalItemsCount$.next(count);
    this.isShowLoader$.next(false);
    this.cdr.detectChanges();
  }

  public resetFilteredList(): void {
    this.pageNumber = '1';

    const requestData = {
      page: this.pageNumber,
      pageSize: this.pageSize,
      sorting: this.sortingParam,
      byDescending: this.byDescendingParam,
    };

    this.expertActivitiesList$ = this.expertActivitiesService.getExpertActivities(requestData);
  }

  public onSortChange({ sorting, byDescending }: IActivitiesParams): void {
    const requestData: IActivitiesParams = {
      ...this.getRequestList(),
      sorting,
      byDescending,
      page: '1'
    };

    this.sortingParam = sorting;
    this.byDescendingParam = byDescending;
    this.isFilteredList = false;
    this.expertActivitiesList$ = this.expertActivitiesService.getExpertActivities(requestData);
  }

  public onUpdateSortOptions({ sorting, byDescending }: IActivitiesParams): void {
    this.sortingParam = sorting;
    this.byDescendingParam = byDescending;
  }

  private getRequestList(): IActivitiesParams {
    const requestParams: IActivitiesParams = {
      page: this.pageNumber,
      pageSize: this.pageSize,
      byDescending: this.byDescendingParam,
      sorting: this.sortingParam
    };

    this.restoreFilterFromStorage = this.localStorageService.getItem(this.expertActivitiesStorageName);
    if (this.restoreFilterFromStorage) {
      requestParams.englishLevels = this.restoreFilterFromStorage.englishLevels.toString();
      requestParams.expertActivities = this.restoreFilterFromStorage.expertActivities;
      requestParams.locations = this.restoreFilterFromStorage.locations.toString();
      requestParams.surname = this.restoreFilterFromStorage.surname;
      requestParams.technologies = this.restoreFilterFromStorage.technologies.toString();
      requestParams.technologyLevels = this.restoreFilterFromStorage.technologyLevels.toString();
    }

    return requestParams;
  }

  private setExpertActivitiesList(): void {
    const requestParams = this.getRequestList();

    this.expertActivitiesList$ = this.expertActivitiesService.getExpertActivities(requestParams);
  }
}
