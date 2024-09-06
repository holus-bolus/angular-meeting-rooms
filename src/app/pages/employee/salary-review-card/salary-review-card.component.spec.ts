import { IEmployeesReview, IReviewsHistory } from './../../../interfaces/candidate';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SalaryReviewCardComponent } from './salary-review-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewCardComponent } from './review-card/review-card.component';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AssessmentTooltipModule } from '@andkit/components/other/assessment-tooltip/assessment-tooltip.module';
import { ReviewService } from '@services/review.service';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { EmployeeIdService } from '@services/employee-id.service';

const routeDetails = {
  parent: {
    snapshot: {
      queryParams: {},
      paramMap: {
        get: () => ({})
      }
    }
  },
  snapshot: {
    queryParams: {},
    paramMap: {
      get: () => ({})
    }
  },
  data: of({
    salaryReviewCard: [
      { salaryReviews: [] }, ''
    ]
  })
};

const employeeReview: IEmployeesReview = {
  interviewsDatesTimes: ['startTime', 'endTime'],
  interviewers: [],
  isCurrent: true,
  isCanceled: false,
  reviewDate: '',
  position: 'POSITION'
};

const reviewHistoryMock: IReviewsHistory = {
  total: 66,
  nextReviewDate: Date.now().toLocaleString(),
  salaryReviews: Array(6).fill(employeeReview)
};

describe('SalaryReviewCardComponent', () => {
  let component: SalaryReviewCardComponent;
  let fixture: ComponentFixture<SalaryReviewCardComponent>;

  const employeeIdService = jasmine.createSpyObj('EmployeeIdService', ['getEmployeeId']);
  const reviewService = jasmine.createSpyObj('ReviewService', ['getReviewHistory']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AssessmentTooltipModule,
        SafeHtmlModule,
        TimezoneModule
      ],
      declarations: [SalaryReviewCardComponent, ReviewCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ReviewService, useValue: reviewService },
        { provide: ActivatedRoute, useValue: routeDetails },
        { provide: EmployeeIdService, useValue: employeeIdService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryReviewCardComponent);
    component = fixture.componentInstance;

    employeeIdService.getEmployeeId.and.returnValue('EMPLOYEE_ID');
    reviewService.getReviewHistory.and.returnValue(of(reviewHistoryMock));
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not set isOpenCancel modal', () => {
      component.isOpenCancelModal = null;
      expect(component.isOpenCancelModal).toBe(null);

      fixture.detectChanges();
      expect(component.isOpenCancelModal).toBe(null);
    });

    it('should not set true to isOpenCancelModal', () => {
      const activatedRoute = TestBed.inject(ActivatedRoute);
      activatedRoute.snapshot.queryParams.matrix = {};

      component.isOpenCancelModal = null;
      expect(component.isOpenCancelModal).toBe(null);

      fixture.detectChanges();
      expect(component.isOpenCancelModal).toBeTrue();

      activatedRoute.snapshot.queryParams = {};
    });

    it('should set employeeId', () => {
      component['employeeId'] = null;
      expect(component['employeeId']).toBe(null);

      fixture.detectChanges();

      expect(component['employeeId']).toBe('EMPLOYEE_ID');
    });

    it('should set salaryReviews$', () => {
      component.salaryReviews$ = null;
      expect(component.salaryReviews$).toBe(null);

      fixture.detectChanges();

      expect(component.salaryReviews$).toEqual(jasmine.any(Observable));
    });

    it('should set reviewHistory$', () => {
      component.reviewHistory$ = null;
      expect(component.reviewHistory$).toBe(null);

      fixture.detectChanges();

      expect(component.reviewHistory$).toEqual(jasmine.any(Observable));
    });

    it('should call subscribeTopEvents', () => {
      spyOn<any>(component, 'subscribeToEvents');

      fixture.detectChanges();

      expect(component['subscribeToEvents']).toHaveBeenCalledTimes(1);
    });
  });

  describe('onCloseModal', () => {
    it('should set false to isOpenCancelModal', () => {
      component.isOpenCancelModal = null;
      expect(component.isOpenCancelModal).toBe(null);

      component.onCloseModal();

      expect(component.isOpenCancelModal).toBeFalse();
    });

    it('should call update$.next', () => {
      spyOn(component['update$'], 'next');

      component.onCloseModal();

      expect(component['update$'].next).toHaveBeenCalledTimes(1);
    });
  });

  // SALARY_COUNT_PER_PAGE = 3
  describe('showMoreReviews', () => {
    beforeEach(() => {
      spyOn<any>(component, 'setReviewsOnPage').and.callFake(() => {});
    });

    it('should set number to reviewsOffset', () => {
      component['reviewsOffset'] = 0;
      expect(component['reviewsOffset']).toBe(0);

      component.showMoreReviews();

      expect(component['reviewsOffset']).toBe(3);
    });

    it('should call setReviewsOnPage', () => {
      component['reviewsOffset'] = 3;
      component['allSalaryReviews'] = [];

      component.showMoreReviews();

      expect(component['setReviewsOnPage']).toHaveBeenCalledOnceWith(jasmine.any(Number), jasmine.any(Array));
    });
  });

  describe('setReviewsOnPage', () => {
    it('should salaryReviewsSubject.next', () => {
      const offset = 2;
      const newReviews = Array(6).fill(employeeReview);

      const spy = spyOn(component['salaryReviewsSubject'], 'next');

      component['setReviewsOnPage'](offset, newReviews);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.calls.first().args[0].length).toBe(2);
    });

    it('should set true to isHaveNextPage', () => {
      const offset = 2;
      const newReviews = Array(6).fill(employeeReview);

      component.isHaveNextPage = null;
      expect(component.isHaveNextPage).toBe(null);

      component['setReviewsOnPage'](offset, newReviews);

      expect(component.isHaveNextPage).toBeTrue();
    });
  });

  describe('subscribeToEvents', () => {
    beforeEach(() => {
      component['employeeId'] = 'EMPLOYEE_ID';
      component['update$'] = new BehaviorSubject(null);
      component['reviewsOffset'] = 3;
    });

    it('should call reviewsService.getReviewHistory', () => {
      const service = TestBed.inject(ReviewService);
      component['subscribeToEvents']();

      expect(service.getReviewHistory).toHaveBeenCalledWith('EMPLOYEE_ID');
    });

    it('should set allSalaryReviews', () => {
      component['allSalaryReviews'] = null;
      expect(component['allSalaryReviews']).toBe(null);

      component['subscribeToEvents']();

      expect(component['allSalaryReviews']).toEqual(Array(6).fill(employeeReview));
    });

    it('should set total', () => {
      component.total = null;
      expect(component.total).toBe(null);

      component['subscribeToEvents']();

      expect(component.total).toBe(66);
    });

    it('should call setReviewsOnPage', () => {
      spyOn<any>(component, 'setReviewsOnPage');

      component['subscribeToEvents']();

      expect(component['setReviewsOnPage']).toHaveBeenCalledWith(3, jasmine.any(Array));
    });
  });
});
