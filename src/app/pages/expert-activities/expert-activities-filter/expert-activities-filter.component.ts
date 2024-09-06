import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import {
  expertActivitiesFilterControls,
  FILTER_PLACEHOLDERS,
  TYPE_OF_ACTIVITIES
} from '@pages/expert-activities/expert-activities.const';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { FormBuilder } from '@angular/forms';
import { ICommonOption } from '@interfaces/filter';
import { BehaviorSubject, iif, Observable, of, timer } from 'rxjs';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { map, switchMap } from 'rxjs/operators';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { IActivitiesStorage } from '@interfaces/expert-activities.interface';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'andteam-expert-activities-filter',
  templateUrl: './expert-activities-filter.component.html',
  styleUrls: ['./expert-activities-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpertActivitiesFilterComponent implements OnInit {
  @Input() set locationsList(value: ICommonOption[]) {
    if (value) {
      this.locationsList$.next(this.getDataList(value, expertActivitiesFilterControls.LOCATIONS));
      this.filtersForm.controls.locations.setValue(this.getControlList(this.locationsList$.value));
    }
  }

  @Input() set technologiesList(value: ICommonOption[]) {
    if (value) {
      this.technologiesList$.next(this.getDataList(value, expertActivitiesFilterControls.TECHNOLOGIES));
      this.filtersForm.controls.technologies.setValue(this.getControlList(this.technologiesList$.value));
    }
  }

  @Input() set techLevelList(values: ITechnologyLevel[]) {
    if (values) {
      const techLevels: ICommonOption[] = values.map(({ shortName }: ITechnologyLevel) => ({ id: shortName, name: shortName }));

      this.technologyLevelList$.next(this.getDataList(techLevels, expertActivitiesFilterControls.TECHNOLOGY_LEVELS));
      this.filtersForm.controls.technologyLevels.setValue(this.getControlList(this.technologyLevelList$.value));
    }
  }

  @Input() set englishLevelList(value: ICommonOption[]) {
    if (value) {
      this.englishLevelList$.next(this.getDataList(value, expertActivitiesFilterControls.ENGLISH_LEVELS));
      this.filtersForm.controls.englishLevels.setValue(this.getControlList(this.englishLevelList$.value));
    }
  }

  @Output() filteredData = new EventEmitter<IActivitiesStorage>();
  @Output() resetData = new EventEmitter<void>();

  public placeholders = FILTER_PLACEHOLDERS;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public typeOfActivitiesList = TYPE_OF_ACTIVITIES;
  public surnameList$: Observable<ICommonOption[]>;
  public controlsList = expertActivitiesFilterControls;
  public expertActivitiesTypeOption$ = new BehaviorSubject<ICommonOption>(null);
  public expertActivitiesStorageName = 'expert activities';
  public locationsList$ = new BehaviorSubject<ICommonOption[]>(null);
  public technologiesList$ = new BehaviorSubject<ICommonOption[]>(null);
  public technologyLevelList$ = new BehaviorSubject<ICommonOption[]>(null);
  public englishLevelList$ = new BehaviorSubject<ICommonOption[]>(null);
  public filtersForm = this.formBuilder.group({
    surname: '',
    expertActivities: '',
    technologies: [],
    locations: [],
    technologyLevels: [],
    englishLevels: [],
  });

  constructor(
    private formBuilder: FormBuilder,
    private expertActivitiesService: ExpertActivitiesService,
    private localStorageService: LocalStorageService,
  ) { }

  public ngOnInit(): void {
    const restoreFilterFromSessionStorage = this.localStorageService.getItem(this.expertActivitiesStorageName);

    if (restoreFilterFromSessionStorage) {
      if (restoreFilterFromSessionStorage.expertActivities) {
        this.expertActivitiesTypeOption$.next(
          {
            name: restoreFilterFromSessionStorage.expertActivities,
            id: restoreFilterFromSessionStorage.expertActivities
          }
        );

        this.filtersForm.controls.expertActivities.setValue(restoreFilterFromSessionStorage.expertActivities);
      }

      this.filtersForm.controls.surname.setValue(restoreFilterFromSessionStorage.surname);
    }

    this.surnameList$ = this.getSurnameList$();
  }

  public onCheckTechnologiesOption(option: ICommonOption): void {
    this.technologiesList$.next(this.getCheckedData(this.technologiesList$.value, option));
    this.filtersForm.get(this.controlsList.TECHNOLOGIES).setValue(this.getFormData(this.technologiesList$.value));

    if (this.filtersForm.get(this.controlsList.SURNAME).value) {
      this.surnameList$ = this.getSurnameList$();
    }
  }

  public onCheckLocationOption(option: ICommonOption): void {
    this.locationsList$.next(this.getCheckedData(this.locationsList$.value, option));
    this.filtersForm.get(this.controlsList.LOCATIONS).setValue(this.getFormData(this.locationsList$.value));

    if (this.filtersForm.get(this.controlsList.SURNAME).value) {
      this.surnameList$ = this.getSurnameList$();
    }
  }

  public onCheckLocationOptions(options: ICommonOption[]): void {
    this.locationsList$.next(options);
    this.filtersForm.get(this.controlsList.LOCATIONS).setValue(this.getFormData(this.locationsList$.value));

    if (this.filtersForm.get(this.controlsList.SURNAME).value) {
      this.surnameList$ = this.getSurnameList$();
    }
  }

  public onCheckLevelTechnologyOption(option: ICommonOption): void {
    this.technologyLevelList$.next(this.getCheckedData(this.technologyLevelList$.value, option));
    this.filtersForm.get(this.controlsList.TECHNOLOGY_LEVELS).setValue(this.getFormData(this.technologyLevelList$.value));

    if (this.filtersForm.get(this.controlsList.SURNAME).value) {
      this.surnameList$ = this.getSurnameList$();
    }
  }

  public onCheckEnglishLevelOption(option: ICommonOption): void {
    this.englishLevelList$.next(this.getCheckedData(this.englishLevelList$.value, option));
    this.filtersForm.get(this.controlsList.ENGLISH_LEVELS).setValue(this.getFormData(this.englishLevelList$.value));

    if (this.filtersForm.get(this.controlsList.SURNAME).value) {
      this.surnameList$ = this.getSurnameList$();
    }
  }

  public onSelectActivity({ name }: ICommonOption): void {
    this.filtersForm.get(this.controlsList.EXPERT_ACTIVITIES).setValue(name);

    if (this.filtersForm.get(this.controlsList.SURNAME).value) {
      this.surnameList$ = this.getSurnameList$();
    }
  }

  public onFilterApply(): void {
    const expertActivitiesStorageBody = {
      surname: this.filtersForm.value.surname || '',
      expertActivities: this.filtersForm.value.expertActivities || '',
      technologies: this.filtersForm.value.technologies || [],
      locations: this.filtersForm.value.locations || [],
      technologyLevels: this.filtersForm.value.technologyLevels || [],
      englishLevels: this.filtersForm.value.englishLevels || []
    };

    this.localStorageService.setItem(this.expertActivitiesStorageName, expertActivitiesStorageBody);
    this.filteredData.emit(expertActivitiesStorageBody);
  }

  public onFilterReset(): void {
    this.localStorageService.removeItem(this.expertActivitiesStorageName);
    this.filtersForm.reset({
      surname: '',
      expertActivities: '',
      technologies: [],
      locations: [],
      technologyLevels: [],
      englishLevels: [],
    });

    this.technologiesList$.next(this.resetCheckedProperty(this.technologiesList$.value));
    this.locationsList$.next(this.resetCheckedProperty(this.locationsList$.value));
    this.technologyLevelList$.next(this.resetCheckedProperty(this.technologyLevelList$.value));
    this.englishLevelList$.next(this.resetCheckedProperty(this.englishLevelList$.value));
    this.surnameList$ = this.getSurnameList$();
    this.expertActivitiesTypeOption$.next({ name: null, id: null });
    this.resetData.emit();
  }

  private getSurnameList$(): Observable<ICommonOption[]> {
    return this.filtersForm.get(this.controlsList.SURNAME).valueChanges.pipe(
      switchMap((value: string) => iif(
        () => value.length > 2,
        timer(INITIAL_DELAY)
          .pipe(
            switchMap(() => this.getFormParams()),
          ),
        of([])
      )),
    );
  }

  private getCheckedData(items: ICommonOption[], option: ICommonOption): ICommonOption[] {
    return items.map((item: ICommonOption) => {
      return item.id === option.id
        ? { ...item, checked: !item.checked }
        : item;
    });
  }

  private getFormData(items: ICommonOption[]): string[] {
    return items.reduce((data: string[], item: ICommonOption) => {
      if (item.checked) {
        data.push(item.name);
      }

      return data;
    },                  []);
  }

  private getFormParams(): Observable<ICommonOption[]> {
    return this.expertActivitiesService.getFilteredList({
      startWith: this.filtersForm.get(this.controlsList.SURNAME).value,
      locations: this.filtersForm.get(this.controlsList.LOCATIONS).value
        ? this.filtersForm.get(this.controlsList.LOCATIONS).value.toString()
        : '',
      technologies: this.filtersForm.get(this.controlsList.TECHNOLOGIES).value
        ? this.filtersForm.get(this.controlsList.TECHNOLOGIES).value.toString()
        : '',
      expertActivities: this.filtersForm.get(this.controlsList.EXPERT_ACTIVITIES).value || '',
      technologyLevels: this.filtersForm.get(this.controlsList.TECHNOLOGY_LEVELS).value
        ? this.filtersForm.get(this.controlsList.TECHNOLOGY_LEVELS).value.toString()
        : '',
      englishLevels: this.filtersForm.get(this.controlsList.ENGLISH_LEVELS).value
        ? this.filtersForm.get(this.controlsList.ENGLISH_LEVELS).value.toString()
        : ''
    })
      .pipe(
        map((request: string[]) => request.length
          ? request.map((value: string) => ({ name: value, id: '' }))
          : null
        )
      );
  }

  private resetCheckedProperty(items: ICommonOption[]): ICommonOption[] {
    return items.map((item: ICommonOption) => {
      return { ...item, checked: false };
    });
  }

  private getDataList(value: ICommonOption[], storageData: string): ICommonOption[] {
    return value.map((location: ICommonOption) => {
      if (this.localStorageService.getItem(this.expertActivitiesStorageName)) {
        this.localStorageService.getItem(this.expertActivitiesStorageName)[storageData].includes(location.name)
          ? location.checked = true
          : location.checked = false;
      }

      return location;
    });
  }

  private getControlList(list: ICommonOption[]): string[] {
    return list
      .filter(({ checked }: ICommonOption) => checked)
      .map(({ name }: ICommonOption) => name);
  }
}
