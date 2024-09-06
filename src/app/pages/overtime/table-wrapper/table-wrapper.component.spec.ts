import { SafeHtmlModule } from './../../../pipes/safe-html/safe-html.module';
import { of, Observable } from 'rxjs';
import { IOvertimeConfiguration } from './../../../interfaces/overtime.interface';
import { OvertimeService } from '@services/portal/overtime.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TableWrapperComponent } from './table-wrapper.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const overtimeConfigurationMock: IOvertimeConfiguration = {
  values: null,
  required: null
};

const overtimeConfigurationResponseMock = {
  id: 'ID',
  name: 'NAME',
  projectsOther: false,
  additionalApproverRequired: false,
  ratioRequired: false,
  ratioDefault: false,
  hoursRequired: false,
  currencyRequired: false,
  sumRequired: false,
  wardEmployeeRequired: false,
  positionRequired: false,
  levelRequired: false,
  commentRequired: false,
  currencyRestrictions: [],
  locationSelectRequired: false
};

describe('TableWrapperComponent', () => {
  let component: TableWrapperComponent;
  let fixture: ComponentFixture<TableWrapperComponent>;
  let service: OvertimeService;

  const overtimeServiceSpy = jasmine.createSpyObj('OvertimeService', [
    'getOvertimeTypes$',
    'getDateHintMessage$',
    'getOvertimeConfiguration$',
    'isAndersenProject',
    'isAdditionalApproverRequired',
    'getHintLink'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TableWrapperComponent],
      imports: [SafeHtmlModule],
      providers: [
        { provide: OvertimeService, useValue: overtimeServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWrapperComponent);
    component = fixture.componentInstance;

    overtimeServiceSpy.getOvertimeConfiguration$.and.returnValue(of(overtimeConfigurationResponseMock));
    overtimeServiceSpy.getOvertimeTypes$.and.returnValue(of([{ id: 'TYPE_ID', name: 'TYPE' }]));
    overtimeServiceSpy.getDateHintMessage$.and.returnValue(of('DATE_MESSAGE'));

    service = TestBed.inject(OvertimeService);
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getOvertimeTypes$', () => {
      fixture.detectChanges();

      expect(service.getOvertimeTypes$).toHaveBeenCalled();
    });

    it('should call getDateHintMessage$', () => {
      fixture.detectChanges();

      expect(service.getDateHintMessage$).toHaveBeenCalled();
    });

    it('should call formatDate with DATE_MESSAGE', () => {
      spyOn<any>(component, 'formatDate');

      fixture.detectChanges();

      expect(component['formatDate']).toHaveBeenCalledOnceWith('DATE_MESSAGE');
    });
  });

  describe('onClickButton', () => {
    beforeEach(() => {
      component.option = { id: 'OPTION_ID', name: 'PLACEHOLDER' };

      fixture.detectChanges();
    });

    it('should call getOvertime$ with OPTION_ID', () => {
      spyOn<any>(component, 'getOvertime$').and.returnValue(of(null));

      component.onClickButton();

      expect(component['getOvertime$']).toHaveBeenCalledWith('OPTION_ID');
    });

    // it('should set configuration', () => {
    //   component.onClickButton();

    //   expect(component.overtimeConfiguration).toBe(overtimeConfigurationMock);
    // });

    // it('overtimeConfigurationEmit should emit configuration', () => {
    //   spyOn(component.overtimeConfigurationEmit, 'emit');

    //   component.onClickButton();

    //   expect(component.overtimeConfigurationEmit.emit).toHaveBeenCalledWith(overtimeConfigurationMock);
    // });

    // it('isOnlyAndersenEmit should emit false', () => {
    //   spyOn(component.isOnlyAndersenEmit, 'emit');

    //   component.onClickButton();

    //   expect(component.isOnlyAndersenEmit.emit).toHaveBeenCalledWith(false);
    // });

    // it('isAdditionalApproverRequiredEmit should emit false', () => {
    //   spyOn(component.isAdditionalApproverRequiredEmit, 'emit');

    //   component.onClickButton();

    //   expect(component.isAdditionalApproverRequiredEmit.emit).toHaveBeenCalledWith(false);
    // });

    // it('hintLinkEmit should emit empty string', () => {
    //   spyOn(component.hintLinkEmit, 'emit');

    //   component.onClickButton();

    //   expect(component.hintLinkEmit.emit).toHaveBeenCalledWith('');
    // });

    it('buttonAction should emit event', () => {
      spyOn(component.buttonAction, 'emit');

      component.onClickButton();

      expect(component.buttonAction.emit).toHaveBeenCalled();
    });

    it('should reset control', () => {
      spyOn(component.typeControl, 'reset');

      component.onClickButton();

      expect(component.typeControl.reset).toHaveBeenCalled();
    });
  });

  describe('onSelectType', () => {
    it('should set option', () => {
      const item = { id: 'OPTION_ID', name: 'NAME' };

      component.option = null;
      expect(component.option).not.toEqual(item);

      component.onSelectType(item);
      expect(component.option).toEqual(item);
    });

    it('selectOvertimeType should emit OPTION_ID', () => {
      spyOn(component.selectOvertimeType, 'emit');

      component.onSelectType({ id: 'OPTION_ID', name: 'NAME' });
      expect(component.selectOvertimeType.emit).toHaveBeenCalledWith('OPTION_ID');
    });
  });

  describe('getOvertime$', () => {
    it('should return null', () => {
      const actual = component['getOvertime$'](null);

      expect(actual).toBe(null);
    });

    it('should return Observable', () => {
      const actual = component['getOvertime$']('ID');

      expect(actual).toEqual(jasmine.any(Observable));
    });
  });

  describe('changeFormatDate', () => {
    it('should return June', () => {
      const date = '2021-06-01T00:00:00';

      const actual = component['changeFormatDate'](date, true);

      expect(actual).toBe('June');
    });

    it('should return 01.06', () => {
      const date = '2021-06-01T00:00:00';

      const actual = component['changeFormatDate'](date);

      expect(actual).toBe('01.06');
    });

    it('should return 11.11', () => {
      const date = '2021-11-11T00:00:00';

      const actual = component['changeFormatDate'](date);

      expect(actual).toBe('11.11');
    });
  });

});
