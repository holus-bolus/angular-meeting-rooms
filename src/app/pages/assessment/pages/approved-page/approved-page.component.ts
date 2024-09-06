import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  Output,
  Input,
  EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment-timezone/moment-timezone';
import { IAssessment, IConfirmationManager, IEmployeeCandidate, ISalaryReview } from '@interfaces/candidate';
import { MAX_LENGTH_COMMENT } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { ICommonOption } from '@interfaces/filter';
import { IPlanned, IPlannedWithoutInterview } from '@interfaces/assessment';
import {
  CURRENT_REVIEW_DATE_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE
} from '@pages/assessment/pages/approved-page/approved-page';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { IOptionsData } from '@pages/main/main-events-filter/main-events-filter.component';
import { TimeService } from '@services/portal/time.service';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { Observable, Subject } from 'rxjs';
import { DATE_PIECES } from '@constants/moment.constant';
import { AssessmentService } from '@services/assessments/assessment.service';
import { CandidatesService } from '@services/assessments/candidates.service';
import { InterviewsService } from '@services/assessments/interviews.service';
import { getCurrentReviewDateValidator } from '@validators/current-review-date.validator';

import dateIconSvg from '!!raw-loader!../../icons/date-icon.svg';

@Component({
  selector: 'andteam-approved-page',
  templateUrl: './approved-page.component.html',
  styleUrls: ['./approved-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovedPageComponent implements OnInit, OnDestroy {
  isAssessment = true;
  destroy = new Subject<void>();
  isUnscheduled = false;
  employee: IEmployeeCandidate;
  confirmationManager: IConfirmationManager;
  datePlaceholder = 'dd.mm.yyyy';
  reviewDateFrom1C: Moment | string;
  managerComment: string;
  planningAssessments: IAssessment[] = [];
  interviewers: ICommonOption[];
  candidateId: string;
  plannedAssessment: IAssessment;
  isSubmitted: boolean;
  reviewDate: Moment | string;
  reviewDateError: string;
  reviewDate$ = new Subject<IOptionsData<string>>();
  isApprovedPage = true;
  isShowForm = true;
  maxCommentLength = MAX_LENGTH_COMMENT;
  minReviewDate: Moment;
  interviewDates: string[];

  coordinatorCommentControl: FormControl;
  reviewDateControl: FormControl;
  approvedForm: FormGroup;
  assessmentsFormArray: FormArray;
  componentType = COMPONENT_TYPES.ASSESSMENT;

  readonly dateIcon = dateIconSvg;

  @Input() candidateDetails: Observable<ISalaryReview>;
  @Input() isShowAssessmentLoading: boolean;
  @Input() plannedAssessmentId: string;

  @Output() plan = new EventEmitter<IPlanned>();
  @Output() planWithoutInterview = new EventEmitter<IPlannedWithoutInterview>();
  @Output() updateCandidates = new EventEmitter<string>();
  @Output() formCreated = new EventEmitter<FormGroup>();

  constructor(private candidatesService: CandidatesService,
              private interviewsService: InterviewsService,
              private timeService: TimeService,
              private assessmentService: AssessmentService,
              private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.initForms();
    this.formCreated.emit(this.approvedForm);

    this.setupReviewDate().subscribe();

    this.candidateDetails
      .pipe(
        filter(candidateDetails => !!candidateDetails),
        takeUntil(this.destroy)
      )
      .subscribe(
        (candidateDetails) => {
          const {coordinatorComment, managerComment, reviewDate, assessments,
            isUnscheduled, confirmationManager, employee, id, reviewDateERP} = candidateDetails;

          this.confirmationManager = confirmationManager;
          this.reviewDateFrom1C = reviewDateERP;
          this.managerComment = managerComment;
          this.candidateId = id;
          this.planningAssessments = [];
          this.plannedAssessment = null;
          this.isSubmitted = false;

          this.assessmentsFormArray.clear();

          if (assessments.length) {
            this.setupAssessments(assessments);
            this.minReviewDate = assessments.length
              ? this.assessmentService.getMinReviewDateFromAssessments(assessments)
              : null;
            this.interviewDates = assessments.map((assessment) => {
              return assessment.interviewDateTime
                ? String(assessment.interviewDateTime)
                : null;
            });
          }

          this.coordinatorCommentControl.setValue(coordinatorComment || '');
          this.reviewDateControl.setValue(reviewDate || '');

          this.employee = employee;
          this.reviewDate = reviewDate;
          this.isUnscheduled = isUnscheduled;

          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public onChangeInterviewDate(interviewDate: string, index: number): void {
    const maxInterviewDate = this.plannedAssessment
      ? this.maxPlannedInterviewDate(interviewDate)
      : this.getLatestDate(interviewDate, index);

    this.minReviewDate = this.assessmentService.getMinReviewDate(this.timeService.getTimezoneDate(maxInterviewDate));
  }

  public onSaveReviewDate(date: Moment): void {
    this.reviewDateError = this.getReviewDateError();

    if (this.reviewDateControl.valid) {
      const isoDateFormat = date.add(DATE_PIECES.MINUTES, date.utcOffset()).toISOString();
      const reviewDate = this.timeService.getTimezoneDate(date).toISOString();

      this.reviewDateControl.setValue(isoDateFormat);
      this.reviewDate$.next({ id: this.candidateId, value: reviewDate });
    }
  }

  public onPlanWithoutInterview(): void {
    this.isSubmitted = true;
    this.reviewDateError = this.getReviewDateError();

    if (this.reviewDateControl.valid) {
      const date = new Date(this.reviewDateControl.value);

      this.planWithoutInterview.emit({
        candidateId: this.candidateId,
        reviewDate: this.timeService.getTimezoneDate(date).toISOString(),
        name: this.employee.name
      });
    }
  }

  public onPlan(property: IPlanned): void {
    this.plan.emit(property);
  }

  public onFormCreated(control: FormGroup): void {
    this.assessmentsFormArray.push(control);
  }

  public onUpdateCandidates(candidateId: string): void {
    this.updateCandidates.emit(candidateId);
  }

  private maxPlannedInterviewDate(interviewDate: string): Moment {
    const plannedInterviewDate = this.timeService.getTimezoneDate(this.plannedAssessment.interviewDateTime);
    const currentInterviewDate = this.timeService.getTimezoneDate(interviewDate);

    return plannedInterviewDate > currentInterviewDate
      ? plannedInterviewDate
      : currentInterviewDate;
  }

  private getLatestDate(interviewDate: string, index: number): string {
    this.interviewDates[index] = interviewDate;

    const [mainInterviewDate, additionalInterviewDate] = this.interviewDates;

    if (!additionalInterviewDate) {
      return mainInterviewDate;
    }

    return new Date(mainInterviewDate) >= new Date(additionalInterviewDate)
      ? mainInterviewDate
      : additionalInterviewDate;
  }

  private getReviewDateError(): string {
    const { errors } = this.reviewDateControl;

    const isRequiredError = errors && errors.required && this.isSubmitted;
    const isExpiredDate = errors && errors.currentReviewDateError;

    if (isRequiredError) {
      return REQUIRED_ERROR_MESSAGE;
    }

    if (isExpiredDate) {
      return CURRENT_REVIEW_DATE_ERROR_MESSAGE;
    }
  }

  private initForms(): void {
    this.coordinatorCommentControl = new FormControl('', Validators.maxLength(this.maxCommentLength));
    this.reviewDateControl = new FormControl('',
                                             [Validators.required, getCurrentReviewDateValidator()]);
    this.assessmentsFormArray = new FormArray([]);
    this.approvedForm = new FormGroup({
      coordinatorComment: this.coordinatorCommentControl,
      reviewDate: this.reviewDateControl,
      assessments: this.assessmentsFormArray
    });
  }

  private setupReviewDate(): Observable<void> {
    return this.reviewDate$
      .pipe(
        switchMap(({ id, value }) => this.candidatesService.setReviewDate(id, value)),
        takeUntil(this.destroy),
        catchError(() => this.setupReviewDate())
      );
  }

  private setupAssessments(assessments: IAssessment[]): void {
    assessments.forEach((assessment) => {
      if (assessment.assessmentStatus === 'Planning') {
        this.planningAssessments.push(assessment);
      } else {
        this.plannedAssessment = assessment;
      }
    });
  }
}
