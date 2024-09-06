import { ObjectivesAddModalComponent } from './objectives-add-modal/objectives-add-modal.component';
import { ObjectivesArchiveInfoModalComponent } from './objectives-archive-info-modal/objectives-archive-info-modal.component';
import { ObjectivesActiveInfoModalComponent } from './objectives-active-info-modal/objectives-active-info-modal.component';
import { IUserDetails } from './../../../interfaces/authentication';
import { UserService } from './../../../core/services/user.service';
import { EmployeeIdService } from './../../../core/services/employee-id.service';
import { ObjectivesService } from './../../../core/services/objectives.service';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync } from '@angular/core/testing';

import { ObjectivesCardComponent } from './objectives-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IUserObjectives } from '@interfaces/objective';

const queryParamMapSnapshot = {
  get: () => ({})
};

const queryParamMap = of(queryParamMapSnapshot);

const routeDetails = {
  queryParamMap,
  snapshot: {
    paramMap: {
      get: () => ({})
    },
    queryParams: {},
    queryParamMap: queryParamMapSnapshot,
    data: {
      employee: {}
    }
  },
  paramMap: of({}),
};

const userInfoMock: IUserDetails = {
  externalId: 'EXTERNAL_USER_ID',
  username: 'USERNAME',
  photo: '',
  roles: []
};

const objectivesMock: IUserObjectives = {
  canEdit: true,
  nextAssessmentDate: '',
  currentObjectives: [],
  archivedObjectives: []
};

const matDialogOpenMock = {
  componentInstance: {
    cancelEvent: of({}),
    confirmEvent: of({}),
    onClose: () => {}
  },
  backdropClick: () => of({}),
  afterClosed: () => of({}),
  close: () => {}
};

describe('ObjectivesCardComponent', () => {
  let component: ObjectivesCardComponent;
  let fixture: ComponentFixture<ObjectivesCardComponent>;

  const objectivesServiceSpy = jasmine.createSpyObj('ObjectivesService', ['getObjectives$', 'createObjective', 'updateObjective']);
  const employeeIdServiceSpy = jasmine.createSpyObj('EmployeeIdService', ['getEmployeeId']);
  const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserInfo$']);
  const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectivesCardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SafeHtmlModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeDetails },
        { provide: ObjectivesService, useValue: objectivesServiceSpy },
        { provide: EmployeeIdService, useValue: employeeIdServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectivesCardComponent);
    component = fixture.componentInstance;

    objectivesServiceSpy.createObjective.and.returnValue(of(true));
    objectivesServiceSpy.updateObjective.and.returnValue(of(true));
  });

  afterEach(() => fixture.destroy());

  describe('ngOnInit', () => {
    beforeEach(() => {
      userServiceSpy.getUserInfo$.and.returnValue(of(userInfoMock));
      employeeIdServiceSpy.getEmployeeId.and.returnValue('EMPLOYEE_ID');
      objectivesServiceSpy.getObjectives$.and.returnValue(of(objectivesMock));
    });

    it('should create ObjectivesCardComponent', () => {
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should call getEmployeeId and set value to employeeId', () => {
      const service = TestBed.inject(EmployeeIdService);

      fixture.detectChanges();

      expect(service.getEmployeeId).toHaveBeenCalled();
      expect(component.employeeId).toBe('EMPLOYEE_ID');
    });

    it('should call getUserInfo$', () => {
      const service = TestBed.inject(UserService);

      fixture.detectChanges();

      expect(service.getUserInfo$).toHaveBeenCalled();
    });

    it('should call getObjectives$', () => {
      spyOn<any>(component, 'getObjectives$');

      fixture.detectChanges();

      expect(component['getObjectives$']).toHaveBeenCalled();
    });

    it('should call handleResponseObjectives with objectivesMock', () => {
      spyOn<any>(component, 'handleResponseObjectives');

      fixture.detectChanges();

      expect(component['handleResponseObjectives']).toHaveBeenCalledWith(objectivesMock);
    });

    it('should set variables: isShowLoader, interviewerId, isRM', () => {
      fixture.detectChanges();

      expect(component.isRM).toBe(true);
      expect(component.isShowLoader).toBe(false);
      expect(component.interviewerId).toBe(userInfoMock.externalId);
    });
  });

  describe('getObjectives$', () => {
    it('should call objectivesService.getObjectives$ and return objectivesMock', (done) => {
      objectivesServiceSpy.getObjectives$.and.returnValue(of(objectivesMock));

      component['getObjectives$']().subscribe((value) => {
        expect(value).toBe(objectivesMock);
        done();
      });
    });
  });

  describe('handleResponseObjectives', () => {
    it('should set variables', () => {
      objectivesServiceSpy.getObjectives$.and.returnValue(of(objectivesMock));

      component['handleResponseObjectives'](objectivesMock);

      expect(component.openedObjectives).toBe(objectivesMock.currentObjectives);
      expect(component.closedObjectives).toBe(objectivesMock.archivedObjectives);
      expect(component.objectives).toBe(objectivesMock);
    });
  });

  it('onScrollTop should call window.scrollTo', () => {
    const scrollToSpy = spyOn(window, 'scrollTo');

    component.scrollTop();

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
    expect(scrollToSpy.calls.first().args[0]).toEqual(jasmine.any(Object));
  });

  it('showActiveObjectivesInfo should open modal window', () => {
    matDialogSpy.open.and.returnValue(of({}));

    component.showActiveObjectivesInfo();

    expect(matDialogSpy.open).toHaveBeenCalledWith(ObjectivesActiveInfoModalComponent, jasmine.any(Object));
  });

  it('showArchiveObjectivesInfo should open modal window', () => {
    matDialogSpy.open.and.returnValue(of({}));

    component.showArchiveObjectivesInfo();

    expect(matDialogSpy.open).toHaveBeenCalledWith(ObjectivesArchiveInfoModalComponent, jasmine.any(Object));
  });

  it('onFadeOut should set isToastNotification  to false', () => {
    component.isToastNotification = true;
    expect(component.isToastNotification).toBe(true);

    component.onFadeOut();
    expect(component.isToastNotification).toBe(false);
  });

  describe('updateObjectives', () => {
    beforeEach(() => {
      objectivesServiceSpy.getObjectives$.and.returnValue(of(objectivesMock));
    });

    it('should set notificationText', () => {
      component.notificationText = '';
      expect(component.notificationText).toBe('');

      component.updateObjectives('UPDATE_OBJECTIVES_TEXT');
      expect(component.notificationText).toBe('UPDATE_OBJECTIVES_TEXT');
    });

    it('should set isToastNotification', () => {
      component.isToastNotification  = false;
      expect(component.isToastNotification).toBe(false);

      component.updateObjectives('UPDATE_OBJECTIVES_TEXT');
      expect(component.isToastNotification).toBe(true);
    });

    it('should set isShowLoader to false', () => {
      component.isShowLoader  = true;
      expect(component.isShowLoader).toBe(true);

      component.updateObjectives('UPDATE_OBJECTIVES_TEXT');
      expect(component.isShowLoader).toBe(false);
    });

    it('should call getObjectives$', () => {
      spyOn<any>(component, 'getObjectives$').and.returnValue(of(objectivesMock));

      component.updateObjectives('UPDATE_OBJECTIVES_TEXT');
      expect(component['getObjectives$']).toHaveBeenCalled();
    });

    it('should call handleResponseObjectives with objectivesMock', () => {
      spyOn<any>(component, 'handleResponseObjectives');

      component.updateObjectives('UPDATE_OBJECTIVES_TEXT');
      expect(component['handleResponseObjectives']).toHaveBeenCalledWith(objectivesMock);
    });
  });

  it('onWindowScroll should set value to showScrollButton ', () => {
    component.showScrollButton = true;
    expect(component.showScrollButton).toBe(true);

    component.onWindowScroll();
    expect(component.showScrollButton).toBe(false);
  });

  describe('addObjective', () => {
    let service: MatDialog;

    beforeEach(() => {
      matDialogSpy.open.and.returnValue(matDialogOpenMock);
      service = TestBed.inject(MatDialog);
      component.objectives = objectivesMock;
    });

    it('should call matDialog.open with ObjectivesAddModalComponent', () => {
      component.addObjective();

      expect(service.open).toHaveBeenCalledWith(ObjectivesAddModalComponent, jasmine.any(Object));
    });

    it('should call getObjectives$', () => {
      spyOn<any>(component, 'getObjectives$').and.returnValue(of(objectivesMock));

      component.addObjective();

      expect(component['getObjectives$']).toHaveBeenCalled();
    });
  });
});
