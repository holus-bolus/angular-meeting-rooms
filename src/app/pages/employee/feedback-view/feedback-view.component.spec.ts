import { ICommonOption } from './../../../interfaces/filter';
import { By } from '@angular/platform-browser';
import { EmployeeIdService } from './../../../core/services/employee-id.service';
import { IUserDetails } from './../../../interfaces/authentication';
import { EmployeeService } from './../../../core/services/employee.service';
import { UserService } from './../../../core/services/user.service';
import { IFeedbackData } from './../../../interfaces/feedback.interface';
import { of } from 'rxjs';
import { FeedbackService } from './../../../core/services/feedback.service';
import { ComponentFixture, TestBed, waitForAsync, tick, fakeAsync } from '@angular/core/testing';
import { FeedbackViewComponent } from './feedback-view.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TextLengthModule } from '@pipes/text-length/text-length.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { skip } from 'rxjs/operators';

const feedbackDataMock: IFeedbackData = {
  employeeName: 'EMPLOYEE_NAME',
  feedbacks: [],
  averageFeedbackScale: {
    communicationSkills: 0,
    overallPerformance: 0,
    problemSolvingSkills: 0,
    professionalSkills: 0,
    qualityOfWork: 0,
    reliability: 0
  },
  canAskFeedback: true,
  selfFeedbackScale: {
    communicationSkills: 0,
    overallPerformance: 0,
    problemSolvingSkills: 0,
    professionalSkills: 0,
    qualityOfWork: 0,
    reliability: 0
  },
  canAskFeedbackExternal: true
};

const userDetailsMock: IUserDetails = {
  externalId: 'EXTERNAL_ID',
  username: 'USERNAME',
  photo: '',
  roles: []
};

const projectsMock: ICommonOption<string>[] = [
  {
    id: 'project1',
    name: 'First project'
  },
  {
    id: 'project2',
    name: 'Second project'
  }
];

describe('FeedbackViewComponent', () => {
  let component: FeedbackViewComponent;
  let fixture: ComponentFixture<FeedbackViewComponent>;

  const employeeIdService = jasmine.createSpyObj('EmployeeIdService', ['getEmployeeId']);
  const feedbackService = jasmine.createSpyObj('FeedbackService', ['getFeedbacksById$', 'getFeedbacksProjects$']);
  const employeeService = jasmine.createSpyObj('EmployeeService', ['getTeammatesAndEmployees']);
  const userService = jasmine.createSpyObj('UserService', ['getUserInfo$']);
  const spyRouter = jasmine.createSpyObj('Router', ['navigate']);
  const spyModal = jasmine.createSpyObj('MatDialog', ['open']);

  const createComponent = () => {
    fixture = TestBed.createComponent(FeedbackViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  const initServices = () => {
    feedbackService.getFeedbacksById$.and.returnValue(of(feedbackDataMock));
    feedbackService.getFeedbacksProjects$.and.returnValue(of(projectsMock));
    employeeIdService.getEmployeeId.and.returnValue('EMPLOYEE_ID');
    employeeService.getTeammatesAndEmployees.and.returnValue([]);
    userService.getUserInfo$.and.returnValue(of(userDetailsMock));
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackViewComponent],
      imports: [
        SafeHtmlModule,
        TextLengthModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialog, useValue: spyModal },
        { provide: FeedbackService, useValue: feedbackService },
        { provide: EmployeeService, useValue: employeeService },
        { provide: UserService, useValue: userService },
        { provide: EmployeeIdService, useValue: employeeIdService },
        { provide: Router, useValue: spyRouter },
      ]
    })
      .compileComponents();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    createComponent();

    expect(component).toBeTruthy();
  });

  it('should init variables', () => {
    initServices();
    createComponent();

    expect(component.userFeedbacksData).toEqual(feedbackDataMock);
    expect(component.canAskFeedbackExternal).toBe(feedbackDataMock.canAskFeedbackExternal);

    const isCurrentUser = 'EMPLOYEE_ID' === userDetailsMock.externalId;
    expect(component.isCurrentUser).toBe(isCurrentUser);
  });

  it('hasData should be false', () => {
    initServices();
    feedbackService.getFeedbacksById$.and.returnValue(of({ ...feedbackDataMock, selfFeedbackScale: null }));
    createComponent();

    expect(component.hasData).toBe(false);
  });

  it('hasData should be true', () => {
    initServices();
    createComponent();

    expect(component.hasData).toBe(true);
  });

  it('should be current user', () => {
    initServices();
    employeeIdService.getEmployeeId.and.returnValue('EXTERNAL_ID');
    createComponent();

    const isCurrentUser = 'EXTERNAL_ID' === userDetailsMock.externalId;
    expect(component.isCurrentUser).toBe(isCurrentUser);
  });

  it('should display Employee name', () => {
    initServices();
    createComponent();

    const title = fixture.nativeElement.querySelector('.name').textContent;

    expect(title).toContain('EMPLOYEE_NAME');
  });

  it('should call askFeedback by Ask for Feedback clicking', () => {
    initServices();
    feedbackService.getFeedbacksById$.and.returnValue(of({ ...feedbackDataMock, canAskFeedback: true }));
    createComponent();

    spyOn(component, 'askFeedback');
    fixture.detectChanges();

    const askFeedbackBtn = fixture.nativeElement.querySelectorAll('.btn-feedback')[1];
    askFeedbackBtn.click();

    expect(component.askFeedback).toHaveBeenCalledTimes(1);
  });

  it('isShowLoader should be true', () => {
    initServices();
    createComponent();

    component.askFeedback();

    expect(component.isShowLoader).toBe(true);
  });

  it('should call goToFeedback by Leave feedback clicking', () => {
    initServices();
    employeeIdService.getEmployeeId.and.returnValue('EMPLOYEE_ID');
    feedbackService.getFeedbacksById$.and.returnValue(of({ ...feedbackDataMock, canAskFeedback: false }));
    createComponent();

    spyOn(component, 'goToFeedback');
    fixture.detectChanges();

    const leaveFeedbackBtn = fixture.nativeElement.querySelector('.btn-feedback');
    leaveFeedbackBtn.click();

    expect(component.goToFeedback).toHaveBeenCalledTimes(1);
  });

  it('should navigate when goToFeedback call', () => {
    initServices();
    createComponent();

    const router = TestBed.inject(Router);

    component.goToFeedback();

    expect(router.navigate).toHaveBeenCalledWith(['/employee/EMPLOYEE_ID/feedback']);
  });

  it('scrollTop should be called by btn clicking', () => {
    initServices();
    feedbackService.getFeedbacksById$.and.returnValue(of({ ...feedbackDataMock, feedbacks: [null, null, null, null, null] }));
    createComponent();

    spyOn(component, 'scrollTop');

    const upBtn = fixture.debugElement.query(By.css('.btn-up'));
    upBtn.nativeElement.click();

    expect(component.scrollTop).toHaveBeenCalledTimes(1);
  });

  it('scrollTo should be called', () => {
    initServices();
    feedbackService.getFeedbacksById$.and.returnValue(of({ ...feedbackDataMock, feedbacks: [null, null, null, null, null] }));
    createComponent();

    spyOn(window, 'scrollTo');

    component.scrollTop();

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
