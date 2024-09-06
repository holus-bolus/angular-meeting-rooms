import { Observable, of } from 'rxjs';
import { ICommonOption } from './../../../interfaces/filter';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { LocalStorageService } from '@services/local-storage.service';
import { ExpertActivitiesFilterComponent } from './expert-activities-filter.component';
import { ITechnologyLevel } from '@interfaces/technology-levels';
import { IActivitiesStorage } from '@interfaces/expert-activities.interface';
import { cloneDeep } from 'lodash';

const commonOptionMock: ICommonOption<string>[] = [
  { id: '1', name: 'NAME_1' },
  { id: '2', name: 'NAME_2' },
  { id: '3', name: 'NAME_3' },
  { id: '4', name: 'NAME_4' }
];

const techLevelMock: ITechnologyLevel[] = [
  { shortName: 'SHORT_NAME_1', fullName: 'FULL_NAME_1' },
  { shortName: 'SHORT_NAME_2', fullName: 'FULL_NAME_2' },
  { shortName: 'SHORT_NAME_3', fullName: 'FULL_NAME_3' },
  { shortName: 'SHORT_NAME_4', fullName: 'FULL_NAME_4' }
];

const activitiesStorageMock: IActivitiesStorage = {
  surname: 'SURNAME',
  expertActivities: 'EXPERT_ACTIVITIES',
  technologies: [],
  locations: [],
  technologyLevels: [],
  englishLevels: []
};

describe('ExpertActivitiesFilterComponent', () => {
  let component: ExpertActivitiesFilterComponent;
  let fixture: ComponentFixture<ExpertActivitiesFilterComponent>;

  const expertActivitiesServiceSpy = jasmine.createSpyObj('ExpertActivitiesService', ['getFilteredList']);
  const localStorageService = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem', 'removeItem']);
  localStorageService.getItem.and.returnValue(activitiesStorageMock);

  const mockFormBuilder = {
    group: () => new FormGroup({
      surname: new FormControl(''),
      expertActivities: new FormControl(''),
      technologies: new FormControl([]),
      locations: new FormControl([]),
      technologyLevels: new FormControl([]),
      englishLevels: new FormControl([]),
    })
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertActivitiesFilterComponent],
      imports: [],
      providers: [
        { provide: ExpertActivitiesService, useValue: expertActivitiesServiceSpy },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: LocalStorageService, useValue: localStorageService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertActivitiesFilterComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create ExpertActivitiesFilterComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('@Inputs', () => {
    let getDataSpy: jasmine.Spy;
    let getControlsSpy: jasmine.Spy;

    beforeEach(() => {
      getDataSpy = spyOn<any>(component, 'getDataList');
      getDataSpy.and.callFake(() => commonOptionMock);

      getControlsSpy = spyOn<any>(component, 'getControlList');
      getControlsSpy.and.callFake(() => ['control1', 'control2', 'control3']);
    });

    it('locationsList | locationsList$ should emit value', () => {
      spyOn(component.locationsList$, 'next');

      component.locationsList = commonOptionMock;

      expect(component['getDataList']).toHaveBeenCalled();
      expect(component['getControlList']).toHaveBeenCalled();
      expect(component.locationsList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('locationsList | should set locations to form', () => {
      spyOn(component.filtersForm.controls.locations, 'setValue');

      component.locationsList = commonOptionMock;

      expect(component.filtersForm.controls.locations.setValue).toHaveBeenCalledWith(
        ['control1', 'control2', 'control3']
      );
    });

    it('locationsList | should not emit value', () => {
      spyOn(component.locationsList$, 'next');

      component.locationsList = null;

      expect(component['getDataList']).not.toHaveBeenCalled();
      expect(component['getControlList']).not.toHaveBeenCalled();
      expect(component.locationsList$.next).not.toHaveBeenCalled();
    });

    it('technologiesList | technologiesList$ should emit value', () => {
      spyOn(component.technologiesList$, 'next');

      component.technologiesList = commonOptionMock;

      expect(component['getDataList']).toHaveBeenCalled();
      expect(component['getControlList']).toHaveBeenCalled();
      expect(component.technologiesList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('technologiesList | should set technologies to form', () => {
      spyOn(component.filtersForm.controls.technologies, 'setValue');

      component.technologiesList = commonOptionMock;

      expect(component.filtersForm.controls.technologies.setValue).toHaveBeenCalledWith(
        ['control1', 'control2', 'control3']
      );
    });

    it('technologiesList | should not emit value', () => {
      spyOn(component.technologiesList$, 'next');

      component.technologiesList = null;

      expect(component['getDataList']).not.toHaveBeenCalled();
      expect(component['getControlList']).not.toHaveBeenCalled();
      expect(component.technologiesList$.next).not.toHaveBeenCalled();
    });

    it('techLevelList | technologyLevelList$ should emit value', () => {
      spyOn(component.technologyLevelList$, 'next');

      component.techLevelList = techLevelMock;

      expect(component['getDataList']).toHaveBeenCalled();
      expect(component['getControlList']).toHaveBeenCalled();
      expect(component.technologyLevelList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('techLevelList | should set technologyLevels to form', () => {
      spyOn(component.filtersForm.controls.technologyLevels, 'setValue');

      component.techLevelList = techLevelMock;

      expect(component.filtersForm.controls.technologyLevels.setValue).toHaveBeenCalledWith(
        ['control1', 'control2', 'control3']
      );
    });

    it('techLevelList | should not emit value', () => {
      spyOn(component.technologyLevelList$, 'next');

      component.techLevelList = null;

      expect(component['getDataList']).not.toHaveBeenCalled();
      expect(component['getControlList']).not.toHaveBeenCalled();
      expect(component.technologyLevelList$.next).not.toHaveBeenCalled();
    });

    it('englishLevelList | englishLevelList$ should emit value', () => {
      spyOn(component.englishLevelList$, 'next');

      component.englishLevelList = commonOptionMock;

      expect(component['getDataList']).toHaveBeenCalled();
      expect(component['getControlList']).toHaveBeenCalled();
      expect(component.englishLevelList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('englishLevelList | should set technologies to form', () => {
      spyOn(component.filtersForm.controls.englishLevels, 'setValue');

      component.englishLevelList = commonOptionMock;

      expect(component.filtersForm.controls.englishLevels.setValue).toHaveBeenCalledWith(['control1', 'control2', 'control3']);
    });

    it('englishLevelList | should not emit value', () => {
      spyOn(component.englishLevelList$, 'next');

      component.englishLevelList = null;

      expect(component['getDataList']).not.toHaveBeenCalled();
      expect(component['getControlList']).not.toHaveBeenCalled();
      expect(component.englishLevelList$.next).not.toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {

    beforeEach(() => {
      localStorageService.getItem.and.returnValue(activitiesStorageMock);
    });
    it('should emit expertActivitiesTypeOption$.next', () => {
      spyOn(component.expertActivitiesTypeOption$, 'next');

      fixture.detectChanges();

      expect(component.expertActivitiesTypeOption$.next).toHaveBeenCalledWith({
        id: 'EXPERT_ACTIVITIES',
        name: 'EXPERT_ACTIVITIES'
      });
    });

    it('should set  expertActivities to form', () => {
      spyOn(component.filtersForm.controls.expertActivities, 'setValue');

      fixture.detectChanges();

      expect(component.filtersForm.controls.expertActivities.setValue).toHaveBeenCalledWith('EXPERT_ACTIVITIES');
    });

    it('should set  surname to form', () => {
      spyOn(component.filtersForm.controls.surname, 'setValue');

      fixture.detectChanges();

      expect(component.filtersForm.controls.surname.setValue).toHaveBeenCalledWith('SURNAME');
    });

    it('should not set values to form', () => {
      localStorageService.getItem.and.returnValue(null);

      spyOn(component.filtersForm.controls.surname, 'setValue');
      spyOn(component.filtersForm.controls.expertActivities, 'setValue');
      spyOn(component.expertActivitiesTypeOption$, 'next');

      fixture.detectChanges();

      expect(component.expertActivitiesTypeOption$.next).not.toHaveBeenCalled();
      expect(component.filtersForm.controls.surname.setValue).not.toHaveBeenCalled();
      expect(component.filtersForm.controls.expertActivities.setValue).not.toHaveBeenCalled();
    });

    it('should not set values to form.expertActivities', () => {
      localStorageService.getItem.and.returnValue({ ...activitiesStorageMock, expertActivities: null });

      spyOn(component.filtersForm.controls.surname, 'setValue');
      spyOn(component.filtersForm.controls.expertActivities, 'setValue');
      spyOn(component.expertActivitiesTypeOption$, 'next');

      fixture.detectChanges();

      expect(component.expertActivitiesTypeOption$.next).not.toHaveBeenCalled();
      expect(component.filtersForm.controls.expertActivities.setValue).not.toHaveBeenCalled();

      expect(component.filtersForm.controls.surname.setValue).toHaveBeenCalled();
    });
  });

  describe('onCheckTechnologiesOption', () => {
    let getCheckedDataSpy: jasmine.Spy;
    let getFormDataSpy: jasmine.Spy;

    beforeEach(() => {
      getCheckedDataSpy = spyOn<any>(component, 'getCheckedData');
      getCheckedDataSpy.and.callFake(() => [...commonOptionMock]);

      getFormDataSpy = spyOn<any>(component, 'getFormData');
      getFormDataSpy.and.callFake(() => ['formData1', 'formData2', 'formData3']);
    });

    it('technologiesList$ should emit value', () => {
      spyOn(component.technologiesList$, 'next');

      component.onCheckTechnologiesOption(commonOptionMock[0]);

      expect(component.technologiesList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('should set technologies to form', () => {
      spyOn(component.filtersForm.controls.technologies, 'setValue');

      component.onCheckTechnologiesOption(commonOptionMock[0]);

      expect(component.filtersForm.controls.technologies.setValue).toHaveBeenCalledWith(
        ['formData1', 'formData2', 'formData3']
      );
    });

    it('should not call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckTechnologiesOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).not.toHaveBeenCalled();
    });

    it('should call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('surname');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckTechnologiesOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCheckLocationOption', () => {
    let getCheckedDataSpy: jasmine.Spy;
    let getFormDataSpy: jasmine.Spy;

    beforeEach(() => {
      getCheckedDataSpy = spyOn<any>(component, 'getCheckedData');
      getCheckedDataSpy.and.callFake(() => [...commonOptionMock]);

      getFormDataSpy = spyOn<any>(component, 'getFormData');
      getFormDataSpy.and.callFake(() => ['formData1', 'formData2', 'formData3']);
    });

    it('locationsList$ should emit value', () => {
      spyOn(component.locationsList$, 'next');

      component.onCheckLocationOption(commonOptionMock[0]);

      expect(component.locationsList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('should set location to form', () => {
      spyOn(component.filtersForm.controls.locations, 'setValue');

      component.onCheckLocationOption(commonOptionMock[0]);

      expect(component.filtersForm.controls.locations.setValue).toHaveBeenCalledWith(
        ['formData1', 'formData2', 'formData3']
      );
    });

    it('should not call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckLocationOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).not.toHaveBeenCalled();
    });

    it('should call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('surname');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckLocationOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCheckLocationOptions', () => {
    let getFormDataSpy: jasmine.Spy;

    beforeEach(() => {
      getFormDataSpy = spyOn<any>(component, 'getFormData');
      getFormDataSpy.and.callFake(() => ['formData1', 'formData2', 'formData3']);
    });

    it('locationsList$ should emit value', () => {
      spyOn(component.locationsList$, 'next');

      component.onCheckLocationOptions(commonOptionMock);

      expect(component.locationsList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('should set location to form', () => {
      spyOn(component.filtersForm.controls.locations, 'setValue');

      component.onCheckLocationOptions(commonOptionMock);

      expect(component.filtersForm.controls.locations.setValue).toHaveBeenCalledWith(
        ['formData1', 'formData2', 'formData3']
      );
    });

    it('should not call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckLocationOptions(commonOptionMock);

      expect(component['getSurnameList$']).not.toHaveBeenCalled();
    });

    it('should call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('surname');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckLocationOptions(commonOptionMock);

      expect(component['getSurnameList$']).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCheckLevelTechnologyOption', () => {
    let getCheckedDataSpy: jasmine.Spy;
    let getFormDataSpy: jasmine.Spy;

    beforeEach(() => {
      getCheckedDataSpy = spyOn<any>(component, 'getCheckedData');
      getCheckedDataSpy.and.callFake(() => [...commonOptionMock]);

      getFormDataSpy = spyOn<any>(component, 'getFormData');
      getFormDataSpy.and.callFake(() => ['formData1', 'formData2', 'formData3']);
    });

    it('technologyLevelList$ should emit value', () => {
      spyOn(component.technologyLevelList$, 'next');

      component.onCheckLevelTechnologyOption(commonOptionMock[0]);

      expect(component.technologyLevelList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('should set technologyLevels to form', () => {
      spyOn(component.filtersForm.controls.technologyLevels, 'setValue');

      component.onCheckLevelTechnologyOption(commonOptionMock[0]);

      expect(component.filtersForm.controls.technologyLevels.setValue).toHaveBeenCalledWith(
        ['formData1', 'formData2', 'formData3']
      );
    });

    it('should not call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckLevelTechnologyOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).not.toHaveBeenCalled();
    });

    it('should call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('surname');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckLevelTechnologyOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCheckEnglishLevelOption', () => {
    let getCheckedDataSpy: jasmine.Spy;
    let getFormDataSpy: jasmine.Spy;

    beforeEach(() => {
      getCheckedDataSpy = spyOn<any>(component, 'getCheckedData');
      getCheckedDataSpy.and.callFake(() => [...commonOptionMock]);

      getFormDataSpy = spyOn<any>(component, 'getFormData');
      getFormDataSpy.and.callFake(() => ['formData1', 'formData2', 'formData3']);
    });

    it('englishLevelList$ should emit value', () => {
      spyOn(component.englishLevelList$, 'next');

      component.onCheckEnglishLevelOption(commonOptionMock[0]);

      expect(component.englishLevelList$.next).toHaveBeenCalledWith(commonOptionMock);
    });

    it('should set englishLevels to form', () => {
      spyOn(component.filtersForm.controls.englishLevels, 'setValue');

      component.onCheckEnglishLevelOption(commonOptionMock[0]);

      expect(component.filtersForm.controls.englishLevels.setValue).toHaveBeenCalledWith(
        ['formData1', 'formData2', 'formData3']
      );
    });

    it('should not call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckEnglishLevelOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).not.toHaveBeenCalled();
    });

    it('should call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('surname');
      spyOn<any>(component, 'getSurnameList$');

      component.onCheckEnglishLevelOption(commonOptionMock[0]);

      expect(component['getSurnameList$']).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSelectActivity', () => {
    it('should set expertActivities to form', () => {
      spyOn(component.filtersForm.controls.expertActivities, 'setValue');

      component.onSelectActivity(commonOptionMock[0]);

      expect(component.filtersForm.controls.expertActivities.setValue).toHaveBeenCalledWith('NAME_1');
    });

    it('should not call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('');
      spyOn<any>(component, 'getSurnameList$');

      component.onSelectActivity(commonOptionMock[0]);

      expect(component['getSurnameList$']).not.toHaveBeenCalled();
    });

    it('should call getSurnameList$()', () => {
      component.filtersForm.controls.surname.setValue('surname');
      spyOn<any>(component, 'getSurnameList$');

      component.onSelectActivity(commonOptionMock[0]);

      expect(component['getSurnameList$']).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFilterApply', () => {
    it('filteredData should emit value', () => {
      spyOn(component.filteredData, 'emit');

      component.onFilterApply();

      expect(component.filteredData.emit).toHaveBeenCalledOnceWith(jasmine.any(Object));
    });

    it('should set expertActivities to localStorage', () => {
      component.expertActivitiesStorageName = 'EXPERT';
      const storage = TestBed.inject(LocalStorageService);

      component.onFilterApply();

      expect(storage.setItem).toHaveBeenCalledWith('EXPERT', jasmine.any(Object));
    });

    it('should set empty arrays', () => {
      component.expertActivitiesStorageName = 'EXPERT';
      const storage = TestBed.inject(LocalStorageService);

      component.filtersForm.patchValue({
        surname: null,
        expertActivities: null,
        technologies: null,
        locations: null,
        technologyLevels: null,
        englishLevels: null
      });

      component.onFilterApply();

      expect(storage.setItem).toHaveBeenCalledWith('EXPERT', {
        surname: '',
        expertActivities: '',
        technologies: [],
        locations: [],
        technologyLevels: [],
        englishLevels: []
      });
    });
  });

  describe('onFilterReset', () => {
    let resetPropsSpy: jasmine.Spy;

    beforeEach(() => {
      resetPropsSpy = spyOn<any>(component, 'resetCheckedProperty');
      resetPropsSpy.and.callFake(() => [...commonOptionMock]);
    });

    it('should remove from storage', () => {
      component.expertActivitiesStorageName = 'EXPERT';
      const storage = TestBed.inject(LocalStorageService);

      component.onFilterReset();

      expect(storage.removeItem).toHaveBeenCalledWith('EXPERT');
    });

    it('should reset form', () => {
      spyOn(component.filtersForm, 'reset');

      component.onFilterReset();

      expect(component.filtersForm.reset).toHaveBeenCalledWith({
        surname: '',
        expertActivities: '',
        technologies: [],
        locations: [],
        technologyLevels: [],
        englishLevels: []
      });
    });

    it('should emit values from subjects', () => {
      spyOn(component.technologiesList$, 'next');
      spyOn(component.locationsList$, 'next');
      spyOn(component.technologyLevelList$, 'next');
      spyOn(component.englishLevelList$, 'next');
      spyOn(component.expertActivitiesTypeOption$, 'next');

      component.onFilterReset();

      expect(component.technologiesList$.next).toHaveBeenCalledOnceWith([...commonOptionMock]);
      expect(component.locationsList$.next).toHaveBeenCalledOnceWith([...commonOptionMock]);
      expect(component.technologyLevelList$.next).toHaveBeenCalledOnceWith([...commonOptionMock]);
      expect(component.englishLevelList$.next).toHaveBeenCalledOnceWith([...commonOptionMock]);
      expect(component.expertActivitiesTypeOption$.next).toHaveBeenCalledOnceWith({ name: null, id: null });
    });

    it('resetData should emit value', () => {
      spyOn(component.resetData, 'emit');

      component.onFilterReset();

      expect(component.resetData.emit).toHaveBeenCalledTimes(1);
    });

    it('should call getSurnameList$', () => {
      spyOn<any>(component, 'getSurnameList$');

      component.onFilterReset();

      expect(component['getSurnameList$']).toHaveBeenCalledTimes(1);
    });
  });

  it('getCheckedData should check items', () => {
    const result = component['getCheckedData'](cloneDeep(commonOptionMock), commonOptionMock[0]);

    expect(result).not.toEqual([...commonOptionMock]);
    expect(result[0].checked).toBeTrue();
  });

  it('getFormData should return [NAME_1]', () => {
    const items = cloneDeep(commonOptionMock);
    items[0].checked = true;

    const result = component['getFormData'](items);

    expect(result).toEqual(['NAME_1']);
  });

  it('resetCheckedProperty should return not checked options', () => {
    const items = cloneDeep(commonOptionMock);
    items.forEach(item => item.checked = true);

    const result = component['resetCheckedProperty'](items);

    expect(result).not.toEqual(items);
    result.forEach((item) => {
      expect(item.checked).toBeFalse();
    });
  });

  it('getControlList should return [NAME_1]', () => {
    const items = cloneDeep(commonOptionMock);
    items[0].checked = true;

    const result = component['getControlList'](items);

    expect(result).toEqual(['NAME_1']);
  });

  describe('getDataList', () => {
    it('should return input args', () => {
      localStorageService.getItem.and.returnValue(null);

      const result = component['getDataList'](commonOptionMock, 'locations');

      expect(result).toEqual(commonOptionMock);
    });

    it('should return not checked item', () => {
      localStorageService.getItem.and.returnValue(cloneDeep(activitiesStorageMock));

      const value = [{ id: '1', name: 'NAME_1' }];
      const result = component['getDataList'](value, 'locations');

      expect(result).toEqual([{ id: '1', name: 'NAME_1', checked: false }]);
    });

    it('should return checked item', () => {
      localStorageService.getItem.and.returnValue(cloneDeep({ ...activitiesStorageMock, locations: ['NAME_1'] }));

      const value = [{ id: '1', name: 'NAME_1' }];
      const result = component['getDataList'](value, 'locations');

      expect(result).toEqual([{ id: '1', name: 'NAME_1', checked: true }]);
    });
  });

  it('getFormParams should return Observable', () => {
    expertActivitiesServiceSpy.getFilteredList.and.returnValue(of([]));
    const result = component['getFormParams']();

    expect(result).toEqual(jasmine.any(Observable));
  });
});
