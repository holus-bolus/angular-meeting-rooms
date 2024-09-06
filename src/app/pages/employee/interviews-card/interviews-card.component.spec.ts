import { cloneDeep } from 'lodash';
import { IUserDetails } from './../../../interfaces/authentication';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InterviewsCardComponent } from './interviews-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { InterviewsService } from '@services/assessments/interviews.service';
import { UserService } from '@services/user.service';
import { EmployeeIdService } from '@services/employee-id.service';
import { IInterviews } from '@interfaces/interview';

const interviewsMock: IInterviews = {
  currentPage: 1,
  totalItems: 10,
  itemsPerPage: 5,
  data: []
};

const userDetailsMock: IUserDetails = {
  externalId: 'EXTERNAL_ID',
  username: 'USERNAME',
  photo: '',
  roles: []
};

const staticParamMap = {
  paramMap: {
    get(): void { }
  },
  queryParams: { matrix: null },
};

const parentParamMap = {
  paramMap: of({
    get(): void { }
  })
};

const routeDetails = {
  snapshot: staticParamMap,
  data: of({ interviewCard: [{ data: [], totalItems: 0 }, 'id'] }),
  parent: parentParamMap
};

describe('InterviewsCardComponent', () => {
  let component: InterviewsCardComponent;
  let fixture: ComponentFixture<InterviewsCardComponent>;

  const interviewsServiceSpy = jasmine.createSpyObj('InterviewsService', ['getInterviews']);
  const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserInfo$']);
  const employeeIdServiceSpy = jasmine.createSpyObj('EmployeeIdService', ['getEmployeeId']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewsCardComponent],
      imports: [SafeHtmlModule, TimezoneModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeDetails },
        { provide: InterviewsService, useValue: interviewsServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: EmployeeIdService, useValue: employeeIdServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewsCardComponent);
    component = fixture.componentInstance;

    interviewsServiceSpy.getInterviews.and.returnValue(of(interviewsMock));
    userServiceSpy.getUserInfo$.and.returnValue(of(userDetailsMock));
    employeeIdServiceSpy.getEmployeeId.and.returnValue('EMPLOYEE_ID');
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      routeDetails.snapshot = cloneDeep(staticParamMap);
      interviewsServiceSpy.getInterviews.calls.reset();
    });

    it('should set false to isOpenMatrixModal', () => {
      component.isOpenMatrixModal = null;
      expect(component.isOpenMatrixModal).toBe(null);

      component.ngOnInit();

      expect(component.isOpenMatrixModal).toBe(null);
    });

    it('should set false to isOpenMatrixModal', () => {
      routeDetails.snapshot = cloneDeep({ ...staticParamMap, queryParams: { matrix: 'MATRIX' } });
      component.isOpenMatrixModal = null;
      expect(component.isOpenMatrixModal).toBe(null);

      component.ngOnInit();

      expect(component.isOpenMatrixModal).toBe(true);
    });

    it('should set employeeId to EMPLOYEE_ID', () => {
      component['employeeId'] = null;
      expect(component['employeeId']).toBe(null);

      component.ngOnInit();

      expect(component['employeeId']).toBe('EMPLOYEE_ID');
    });

    it('should set interview$', () => {
      component.interviews$ = null;
      expect(component.interviews$).toBe(null);

      component.ngOnInit();
      expect(component.interviews$).toEqual(jasmine.any(Observable));
    });

    it('should set isInterviewer$', () => {
      component.isInterviewer$ = null;
      expect(component.isInterviewer$).toBe(null);

      component.ngOnInit();
      expect(component.isInterviewer$).toEqual(jasmine.any(Observable));
    });

    it('isInterviewer should return false', (done) => {
      component.ngOnInit();

      component.isInterviewer$.subscribe((result: boolean) => {
        expect(result).toBeFalse();
        done();
      });
    });
  });

  describe('ngAfterViewInit', () => {
    it('should emit update', () => {
      spyOn(component['update$'], 'next');

      component.ngAfterViewInit();

      expect(component['update$'].next).toHaveBeenCalledTimes(1);
    });

    it('should emit active true', () => {
      spyOn(component['active$'], 'next');

      component.ngAfterViewInit();

      expect(component['active$'].next).toHaveBeenCalledOnceWith(true);
    });

    it('should emit update', () => {
      spyOn(component['pageSize$'], 'next');

      component.ngAfterViewInit();

      expect(component['pageSize$'].next).toHaveBeenCalledOnceWith(3);
    });
  });

  describe('onShowMore', () => {
    it('should emit value 2', () => {
      component['page$'] = new BehaviorSubject<number>(1);
      spyOn(component['page$'], 'next');

      component.onShowMore();

      expect(component['page$'].next).toHaveBeenCalledOnceWith(2);
    });
  });

  describe('onToggleActive', () => {
    it('should set isShowSpinner to true', () => {
      component.isShowSpinner = false;
      expect(component.isShowSpinner).toBeFalse();

      component.onToggleActive(true);

      expect(component.isShowSpinner).toBeTrue();
    });

    it('should set isCurrent to true', () => {
      component.isCurrent = false;
      expect(component.isCurrent).toBeFalse();

      component.onToggleActive(true);

      expect(component.isCurrent).toBeTrue();
    });

    it('should set interviewsList to {}', () => {
      component.interviewsList = null;
      expect(component.interviewsList).toBe(null);

      component.onToggleActive(true);

      expect(component.interviewsList).toEqual({});
    });

    it('should emit active true', () => {
      spyOn(component['active$'], 'next');

      component.onToggleActive(true);

      expect(component['active$'].next).toHaveBeenCalledOnceWith(true);
    });

    it('should emit page 1', () => {
      spyOn(component['page$'], 'next');

      component.onToggleActive(true);

      expect(component['page$'].next).toHaveBeenCalledOnceWith(1);
    });
  });

  describe('onUpdate', () => {
    it('should set isOpenFinishedInterviewModal to true', () => {
      component.isOpenFinishedInterviewModal = null;
      expect(component.isOpenFinishedInterviewModal).toBeFalsy();

      component.onUpdate();

      expect(component.isOpenFinishedInterviewModal).toBeTrue();
    });

    it('should set interviewsList  to empty object', () => {
      component.interviewsList = null;
      expect(component.interviewsList).toBeFalsy();

      component.onUpdate();

      expect(component.interviewsList).toEqual({});
    });

    it('should emit page$ 1', () => {
      spyOn(component['page$'], 'next');

      component.onUpdate();

      expect(component['page$'].next).toHaveBeenCalledOnceWith(1);
    });

    it('should emit update', () => {
      spyOn(component['update$'], 'next');

      component.onUpdate();

      expect(component['update$'].next).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCloseMatrixModal', () => {
    it('should set isOpenMatrixModal to false', () => {
      component.isOpenMatrixModal = null;
      expect(component.isOpenMatrixModal).toBe(null);

      component.onCloseMatrixModal();

      expect(component.isOpenMatrixModal).toBeFalse();
    });

    it('should emit update', () => {
      spyOn(component['update$'], 'next');

      component.onCloseMatrixModal();

      expect(component['update$'].next).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCloseFinishedInterviewModal', () => {
    it('should set isOpenFinishedInterviewModal  to false', () => {
      component.isOpenFinishedInterviewModal = null;
      expect(component.isOpenFinishedInterviewModal).toBe(null);

      component.onCloseFinishedInterviewModal();

      expect(component.isOpenFinishedInterviewModal).toBeFalse();
    });
  });
});
