import { of } from 'rxjs';
import { cloneDeep } from 'lodash';
import { FormControl, Validators } from '@angular/forms';
import { InterviewersFeedbackService } from './../../../../core/services/interviewers-feedback.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InterviewComponent } from './interview.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { InterviewsService } from '@services/assessments/interviews.service';
import { LinkModule } from '@pipes/link/link.module';
import { IEmployeeInterview, IInterviewAssessment, IInterviewMatrix, ISimpleEmployee } from '@interfaces/interview';
import { MaxRowsModule } from '@pipes/max-rows/max-rows.module';

const matrixMock: IInterviewMatrix = {
  link: 'MATRIX_LINK',
  isDone: true
};

const interviewerMock: ISimpleEmployee = {
  id: 'INTERVIEWER_ID',
  name: 'INTERVIEWER_NAME'
};

const assessmentsMock: IInterviewAssessment[] = [
  {
    id: 'ASS_ID',
    technology: 'TECHNOLOGY',
    currentLevel: 'CURRENT_LEVEL',
    interviewer: { ...interviewerMock },
    matrix: { ...matrixMock },
    isCurrent: true
  },
  {
    id: 'ASS_ID_2',
    technology: 'TECHNOLOGY_2',
    currentLevel: 'CURRENT_LEVEL_2',
    interviewer: { ...interviewerMock },
    matrix: { ...matrixMock },
    isCurrent: true
  },
  {
    id: 'ASS_ID_3',
    technology: 'TECHNOLOGY_3',
    currentLevel: 'CURRENT_LEVEL_3',
    interviewer: { ...interviewerMock },
    matrix: { ...matrixMock },
    isCurrent: true
  },
];

const interviewMock: IEmployeeInterview = {
  salaryReviewId: 'SALARY_REVIEW_ID',
  comment: 'COMMENT',
  isCurrent: true,
  firstInterviewDate: '',
  interviewsDates: [],
  assessments: assessmentsMock,
  employee: {
    id: 'EMPLOYEE_ID',
    name: 'EMPLOYEE_NAME',
    skype: 'EMPLOYEE_SKYPE',
    isWork: true
  },
};

describe('InterviewComponent', () => {
  let component: InterviewComponent;
  let fixture: ComponentFixture<InterviewComponent>;

  const interviewService = jasmine.createSpyObj('InterviewsService', ['finishInterview']);
  const interviewersFeedbackService = jasmine.createSpyObj('InterviewersFeedbackService', ['saveFeedback']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewComponent],
      imports: [
        TimezoneModule,
        SafeHtmlModule,
        MaxRowsModule,
        LinkModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: InterviewsService, useValue: interviewService },
        { provide: InterviewersFeedbackService, useValue: interviewersFeedbackService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewComponent);
    component = fixture.componentInstance;
    component.interview = interviewMock;
  });

  afterEach(() => fixture.destroy());

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should create formControl', () => {
      expect(component.interviewerFeedback).toBeFalsy();

      fixture.detectChanges();

      expect(component.interviewerFeedback).toEqual(jasmine.any(FormControl));
    });

    it('should markAsDirty after value change', () => {
      fixture.detectChanges();

      spyOn(component.interviewerFeedback, 'markAsDirty');

      component.interviewerFeedback.patchValue('NEW_VALUE');

      expect(component.interviewerFeedback.markAsDirty).toHaveBeenCalledTimes(1);
    });
  });

  describe('finishInterview', () => {
    beforeEach(() => {
      interviewMock.assessments = cloneDeep(assessmentsMock);
      component.interviewerFeedback = new FormControl('', Validators.required);
      interviewService.finishInterview.and.returnValue(of(true));
    });

    afterEach(() => {
      interviewService.finishInterview.calls.reset();
    });

    it('should set error', () => {
      component.isErrorsShow = null;
      expect(component.isErrorsShow).toBe(null);

      component.finishInterview();

      expect(component.isErrorsShow).toBeTrue();
    });

    it('should mark control as touched', () => {
      spyOn(component.interviewerFeedback, 'markAsTouched');

      component.finishInterview();

      expect(component.interviewerFeedback.markAsTouched).toHaveBeenCalledTimes(1);
    });

    it('should call interviewService.finishInterview with SALARY_REVIEW_ID', () => {
      component.interviewerFeedback.patchValue('FEEDBACK');

      component.finishInterview();

      const service = TestBed.inject(InterviewsService);

      expect(service.finishInterview).toHaveBeenCalledOnceWith('SALARY_REVIEW_ID');
    });

    it('should emit interviewFinished', () => {
      component.interviewerFeedback.patchValue('FEEDBACK');

      spyOn(component.interviewFinished, 'emit');

      component.finishInterview();

      expect(component.interviewFinished.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSaveFeedback', () => {
    beforeEach(() => {
      interviewersFeedbackService.saveFeedback.and.returnValue(of(true));
      component.interviewerFeedback = new FormControl('', Validators.maxLength(3));
    });

    afterEach(() => {
      interviewersFeedbackService.saveFeedback.calls.reset();
    });

    it('should not call interviewersFeedback.saveFeedback', () => {
      component.interviewerFeedback.patchValue('LONG_VALUE');

      const service = TestBed.inject(InterviewersFeedbackService);

      component.onSaveFeedback('FEEDBACK');

      expect(service.saveFeedback).not.toHaveBeenCalled();
    });

    it('should call interviewersFeedback.saveFeedback with SALARY_REVIEW_ID and FEEDBACK', () => {
      component.interviewerFeedback.patchValue('NV');

      const service = TestBed.inject(InterviewersFeedbackService);

      component.onSaveFeedback('FEEDBACK');

      expect(service.saveFeedback).toHaveBeenCalledWith('SALARY_REVIEW_ID', 'FEEDBACK');
    });

    it('should set control ass pristine', () => {
      spyOn(component.interviewerFeedback, 'markAsPristine');

      component.onSaveFeedback('FEEDBACK');

      expect(component.interviewerFeedback.markAsPristine).toHaveBeenCalledTimes(1);
    });
  });
});
