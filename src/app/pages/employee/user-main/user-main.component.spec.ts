import { SendCardModalComponent } from './send-card-modal/send-card-modal.component';
import { ICelebrationsButtons } from './../../../interfaces/send-card';
import { SurveyResultsModalComponent } from './survey-results-modal/survey-results-modal.component';
import { IQuestionnaireResults, ISurveyButton } from './../../../interfaces/survey';
import { cloneDeep } from 'lodash';
import { IUserInfo } from '@interfaces/userInfo.interface';
import { UserService } from '@services/user.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserMainComponent } from './user-main.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { LinkModule } from '@pipes/link/link.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { EmployeeService } from '@services/employee.service';
import { IUserDetails } from '@interfaces/authentication';

const celebrationsButton: ICelebrationsButtons = {
  celebrationId: 'CELEBRATION_ID'
};

const surveyButtonMock: ISurveyButton = {
  id: 'SURVEY_BUTTON_ID',
  text: 'SURVEY_BUTTON_TEXT',
  icon: 'SURVEY_BUTTON_ICON',
  isCompleted: true
};

const modalWindowMock = {
  open: () => ({
    componentInstance: {
      afterSubmit: of(null),
      afterPostCardSend: of('POSTCARD_EVENT')
    }
  })
};

const userInfoMock: IUserInfo = {
  externalId: 'EXTERNAL_ID',
  fullNameRu: 'Мойша Григорьевна',
  fullNameEn: '',
  birthDate: '2021-05-04T00:00:00',
  location: {
    id: '198f2146-877a-11e5-805b-0050569441cb',
    name: 'POLOTSK'
  },
  emailCorp: 't.userforhr@andersenlab.com',
  email: '',
  skype: '34534',
  mobilePhone: 'MOBILE_PHONE',
  isWork: true,
  nextAssessmentDate: '2021-06-17T00:00:00',
  photo: '',
  startDate: '2021-06-16T00:00:00',
  dayOff: [],
  position: 'HR',
  department: 'Administration',
  technologies: [],
  resourceManagerHierarchy: [],
  hrManager: null,
  languages: [
    {
      id: '3152ac34-c5c2-11ea-85e3-3497f65c56b3',
      name: 'English',
      level: 'A1'
    }
  ],
  extraMile: {
    isExtraMile: false,
    canEdit: false,
    comment: ''
  },
  roles: [],
  allocationsCurrent: [],
  allocationsPrevious: [],
  expertActivities: [],
  canEditExpertActivities: false,
  isHideBirthday: true,
  isHidePhone: true,
  level: 'LEVEL',
  vacations: []
};

describe('UserMainComponent', () => {
  let component: UserMainComponent;
  let fixture: ComponentFixture<UserMainComponent>;

  const userServiceMock = jasmine.createSpyObj('UserService', ['getUserInfo$']);
  const employeeServiceMock = jasmine.createSpyObj('EmployeeService', [
    'getUserInfo$',
    'getSurveyQuestions',
    'getSurveyButton',
    'getSurveyResults',
    'getCelebrationsCards$',
    'getCelebrationsButtons$'
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserMainComponent],
      imports: [
        SafeHtmlModule,
        LinkModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialog, useValue: modalWindowMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: EmployeeService, useValue: employeeServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            parent: { paramMap: of({ params: { id: 'EXTERNAL_ID ' } }) },
            data: of({
              employeeCard: {
                employee: { externalId: 'EXTERNAL_ID' }
              }
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('should create UserMainComponent', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      employeeServiceMock.getCelebrationsButtons$.and.returnValue(of([]));
      employeeServiceMock.getUserInfo$.and.returnValue(of(cloneDeep(userInfoMock)));
      const getUserInfoAndCelebrationsButtonsSpy = spyOn<any>(component, 'getUserInfoAndCelebrationsButtons');
      getUserInfoAndCelebrationsButtonsSpy.and.returnValue(of({ externalId: 'EXTERNAL_ID', celebrationsButtons: [] }));
    });

    it('should display and hide isShowLoader', () => {
      const spy = spyOn(component.isShowLoader$, 'next');

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.calls.all()[0].args[0]).toBe(true);
      expect(spy.calls.all()[1].args[0]).toBe(false);
    });

    it('should set userId', () => {
      component.userId = null;
      expect(component.userId).toBe(null);

      fixture.detectChanges();
      expect(component.userId).toBe('EXTERNAL_ID');
    });

    it('should set userData$', () => {
      component.userData$ = null;
      expect(component.userData$).toBe(null);

      fixture.detectChanges();
      expect(component.userData$).toEqual(jasmine.any(Observable));
    });

    it('should set currentUserId$', () => {
      component.currentUserId$ = null;
      expect(component.currentUserId$).toBe(null);

      fixture.detectChanges();
      expect(component.currentUserId$).toEqual(jasmine.any(Observable));
    });

    it('should set celebrationsButtons$', () => {
      component.celebrationsButtons$ = null;
      expect(component.celebrationsButtons$).toBe(null);

      fixture.detectChanges();
      expect(component.celebrationsButtons$).toEqual(jasmine.any(Observable));
    });
  });

  describe('openQuestionnaireDialogWindow', () => {
    beforeEach(() => {
      employeeServiceMock.getSurveyQuestions.and.returnValue(of([]));
      employeeServiceMock.getSurveyButton.and.returnValue(of([]));
      component.surveyId = 'SURVEY_ID';
    });

    it('should display and hide Loader', () => {
      const spy = spyOn(component.isShowLoader$, 'next');

      component.openQuestionnaireDialogWindow();

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.calls.all()[0].args[0]).toBe(true);
      expect(spy.calls.all()[1].args[0]).toBe(false);
    });

    it('should call employeeService.getSurveyQuestions', () => {
      const service = TestBed.inject(EmployeeService);

      component.openQuestionnaireDialogWindow();

      expect(service.getSurveyQuestions).toHaveBeenCalledWith('SURVEY_ID');
    });

    it('should set surveyQuestionData', () => {
      component.surveyQuestionsData = null;
      expect(component.surveyQuestionsData).toBe(null);

      component.openQuestionnaireDialogWindow();
      expect(component.surveyQuestionsData).toEqual(jasmine.any(Array));
    });

    it('should call employeeService.getSurveyButton', () => {
      const service = TestBed.inject(EmployeeService);

      component.openQuestionnaireDialogWindow();
      expect(service.getSurveyButton).toHaveBeenCalledWith('EXTERNAL_ID');
    });

    it('should emit buttons buttonSurvey$', () => {
      employeeServiceMock.getSurveyButton.and.returnValue(of([surveyButtonMock]));
      spyOn(component.buttonSurvey$, 'next');

      component.openQuestionnaireDialogWindow();
      expect(component.buttonSurvey$.next).toHaveBeenCalledWith([surveyButtonMock]);
    });
  });

  describe('openSurveyResultsDialogWindow', () => {
    beforeEach(() => {
      employeeServiceMock.getSurveyResults.and.returnValue(of({} as IQuestionnaireResults));
    });

    it('should display and hide Loader', () => {
      const spy = spyOn(component.isShowLoader$, 'next');

      component.openSurveyResultsDialogWindow();

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.calls.all()[0].args[0]).toBe(true);
      expect(spy.calls.all()[1].args[0]).toBe(false);
    });

    it('should call employeeService.getSurveyResults', () => {
      const service = TestBed.inject(EmployeeService);
      component.surveyId = 'SURVEY_ID';

      component.openSurveyResultsDialogWindow();

      expect(service.getSurveyResults).toHaveBeenCalledWith('SURVEY_ID');
    });

    it('should open modal window', () => {
      const modal = TestBed.inject(MatDialog);
      spyOn(modal, 'open');

      component.openSurveyResultsDialogWindow();

      expect(modal.open).toHaveBeenCalledWith(SurveyResultsModalComponent, jasmine.any(Object));
    });
  });

  describe('openEventSendWindow', () => {
    beforeEach(() => {
      employeeServiceMock.getCelebrationsCards$.and.returnValue(of(['value one', 'value two']));
    });

    it('should display and hide Loader', () => {
      const spy = spyOn(component.isShowLoader$, 'next');

      component.openEventSendWindow(celebrationsButton);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.calls.all()[0].args[0]).toBe(true);
      expect(spy.calls.all()[1].args[0]).toBe(false);
    });

    it('should call employeeService.getCelebrationsCards$', () => {
      const service = TestBed.inject(EmployeeService);

      component.openEventSendWindow(celebrationsButton);

      expect(service.getCelebrationsCards$).toHaveBeenCalledWith('CELEBRATION_ID');
    });


    it('should open modal window', () => {
      const modal = TestBed.inject(MatDialog);
      spyOn(modal, 'open').and.callThrough();

      component.openEventSendWindow(celebrationsButton);
      expect(modal.open).toHaveBeenCalledWith(SendCardModalComponent, jasmine.any(Object));
    });

    it('should not set eventCardName', () => {
      component.eventCardName = null;
      expect(component.eventCardName).toBe(null);

      component.openEventSendWindow(celebrationsButton);
      expect(component.eventCardName).toBe('POSTCARD_EVENT');
    });
  });

  it('onFadeout should emit false', () => {
    spyOn(component.isToastNotification$, 'next');

    component.onFadeOut();
    expect(component.isToastNotification$.next).toHaveBeenCalledWith(false);
  });

  it('getUserInfoAndCelebrationsButtons should return observable', () => {
    userServiceMock.getUserInfo$.and.returnValue(of({ externalId: 'EXTERNAL_ID' } as IUserDetails));
    const result = component['getUserInfoAndCelebrationsButtons']();

    expect(result).toEqual(jasmine.any(Observable));
  });
});
