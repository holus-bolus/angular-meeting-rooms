import { PaginationComponent } from './../../../core/andkit/components/other/pagination/pagination.component';
import { ExpertActivitiesModalComponent } from './../expert-activities-modal/expert-activities-modal.component';
import { IActivities, IActivitiesResponse, IActivityDetails } from '@interfaces/expert-activities.interface';
import { BehaviorSubject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { ExpertActivitiesTableComponent } from './expert-activities-table.component';
import { SORT_OPTIONS } from '../expert-activities.const';
import { cloneDeep } from 'lodash';

const activitiesMock: IActivities[] = [
  { activityName: 'ACTIVITY_NAME_1', id: 'ID_1', isActive: true },
  { activityName: 'ACTIVITY_NAME_2', id: 'ID_2', isActive: true },
  { activityName: 'ACTIVITY_NAME_3', id: 'ID_3', isActive: false },
  { activityName: 'ACTIVITY_NAME_4', id: 'ID_4', isActive: true },
];

const activityDetailsMock: IActivityDetails = {
  canEdit: true,
  employeeId: 'EMPLOYEE_ID',
  englishLevel: 'ENGLISH_LEVEL',
  expertActivities: [],
  location: 'LOCATION',
  nameEn: 'NAME_EN',
  nameRu: 'ИМЯ_РУ',
  technologies: []
};

const expertActivitiesMock: IActivitiesResponse[] = [
  { page: 1, pageSize: 1, expertActivities: [{ ...activityDetailsMock }], totalItems: 1, totalPages: 1 },
  { page: 2, pageSize: 2, expertActivities: [], totalItems: 2, totalPages: 2 },
  { page: 3, pageSize: 3, expertActivities: [], totalItems: 3, totalPages: 3 },
  { page: 4, pageSize: 4, expertActivities: [], totalItems: 4, totalPages: 4 },
  { page: 5, pageSize: 5, expertActivities: [], totalItems: 5, totalPages: 5 }
];

describe('ExpertActivitiesTableComponent', () => {
  let component: ExpertActivitiesTableComponent;
  let fixture: ComponentFixture<ExpertActivitiesTableComponent>;

  const expectActivitiesServiceSpy = jasmine.createSpyObj('ExpertActivitiesService', [
    'getEmployeeExpertActivities',
    'updateExpertActivities'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertActivitiesTableComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ExpertActivitiesService, useValue: expectActivitiesServiceSpy },
        {
          provide: MatDialog,
          useValue: {
            open: () => ({ componentInstance: { checkedActivities: of([...activitiesMock]) } })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertActivitiesTableComponent);
    component = fixture.componentInstance;

    expectActivitiesServiceSpy.updateExpertActivities.and.returnValue(of(true));
    expectActivitiesServiceSpy.getEmployeeExpertActivities.and.returnValue(of(expectActivitiesServiceSpy));
  });

  afterEach(() => fixture.destroy());

  it('should create ExpertActivitiesTableComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('editActivitiesModal', () => {

    beforeEach(() => {
      component.expertActivitiesList$ = new BehaviorSubject(expertActivitiesMock[0]);
    });

    it('should call expertActivitiesService.getEmployeeExpertActivities', () => {
      const service = TestBed.inject(ExpertActivitiesService);

      component.editActivitiesModal(activityDetailsMock);

      expect(service.getEmployeeExpertActivities).toHaveBeenCalledWith('EMPLOYEE_ID');
    });

    it('should call modalWindow.open', () => {
      const modal = TestBed.inject(MatDialog);
      spyOn(modal, 'open').and.callThrough();

      component.editActivitiesModal(activityDetailsMock);

      expect(modal.open).toHaveBeenCalledWith(ExpertActivitiesModalComponent, jasmine.any(Object));
    });

    it('should call modalWindow.open', () => {
      const modal = TestBed.inject(MatDialog);
      spyOn(modal, 'open').and.callThrough();

      component.editActivitiesModal(activityDetailsMock);

      expect(modal.open).toHaveBeenCalledWith(ExpertActivitiesModalComponent, jasmine.any(Object));
    });

    it('should call updateExpertActivities', () => {
      spyOn(component, 'updateExpertActivities').and.callFake(() => { });

      component.editActivitiesModal(activityDetailsMock);

      expect(component.updateExpertActivities).toHaveBeenCalledWith(jasmine.any(Array), 'EMPLOYEE_ID');
    });

    it('should call editedActivitiesEmit.emit', () => {
      spyOn(component.editedActivitiesEmit, 'emit');

      component.editActivitiesModal(activityDetailsMock);

      expect(component.editedActivitiesEmit.emit).toHaveBeenCalledWith(activitiesMock);
    });
  });

  it('setupPaginationConfig should set paginationConfig', () => {
    component.expertActivitiesList$ = new BehaviorSubject(expertActivitiesMock[0]);

    component.paginationConfig = null;
    expect(component.paginationConfig).toBeFalsy();

    component.setupPaginationConfig(42);
    expect(component.paginationConfig).toEqual({
      currentPage: 42, itemsPerPage: 1, totalItems: 1
    });
  });

  describe('onSendPageNumber', () => {
    beforeEach(() => {
      component.expertActivitiesList$ = new BehaviorSubject(expertActivitiesMock[0]);
    });

    it('updateSortOptions should emit value', () => {
      component.byDescendingParam = 'BY_DESCENDING_PARAM';
      component.sortingParam = 'SORTING';
      spyOn(component.updateSortOptions, 'emit');

      component.onSendPageNumber(42);

      expect(component.updateSortOptions.emit).toHaveBeenCalledWith({
        byDescending: 'BY_DESCENDING_PARAM',
        sorting: 'SORTING',
      });
    });

    it('sendPageNumber should emit 42', () => {
      spyOn(component.sendPageNumber, 'emit');

      component.onSendPageNumber(42);

      expect(component.sendPageNumber.emit).toHaveBeenCalledWith(42);
    });

    it('should call setupPaginationConfig with 42', () => {
      spyOn(component, 'setupPaginationConfig');

      component.onSendPageNumber(42);

      expect(component.setupPaginationConfig).toHaveBeenCalledWith(42);
    });
  });

  describe('onSendItemsCount', () => {
    it('updateSortOptions should emit value', () => {
      spyOn(component.updateSortOptions, 'emit');
      component.byDescendingParam = 'BY_DESCENDING_PARAM';
      component.sortingParam = 'SORTING';

      component.onSendItemsCount('42');

      expect(component.updateSortOptions.emit).toHaveBeenCalledWith({
        byDescending: 'BY_DESCENDING_PARAM',
        sorting: 'SORTING',
      });
    });

    it('sendItemsCount should emit 42', () => {
      spyOn(component.sendItemsCount, 'emit');

      component.onSendItemsCount('42');

      expect(component.sendItemsCount.emit).toHaveBeenCalledWith('42');
    });
  });

  it('onFadeOut should call isActivitiesUpdate$.next with false', () => {
    spyOn(component.isActivitiesUpdate$, 'next');

    component.onFadeOut();

    expect(component.isActivitiesUpdate$.next).toHaveBeenCalledWith(false);
  });

  describe('onSortChange', () => {

    beforeEach(() => {
      component.sortOptions = cloneDeep(SORT_OPTIONS);
    });

    it('should set isisFilteredList to false', () => {
      component.isFilteredList = null;

      expect(component.isFilteredList).toBe(null);

      component.onSortChange('surname', 0);

      expect(component.isFilteredList).toBe(false);
    });

    it('should toggle isDesc', () => {
      component.sortOptions.surname.isDesc = true;

      expect(component.sortOptions.surname.isDesc).toBe(true);

      component.onSortChange('surname', 0);

      expect(component.sortOptions.surname.isDesc).toBe(false);
    });

    it('should set sortingParam to 0', () => {
      component.sortingParam = '';

      expect(component.sortingParam).toBeFalsy();

      component.onSortChange('surname', 0);

      expect(component.sortingParam).toBe('0');
    });

    it('should set byDescendingParam  to true', () => {
      component.byDescendingParam = '';

      expect(component.byDescendingParam).toBeFalsy();
      expect(component.sortOptions.surname.isDesc).toBeTrue();

      component.onSortChange('surname', 0);

      expect(component.sortOptions.surname.isDesc).toBeFalse();
      expect(component.byDescendingParam).toBe('true');
    });

    it('should set sortOptions.surname.isActive to true', () => {
      component.sortOptions.surname.isActive = false;

      expect(component.sortOptions.surname.isActive).toBeFalse();

      component.onSortChange('surname', 0);

      expect(component.sortOptions.surname.isActive).toBe(true);
    });

    it('sortChange should emit value', () => {
      spyOn(component.sortChange, 'emit');

      component.onSortChange('surname', 0);

      expect(component.sortChange.emit).toHaveBeenCalledWith({
        byDescending: 'true', sorting: '0'
      });
    });
  });

  it('resetSortOptions should set sortOptions.surname.isActive to true', () => {
    component.sortOptions.surname.isActive = false;
    expect(component.sortOptions.surname.isActive).toBeFalse();

    component['resetSortOptions']();

    expect(component.sortOptions.surname.isActive).toBeTrue();
  });

});
