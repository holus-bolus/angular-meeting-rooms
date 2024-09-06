import { OvertimeService } from '@services/portal/overtime.service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ViewOvertimeModalComponent } from './view-overtime-modal.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { TextLengthModule } from '@pipes/text-length/text-length.module';
import { UrlifyPipe } from '@pipes/urlify/urlify.pipe';
import { SafePipe } from '@pipes/safe-html/safe-html.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IOvertime, IOvertimeConfiguration } from '@interfaces/overtime.interface';

const overtimeConfigurationMock: IOvertimeConfiguration = {
  values: {
    ratio: 6,
    overType: { id: '1', name: 'Overtime' }
  },
  required: {
    overTypeId: true,
    projectId: false,
    additionalApproverId: false,
    ratio: true,
    hours: true,
    sum: true,
    currency: true,
    wardEmployeeId: false,
    position: false,
    level: false,
    attachment: false,
    currencyRestrictions: [],
    locationSelectRequired: false
  }
};

const overtimeMock: IOvertime = {
  id: 'OVERTIME_ID',
  employee: null,
  status: 'status',
  project: null,
  approvers: null,
  period: '',
  ratio: 0,
  hours: 666,
  sum: 500,
  currency: 'USD',
  wardEmployee: null,
  comment: 'comment',
  overType: overtimeConfigurationMock,
  attachments: []
};

const simpleChangesMock: SimpleChanges = {
  overtime: {
    previousValue: null,
    currentValue: overtimeMock,
    firstChange: false,
    isFirstChange: () => false
  }
};

describe('ViewOvertimeModalComponent', () => {
  let component: ViewOvertimeModalComponent;
  let fixture: ComponentFixture<ViewOvertimeModalComponent>;

  const overtimeServiceSpy = jasmine.createSpyObj('OvertimeService', ['getAttachmentAsUrl$']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOvertimeModalComponent, UrlifyPipe, SafePipe],
      imports: [TextLengthModule, HttpClientTestingModule],
      providers: [{ provide: OvertimeService, useValue: overtimeServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOvertimeModalComponent);
    component = fixture.componentInstance;
    component.overtime = overtimeMock;
    overtimeServiceSpy.getAttachmentAsUrl$.and.returnValue(of('ATTACHMENT_URL'));
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should set hours to false', () => {
      component.overtime.overType.required.sum = true;
      component.overtime.sum = 666;
      component.overtime.overType.required.hours = true;

      component.ngOnChanges(simpleChangesMock);

      expect(component.overtime.overType.required.hours).toBe(false);
    });

    it('should set sum to false', () => {
      component.overtime.overType.required.sum = true;
      component.overtime.sum = null;
      component.overtime.overType.required.hours = true;

      component.ngOnChanges(simpleChangesMock);

      expect(component.overtime.overType.required.sum).toBe(false);
    });
  });

  describe('openFileUrl', () => {
    it('isLoader should be called twice', () => {
      spyOn(window, 'open').and.returnValue(null);
      const isLoaderSpy = spyOn(component.isLoader, 'next');

      component.openFileUrl('ATTACHMENT_ID');

      expect(isLoaderSpy).toHaveBeenCalledTimes(2);
      expect(isLoaderSpy.calls.all()[0].args[0]).toBe(true);
      expect(isLoaderSpy.calls.all()[1].args[0]).toBe(false);
    });

    it('should call getAttachmentAsUrl$ with ATTACHMENT_ID', () => {
      spyOn(window, 'open').and.returnValue(null);
      const service = TestBed.inject(OvertimeService);

      component.openFileUrl('ATTACHMENT_ID');

      expect(service.getAttachmentAsUrl$).toHaveBeenCalledWith('ATTACHMENT_ID');
    });

    it('should call window.open with ATTACHMENT_URL', () => {
      spyOn(window, 'open').and.returnValue(null);

      component.openFileUrl('ATTACHMENT_ID');

      expect(window.open).toHaveBeenCalledWith('ATTACHMENT_URL');
    });
  });
});
