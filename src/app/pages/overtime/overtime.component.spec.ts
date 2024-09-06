import { IOvertimeConfiguration, IOvertimePayload, IOvertimePopups } from './../../interfaces/overtime.interface';
import { MENU_ACTIONS } from '@andkit/components/other/table/table.config';
import { of } from 'rxjs';
import { IOverviewShort } from './../../interfaces/overview.interface';
import { TimeService } from './../../core/services/portal/time.service';
import { OvertimeService } from './../../core/services/portal/overtime.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OvertimeComponent } from './overtime.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FooterModule } from '@andkit/components/other/footer/footer.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TableModule } from '@andkit/components/other/table/table.module';
import { MatSelectModule } from '@angular/material/select';
import { IOvertime } from '@interfaces/overtime.interface';
import pdfFileSvg from '!!raw-loader!src/assets/images/pdf-file.svg';
import pngFileSvg from '!!raw-loader!src/assets/images/png-file.svg';
import fileSvg from '!!raw-loader!src/assets/images/file.svg';

const overviewShortMock: IOverviewShort[] = [
  {
    id: 1,
    type: 'type',
    period: '',
    status: 'Status',
    project: 'Project',
    attachment: 'Attachment',
    comment: 'Comment'
  },
  {
    id: 2,
    type: 'type 2',
    period: '',
    status: 'Status 2',
    project: 'Project 2',
    attachment: 'Attachment 2',
    comment: 'Comment 2'
  },
  {
    id: 3,
    type: 'type 3',
    period: '',
    status: 'Status 3',
    project: 'Project 3',
    attachment: 'Attachment 3',
    comment: 'Comment 3'
  }
];

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
  overType: null,
  attachments: []
};

const overtimeForEditingMock = {
  id: 'overtimeForEditing',
  configuration: null
};

const overtimeConfigurationMock: IOvertimeConfiguration = {
  values: {
    ratio: 6,
    overType: null
  },
  required: {
    overTypeId: true,
    projectId: true,
    additionalApproverId: true,
    ratio: true,
    hours: true,
    sum: true,
    currency: true,
    wardEmployeeId: true,
    position: true,
    level: true,
    attachment: true,
    currencyRestrictions: [],
    locationSelectRequired: true
  }
};

const overtimePayloadMock: IOvertimePayload = {
  employeeId: 'EMPLOYEE_ID',
  overTypeId: 'OVER_TYPE_ID',
  projectId: 'PROJECT_ID'
};

const popupsMock: IOvertimePopups = {
  modals: { view: false, add: false, edit: false, confirmation: false },
  notification: false
};

describe('OvertimeComponent', () => {
  let component: OvertimeComponent;
  let fixture: ComponentFixture<OvertimeComponent>;

  const overtimeServiceSpy = jasmine.createSpyObj('OvertimeService', [
    'addOvertime$',
    'editOvertime$',
    'getOvertime$',
    'getOvertimes$',
    'deleteOvertime$',
    'getOvertimeForEditing$',
    'isAndersenProject',
    'isAdditionalApproverRequired',
    'getHintLink'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OvertimeComponent],
      imports: [
        TableModule,
        FooterModule,
        SafeHtmlModule,
        HttpClientTestingModule,
        MatSelectModule
      ],
      providers: [
        { provide: OvertimeService, useValue: overtimeServiceSpy },
        TimeService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    overtimeServiceSpy.getOvertimes$.and.returnValue(of([...overviewShortMock]));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('getOvertimes', () => {
    it('should init overtimesForTable', () => {
      overtimeServiceSpy.getOvertimes$.and.returnValue(of([...overviewShortMock]));
      fixture.detectChanges();

      expect(component.overtimesForTable.length).toBe(3);
      expect(component.isNullOversData).toBe(true);
    });

    it('should call formatMyOvertimes', () => {
      const overtimes = [...overviewShortMock];
      overtimeServiceSpy.getOvertimes$.and.returnValue(of(overtimes));

      spyOn<any>(component, 'formatMyOvertimes');
      fixture.detectChanges();

      expect(component['formatMyOvertimes']).toHaveBeenCalledWith(overtimes);
    });
  });

  describe('createOverMenu', () => {
    it('should return open, edit, delete actions | arg: Active', () => {
      const expected = [MENU_ACTIONS.OPEN, MENU_ACTIONS.EDIT, MENU_ACTIONS.DELETE];

      const result = component['createOverMenu']('Active');

      expect(result.actions.length).toBe(3);
      expect(result.actions).toEqual(expected);
    });

    it('should return open | arg: empty', () => {
      const expected = [MENU_ACTIONS.OPEN];
      const result = component['createOverMenu']('');

      expect(result.actions.length).toBe(1);
      expect(result.actions).toEqual(expected);
    });
  });

  describe('handleMenuAction', () => {
    beforeEach(() => {
      overtimeServiceSpy.getOvertimeForEditing$.and.returnValue(of(overtimeForEditingMock));
      overtimeServiceSpy.getOvertime$.and.returnValue(of({ ...overtimeMock }));
    });

    it('should get overtime by id', () => {
      const overtimeService = TestBed.inject(OvertimeService);

      component.handleMenuAction({ item: { id: 'OVER_ID' }, action: MENU_ACTIONS.OPEN });

      expect(overtimeService.getOvertime$).toHaveBeenCalledWith('OVER_ID');
      expect(component.myOvertime).toEqual(overtimeMock);
    });

    it('should call manageModals with view', () => {
      spyOn<any>(component, 'manageModals');

      component.handleMenuAction({ item: { id: 1 }, action: MENU_ACTIONS.OPEN });

      expect(component.manageModals).toHaveBeenCalledOnceWith('view', true);
    });

    it('should call manageModals with confirmation', () => {
      spyOn<any>(component, 'manageModals');

      component.handleMenuAction({ item: { id: 'ID_FOR_DELETING' }, action: MENU_ACTIONS.DELETE });

      expect(component.manageModals).toHaveBeenCalledOnceWith('confirmation', true);
      expect(component.idForDeleting).toBe('ID_FOR_DELETING');
    });

    it('should call getOvertimeForEditing$ and return value', () => {
      component.handleMenuAction({ item: { id: 'ID_FOR_EDITING' }, action: MENU_ACTIONS.EDIT });

      expect(overtimeServiceSpy.getOvertimeForEditing$).toHaveBeenCalledWith('ID_FOR_EDITING');
      expect(component.editedOvertime).toBe(overtimeForEditingMock);
    });

    it('should call manageModals with edit', () => {
      spyOn<any>(component, 'manageModals');

      component.handleMenuAction({ item: { id: 'ID_FOR_EDITING' }, action: MENU_ACTIONS.EDIT });

      expect(component.manageModals).toHaveBeenCalledOnceWith('edit', true);
    });

    it('should do not set isOnlyAndersen, isAdditionalApproverRequired, hintLink', () => {
      component.handleMenuAction({ item: { id: 'ID_FOR_EDITING' }, action: MENU_ACTIONS.EDIT });

      expect(component.isOnlyAndersen).toBe(false);
      expect(component.isAdditionalApproverRequired).toBe(false);
      expect(component.hintLink).toBeFalsy();
    });

    it('should set isOnlyAndersen, isAdditionalApproverRequired, hintLink', () => {
      overtimeServiceSpy.isAndersenProject.and.returnValue(true);
      overtimeServiceSpy.isAdditionalApproverRequired.and.returnValue(true);
      overtimeServiceSpy.getHintLink.and.returnValue('HINT_LINK');
      overtimeServiceSpy.getOvertimeForEditing$.and.returnValue(of({
        ...overtimeForEditingMock,
        configuration: overtimeConfigurationMock
      }));

      expect(component.isOnlyAndersen).toBe(false);
      expect(component.isAdditionalApproverRequired).toBe(false);
      expect(component.hintLink).toBeFalsy();

      component.handleMenuAction({ item: { id: 'ID_FOR_EDITING' }, action: MENU_ACTIONS.EDIT });

      expect(component.isOnlyAndersen).toBe(true);
      expect(component.isAdditionalApproverRequired).toBe(true);
      expect(component.hintLink).toBe('HINT_LINK');
    });

    it('should do not call manageModals - default branch', () => {
      spyOn(component, 'manageModals');
      component.handleMenuAction({ item: { id: 'ID_FOR_EDITING' }, action: null });

      expect(component.manageModals).not.toHaveBeenCalled();
    });
  });

  it('onSelectOvertimeType should emit value', () => {
    spyOn<any>(component['updatedType$'], 'next');
    component.onSelectOvertimeType('TEST_TYPE');

    expect(component['updatedType$'].next).toHaveBeenCalledOnceWith('TEST_TYPE');
  });

  it('onOvertimeConfiguration should set value to overtimeConfiguration ', () => {
    component.onOvertimeConfiguration(overtimeConfigurationMock);

    expect(component.overtimeConfiguration).toBe(overtimeConfigurationMock);
  });

  it('onOnlyAndersen should set value to isOnlyAndersen  ', () => {
    component.onOnlyAndersen(true);
    expect(component.isOnlyAndersen).toBe(true);

    component.onOnlyAndersen(false);
    expect(component.isOnlyAndersen).toBe(false);
  });

  it('onAdditionalApproverRequired should set value to isAdditionalApproverRequired   ', () => {
    component.onAdditionalApproverRequired(true);
    expect(component.isAdditionalApproverRequired).toBe(true);

    component.onAdditionalApproverRequired(false);
    expect(component.isAdditionalApproverRequired).toBe(false);
  });

  it('onHintLink should set value to hintLink', () => {
    component.onHintLink('HINT_LINK');

    expect(component.hintLink).toBe('HINT_LINK');
  });

  describe('onDeleteOvertime', () => {
    beforeEach(() => {
      overtimeServiceSpy.deleteOvertime$.and.returnValue(of(true));
      overtimeServiceSpy.getOvertimes$.and.returnValue(of([...overviewShortMock]));
    });

    it('should call deleteOvertime$ with OVERTIME_ID', () => {
      const service = TestBed.inject(OvertimeService);

      component.onDeleteOvertime('OVERTIME_ID');

      expect(service.deleteOvertime$).toHaveBeenCalledWith('OVERTIME_ID');
    });

    it('should call manageModal with confirmation', () => {
      spyOn(component, 'manageModals');

      component.onDeleteOvertime('OVERTIME_ID');

      expect(component.manageModals).toHaveBeenCalledOnceWith('confirmation', false);
    });

    it('should call getOvertimes', () => {
      spyOn<any>(component, 'getOvertimes');

      component.onDeleteOvertime('OVERTIME_ID');

      expect(component['getOvertimes']).toHaveBeenCalledTimes(1);
    });

    it('should set false to isNullOversData', () => {
      component.isNullOversData = true;
      expect(component.isNullOversData).toBe(true);

      component.onDeleteOvertime('OVERTIME_ID');
      expect(component.isNullOversData).toBe(false);
    });

    it('should call showNotification with delete', () => {
      spyOn<any>(component, 'showNotification');

      component.onDeleteOvertime('OVERTIME_ID');

      expect(component['showNotification']).toHaveBeenCalledOnceWith('delete');
    });
  });

  describe('onEditOvertime', () => {
    beforeEach(() => {
      overtimeServiceSpy.editOvertime$.and.returnValue(of(true));
      overtimeServiceSpy.getOvertimes$.and.returnValue(of([...overviewShortMock]));
    });

    it('should call editOvertime$ with OVERTIME_ID', () => {
      const service = TestBed.inject(OvertimeService);

      component.onEditOvertime('OVERTIME_ID', overtimePayloadMock);

      expect(service.editOvertime$).toHaveBeenCalledWith('OVERTIME_ID', overtimePayloadMock);
    });

    it('should call manageModal with edit', () => {
      spyOn(component, 'manageModals');

      component.onEditOvertime('OVERTIME_ID', overtimePayloadMock);

      expect(component.manageModals).toHaveBeenCalledOnceWith('edit', false);
    });

    it('should call getOvertimes', () => {
      spyOn<any>(component, 'getOvertimes');

      component.onEditOvertime('OVERTIME_ID', overtimePayloadMock);

      expect(component['getOvertimes']).toHaveBeenCalledTimes(1);
    });

    it('should call showNotification with edit', () => {
      spyOn<any>(component, 'showNotification');

      component.onEditOvertime('OVERTIME_ID', overtimePayloadMock);

      expect(component['showNotification']).toHaveBeenCalledOnceWith('edit');
    });
  });

  describe('onSubmitOvertime', () => {
    beforeEach(() => {
      overtimeServiceSpy.addOvertime$.and.returnValue(of(true));
      overtimeServiceSpy.getOvertimes$.and.returnValue(of([...overviewShortMock]));
    });

    it('should call addOvertime$ with payload', () => {
      const service = TestBed.inject(OvertimeService);

      component.onSubmitOvertime(overtimePayloadMock);

      expect(service.addOvertime$).toHaveBeenCalledWith(overtimePayloadMock);
    });

    it('should call manageModal with add', () => {
      spyOn(component, 'manageModals');

      component.onSubmitOvertime(overtimePayloadMock);

      expect(component.manageModals).toHaveBeenCalledOnceWith('add', false);
    });

    it('should call getOvertimes', () => {
      spyOn<any>(component, 'getOvertimes');

      component.onSubmitOvertime(overtimePayloadMock);

      expect(component['getOvertimes']).toHaveBeenCalledTimes(1);
    });

    it('should call showNotification with add', () => {
      spyOn<any>(component, 'showNotification');

      component.onSubmitOvertime(overtimePayloadMock);

      expect(component['showNotification']).toHaveBeenCalledOnceWith('add');
    });

    it('should set true to isNullOversData', () => {
      component.isNullOversData = false;
      expect(component.isNullOversData).toBe(false);

      component.onSubmitOvertime(overtimePayloadMock);
      expect(component.isNullOversData).toBe(true);
    });
  });

  describe('getIconForAttachment', () => {
    it('should return null', () => {
      const expected = component['getIconForAttachment']('');

      expect(expected).toBe(null);
    });

    it('should return pdfFileSvg', () => {
      const expected = component['getIconForAttachment']('test.pdf');

      expect(expected).toBe(pdfFileSvg);
    });

    it('should return pngFileSvg', () => {
      const expected = component['getIconForAttachment']('test.png');

      expect(expected).toBe(pngFileSvg);
    });

    it('should return fileSvg', () => {
      const expected = component['getIconForAttachment']('test.txt');

      expect(expected).toBe(fileSvg);
    });
  });

  it('onFadeOut should set notification: false to popups', () => {
    component.popups = { ...popupsMock, notification: true };
    expect(component.popups.notification).toBe(true);

    component.onFadeOut();
    expect(component.popups.notification).toBe(false);
  });

});
