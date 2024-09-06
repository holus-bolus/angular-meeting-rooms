import { of, Observable } from 'rxjs';
import { ITechnologyLevel } from './../../interfaces/technology-levels';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ICommonOption } from '@interfaces/filter';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { LocationService } from '@services/location.service';
import { TechnologyService } from '@services/technology.service';
import { ExpertActivitiesComponent } from './expert-activities.component';
import { LocalStorageService } from '@services/local-storage.service';
import { IActivitiesResponse, IActivitiesStorage, IActivitiesParams } from '@interfaces/expert-activities.interface';

const technologiesMock: ICommonOption[] = [
  { id: '1', name: 'TECHNOLOGY_1' },
  { id: '2', name: 'TECHNOLOGY_2' },
  { id: '3', name: 'TECHNOLOGY_3' },
  { id: '4', name: 'TECHNOLOGY_4' },
  { id: '5', name: 'TECHNOLOGY_5' }
];

const technologyLevelsMock: ITechnologyLevel[] = [
  { shortName: 'TECH_LVL_1', fullName: 'TECHNOLOGY_LEVEL_1' },
  { shortName: 'TECH_LVL_2', fullName: 'TECHNOLOGY_LEVEL_2' },
  { shortName: 'TECH_LVL_3', fullName: 'TECHNOLOGY_LEVEL_3' },
  { shortName: 'TECH_LVL_4', fullName: 'TECHNOLOGY_LEVEL_4' },
  { shortName: 'TECH_LVL_5', fullName: 'TECHNOLOGY_LEVEL_5' }
];

const locationsMock: ICommonOption[] = [
  { id: 'LOC_ID_1', name: 'LOCATION_1' },
  { id: 'LOC_ID_2', name: 'LOCATION_2' },
  { id: 'LOC_ID_3', name: 'LOCATION_3' },
  { id: 'LOC_ID_4', name: 'LOCATION_4' },
  { id: 'LOC_ID_5', name: 'LOCATION_5' }
];

const activitiesStorageMock: IActivitiesStorage = {
  surname: 'SURNAME',
  expertActivities: 'EXPERT_ACTIVITIES',
  technologies: [],
  locations: [],
  technologyLevels: [],
  englishLevels: []
};

const expertActivitiesMock: IActivitiesResponse[] = [
  { page: 1, pageSize: 1, expertActivities: [], totalItems: 1, totalPages: 1 },
  { page: 2, pageSize: 2, expertActivities: [], totalItems: 2, totalPages: 2 },
  { page: 3, pageSize: 3, expertActivities: [], totalItems: 3, totalPages: 3 },
  { page: 4, pageSize: 4, expertActivities: [], totalItems: 4, totalPages: 4 },
  { page: 5, pageSize: 5, expertActivities: [], totalItems: 5, totalPages: 5 }
];

const activitiesParamsMock: IActivitiesParams = {
  sorting: 'SORTING',
  byDescending: 'BY_DESCENDING'
};

const storageFiltersMock = {
  surname: 'Иванов Виктор',
  expertActivities: 'Meetups',
  technologies: ['.Net'],
  locations: ['Cherkasy'],
  technologyLevels: ['J1'],
  englishLevels: ['A2']
};

describe('ExpertActivitiesComponent', () => {
  let component: ExpertActivitiesComponent;
  let fixture: ComponentFixture<ExpertActivitiesComponent>;

  const expertActivitiesServiceSpy = jasmine.createSpyObj('ExpertActivitiesService', ['getExpertActivities']);
  const locationServiceSpy = jasmine.createSpyObj('LocationService', ['getLocations']);
  const technologyServiceSpy = jasmine.createSpyObj('TechnologyService', ['getTechnologies', 'getTechnologyLevels']);
  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItem']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertActivitiesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: ExpertActivitiesService, useValue: expertActivitiesServiceSpy },
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: TechnologyService, useValue: technologyServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertActivitiesComponent);
    component = fixture.componentInstance;

    technologyServiceSpy.getTechnologies.and.returnValue(of([...technologiesMock]));
    technologyServiceSpy.getTechnologyLevels.and.returnValue(of([...technologyLevelsMock]));
    locationServiceSpy.getLocations.and.returnValue(of([...locationsMock]));
    expertActivitiesServiceSpy.getExpertActivities.and.returnValue(of([...expertActivitiesMock]));
  });

  afterEach(() => fixture.destroy());

  it('should create ExpertActivitiesComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set variables', () => {
      expect(component.locationsList$).toBeFalsy();
      expect(component.technologiesList$).toBeFalsy();
      expect(component.technologiesLevelList$).toBeFalsy();

      fixture.detectChanges();

      expect(component.locationsList$).toEqual(jasmine.any(Observable));
      expect(component.technologiesList$).toEqual(jasmine.any(Observable));
      expect(component.technologiesLevelList$).toEqual(jasmine.any(Observable));
    });

    it('should call setExpertActivitiesList', () => {
      spyOn<any>(component, 'setExpertActivitiesList');

      fixture.detectChanges();

      expect(component['setExpertActivitiesList']).toHaveBeenCalledTimes(1);
    });
  });

  it('scrollTop should call window.scrollTo', () => {
    spyOn(window, 'scrollTo');

    component.scrollTop();

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  describe('onSendPageNumber', () => {
    it('should set pageNumber', () => {
      component.pageNumber = null;
      expect(component.pageNumber).toBeFalsy();

      component.onSendPageNumber(6);

      expect(component.pageNumber).toEqual(jasmine.any(String));
      expect(component.pageNumber).toBe('6');
    });

    it('should call setExpertActivitiesList and scrollTop', () => {
      spyOn<any>(component, 'setExpertActivitiesList');
      spyOn(component, 'scrollTop');

      component.onSendPageNumber(5);

      expect(component['setExpertActivitiesList']).toHaveBeenCalledTimes(1);
      expect(component.scrollTop).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSendItemsCount', () => {
    it('should set pageSize and pageNumber', () => {
      component.pageSize = null;
      component.pageNumber = null;

      expect(component.pageSize).toBeFalsy();
      expect(component.pageNumber).toBeFalsy();

      component.onSendItemsCount('42');

      expect(component.pageSize).toBe('42');
      expect(component.pageNumber).toBe('1');
    });

    it('should call setExpertActivitiesList and scrollTop', () => {
      spyOn<any>(component, 'setExpertActivitiesList');
      spyOn(component, 'scrollTop');

      component.onSendItemsCount('42');

      expect(component['setExpertActivitiesList']).toHaveBeenCalledTimes(1);
      expect(component.scrollTop).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFilteredList', () => {
    it('isShowLoader should emit true', () => {
      spyOn(component.isShowLoader$, 'next');

      component.getFilteredList(activitiesStorageMock);

      expect(component.isShowLoader$.next).toHaveBeenCalledOnceWith(true);
    });

    it('should set pageNumber to 1', () => {
      component.pageNumber = null;
      expect(component.pageNumber).toBeFalsy();

      component.getFilteredList(activitiesStorageMock);

      expect(component.pageNumber).toBe('1');
    });

    it('should set Observable to expertActivitiesList$', () => {
      component['expertActivitiesList$'] = null;
      expect(component['expertActivitiesList$']).toBeFalsy();

      component.getFilteredList(activitiesStorageMock);

      expect(component['expertActivitiesList$']).toEqual(jasmine.any(Observable));
    });

    it('should call expertActivitiesService.getExpertActivities', () => {
      const service = TestBed.inject(ExpertActivitiesService);

      component.getFilteredList(activitiesStorageMock);

      expect(service.getExpertActivities).toHaveBeenCalledWith(jasmine.any(Object));
    });
  });

  describe('getTotalItemsCount', () => {
    it('totalItemsCount$ should emit count', () => {
      spyOn(component.totalItemsCount$, 'next');

      component.getTotalItemsCount(42);

      expect(component.totalItemsCount$.next).toHaveBeenCalledWith(42);
    });

    it('isShowLoader$ should emit false', () => {
      spyOn(component.isShowLoader$, 'next');

      component.getTotalItemsCount(42);

      expect(component.isShowLoader$.next).toHaveBeenCalledWith(false);
    });
  });

  describe('resetFilteredList', () => {
    it('should call expertActivitiesService.getExpertActivities', () => {
      localStorageServiceSpy.getItem.and.returnValue(null);
      const service = TestBed.inject(ExpertActivitiesService);

      component.pageSize = '666';
      component.sortingParam = 'SORTING_PARAM';
      component.byDescendingParam = 'BY_DESCENDING_PARAM';

      const requestData = {
        page: '1',
        pageSize: '666',
        sorting: 'SORTING_PARAM',
        byDescending: 'BY_DESCENDING_PARAM',
      };

      component.resetFilteredList();

      expect(service.getExpertActivities).toHaveBeenCalledWith(requestData);
    });

    it('should set Observable to expertActivitiesList$', () => {
      component['expertActivitiesList$'] = null;

      expect(component['expertActivitiesList$']).toBeFalsy();

      component.resetFilteredList();

      expect(component['expertActivitiesList$']).toEqual(jasmine.any(Observable));
    });
  });

  describe('onSortChange', () => {
    it('should call expertActivitiesService.getExpertActivities', () => {
      localStorageServiceSpy.getItem.and.returnValue(null);
      const service = TestBed.inject(ExpertActivitiesService);

      component.pageSize = '666';
      component.sortingParam = 'SORTING_PARAM';
      component.byDescendingParam = 'BY_DESCENDING_PARAM';

      const requestData = {
        page: '1',
        pageSize: '666',
        sorting: 'SORTING',
        byDescending: 'BY_DESCENDING'
      };

      component.onSortChange(activitiesParamsMock);

      expect(service.getExpertActivities).toHaveBeenCalledWith(requestData);
    });

    it('should set Observable to expertActivitiesList$', () => {
      component['expertActivitiesList$'] = null;

      expect(component['expertActivitiesList$']).toBeFalsy();

      component.onSortChange(activitiesParamsMock);

      expect(component['expertActivitiesList$']).toEqual(jasmine.any(Observable));
    });

    it('should set sortingParam, byDescendingParam and isFilteredList ', () => {
      component.sortingParam = null;
      component.byDescendingParam = null;
      component.isFilteredList = true;

      expect(component.sortingParam).toBeFalsy();
      expect(component.byDescendingParam).toBeFalsy();
      expect(component.isFilteredList).toBeTrue();

      component.onSortChange(activitiesParamsMock);

      expect(component.sortingParam).toBe('SORTING');
      expect(component.byDescendingParam).toBe('BY_DESCENDING');
      expect(component.isFilteredList).toBeFalse();
    });
  });

  it('onUpdateSortOptions should set sortingParam and byDescendingParam', () => {
    component.sortingParam = null;
    component.byDescendingParam = null;

    expect(component.sortingParam).toBeFalsy();
    expect(component.byDescendingParam).toBeFalsy();

    component.onUpdateSortOptions(activitiesParamsMock);

    expect(component.sortingParam).toBe('SORTING');
    expect(component.byDescendingParam).toBe('BY_DESCENDING');
  });

  it('getRequestList', () => {
    localStorageServiceSpy.getItem.and.returnValue(storageFiltersMock);
    component.pageNumber = '42';
    component.pageSize = '42';
    component.byDescendingParam = 'BY_DESCENDING';
    component.sortingParam = 'SORTING';

    const actual = component['getRequestList']();
    const expected = {
      ...storageFiltersMock,
      englishLevels: storageFiltersMock.englishLevels.toString(),
      locations: storageFiltersMock.locations.toString(),
      technologies: storageFiltersMock.technologies.toString(),
      technologyLevels: storageFiltersMock.technologyLevels.toString(),
      page: '42',
      pageSize: '42',
      sorting: 'SORTING',
      byDescending: 'BY_DESCENDING',
    };

    expect(actual).toEqual(expected);
  });

  it('onWindowScroll should set value to showScrollButton ', () => {
    component.showScrollButton = null;
    expect(component.showScrollButton).toBe(null);

    component.onWindowScroll();
    expect(component.showScrollButton).toBe(false);
  });
});
