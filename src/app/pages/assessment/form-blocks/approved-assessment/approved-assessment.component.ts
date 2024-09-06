import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {
  IAssessment,
  IEmployeeCandidate,
  IInterviewerPreview,
} from '@interfaces/candidate';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap, takeUntil, catchError, tap, concatMap } from 'rxjs/operators';
import { iif, Observable, of, Subject, throwError, timer } from 'rxjs';
import { Moment } from 'moment-timezone/moment-timezone';
import { getLateReviewDateValidator } from '@validators/late-interview-date.validator';
import {
  CURRENT_INTERVIEW_DATE_ERROR_MESSAGE, CURRENT_REVIEW_DATE_ERROR_MESSAGE,
  DEFAULT_HOURS,
  DEFAULT_MINUTES, EARLY_REVIEW_DATE_ERROR_MESSAGE, LATE_INTERVIEW_DATE_ERROR_MESSAGE
} from '@pages/assessment/pages/approved-page/approved-page';
import { ICommonOption } from '@interfaces/filter';
import { IDateErrors, IInterviewValues, IPlanned } from '@interfaces/assessment';
import { IOptionsData } from '@pages/main/main-events-filter/main-events-filter.component';
import { TimeService } from '@services/portal/time.service';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { DATE_PIECES } from '@constants/moment.constant';
import { getCurrentInterviewDateValidator } from '@validators/current-interview-date.validator';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { AssessmentService } from '@services/assessments/assessment.service';
import { CandidatesService } from '@services/assessments/candidates.service';
import { InterviewsService } from '@services/assessments/interviews.service';
import { getCurrentReviewDateValidator } from '@validators/current-review-date.validator';

import dateIconSvg from '!!raw-loader!../../icons/date-icon.svg';

@Component({
  selector: 'andteam-approved-assessment',
  templateUrl: './approved-assessment.component.html',
  styleUrls: ['./approved-assessment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApprovedAssessmentComponent implements OnInit, OnDestroy {
  assessmentForm: FormGroup;
  destroy = new Subject<void>();
  interviewers: ICommonOption[];
  isAssessment = true;
  isSubmitted = false;
  isInitInterviewDateStatus = true;
  interviewerPlaceholder = 'Select an interviewer';
  datePlaceholder = 'dd.mm.yyyy';
  interviewerDisabled = false;
  reviewDateError: boolean;
  reviewDateErrorMessage: string;
  interviewDateError: boolean;
  interviewDateErrorMessage: string;
  interviewerError: boolean;
  interviewer: string;
  interviewDate$ = new Subject<IOptionsData<string>>();
  interviewer$ = new Subject<IOptionsData<string>>();
  reviewDate$ = new Subject<IOptionsData<string>>();
  isShowReviewDateError: boolean;
  interviewDate: Moment;
  isInterviewDateBusinessError: boolean;
  componentType = COMPONENT_TYPES.ASSESSMENT;
  isShowLoader = false;

  readonly dateIcon: string = dateIconSvg;

  @Input() candidateId: string;
  @Input() reviewDate: string | Moment;
  @Input() assessment: IAssessment;
  @Input() employee: IEmployeeCandidate;
  @Input() planningAssessmentsLength: number;
  @Input() isApprovedPage: boolean;
  @Input() assessmentIndex: number;
  @Input() isShowForm: boolean;
  @Input() minReviewDate: Date;
  @Input() isShowAssessmentLoading: boolean;

  @Output() plan = new EventEmitter<IPlanned>();
  @Output() updateCandidates = new EventEmitter<string>();
  @Output() changeInterviewDate = new EventEmitter<string>();
  @Output() startChangingInterviewer = new EventEmitter<void>();
  @Output() formCreated = new EventEmitter<FormGroup>();

  public get isDisabledTimePicker(): boolean {
    return !this.assessmentForm.get('interviewDate').value
      || this.interviewerDisabled
      || this.isShowAssessmentLoading
      || this.isShowLoader;
  }

  constructor(
    private assessmentService: AssessmentService,
    private candidatesService: CandidatesService,
    private formBuilder: FormBuilder,
    private timeService: TimeService,
    private changeDetectorRef: ChangeDetectorRef,
    private interviewsService: InterviewsService
  ) { }

  public ngOnInit(): void {
    this.interviewerDisabled = this.assessment.interviewerMatrix && this.assessment.interviewerMatrix.isDone
      || this.assessment.mergeMatrix && this.assessment.mergeMatrix.isDone;

    this.isShowReviewDateError = this.isApprovedPage || (!this.isApprovedPage && !this.assessmentIndex);

    this.isShowAssessmentLoading = this.isShowAssessmentLoading
      || (this.assessment && this.assessment.isInProcessing && this.isApprovedPage);

    this.initForms();
    this.formCreated.emit(this.assessmentForm);
    this.setupInterviewers(this.assessmentForm.get('interviewer'));

    this.getResponseInterviewDate()
      .pipe(
        takeUntil(this.destroy),
        catchError(() => {
          this.isShowLoader = false;

          return throwError(null);
        })
      )
      .subscribe(() => {
        this.isInterviewDateBusinessError = false;
        this.isShowLoader = false;
        this.changeInterviewDate.emit(this.getInterviewDate().format());
      });

    this.getResponseInterviewer()
      .subscribe(() => {
        this.updateCandidates.emit(this.candidateId);
        this.candidatesService.triggerClearFilters();
      });

    this.getResponseReviewDate()
      .subscribe(() => {
        if (!this.isApprovedPage) {
          this.candidatesService.triggerClearFilters();
        }

        this.updateCandidates.emit(this.candidateId);
      });

    this.candidatesService.getReviewDate()
      .pipe(takeUntil(this.destroy))
      .subscribe((reviewDate: Date) => {
        this.assessmentForm.get('reviewDate').setValue(reviewDate);
        this.changeDetectorRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public onSaveInterviewDate({ relatedTarget }: MouseEvent): void {
    const isReviewDateElement = relatedTarget
      ? (relatedTarget as HTMLElement).classList.contains('cdk-overlay-backdrop')
      : false;
    const selectedInterviewDate = this.getInterviewDate();
    const isChangedInterviewDate = !isReviewDateElement
      && selectedInterviewDate
      && this.interviewDate.valueOf() !== selectedInterviewDate.valueOf();

    if (isChangedInterviewDate) {
      const interviewDateErrors = this.getDatesErrors('interviewDate');
      const { isExpiredDate, isRequiredError } = interviewDateErrors;
      const isValidInterviewDate = !isExpiredDate && !isRequiredError;

      this.isInitInterviewDateStatus = false;
      this.setInterviewDateError(interviewDateErrors);

      if (isValidInterviewDate && !this.interviewDateErrorMessage) {
        this.isShowLoader = true;
        this.isInterviewDateBusinessError = false;
        this.interviewDate = selectedInterviewDate;

        this.interviewDate$.next({ id: this.assessment.id, value: selectedInterviewDate.format() });
      }
    }
  }

  public onSaveInterviewer({ id, name }: ICommonOption, assessment: IAssessment): void {
    this.interviewerError = this.getInterviewerError();

    if (!this.interviewerError) {
      this.interviewer = name;
      this.interviewer$.next({ id: assessment.id, value: id });
    }
  }

  public onBlurField(value: string): void {
    this.assessmentForm.get('interviewer').setValue(this.interviewer);
  }

  public onDeleteInterviewer({ id }: IAssessment): void {
    this.interviewer = '';
    this.assessmentForm.get('interviewer').setValue('');
    this.interviewer$.next({ id, value: null });
  }

  public onSaveReviewDate(date: Moment): void {
    const reviewDateErrors = this.getDatesErrors('reviewDate');
    const { isExpiredDate, isRequiredError } = reviewDateErrors;
    const isValidReviewDate = !isExpiredDate && !isRequiredError;

    this.setReviewDateError(reviewDateErrors);
    this.candidatesService.triggerReviewDate(date);

    if (isValidReviewDate) {
      const isoDateFormat = date.add(DATE_PIECES.MINUTES, date.utcOffset()).toISOString();

      this.assessmentForm.get('reviewDate').setValue(isoDateFormat);
      this.reviewDate$.next({ id: this.candidateId, value: isoDateFormat });
    }
  }

  public getInterviewerError(): boolean {
    return this.isSubmitted && this.assessmentForm.controls.interviewer.invalid;
  }

  public getInterviewDateErrorMessage(dateErrors: IDateErrors): string {
    const { isExpiredDate, isRequiredError, isReviewEarlierInterview } = dateErrors;

    if (isRequiredError) {
      return '';
    }

    if (isExpiredDate && !this.isInitInterviewDateStatus) {
      return CURRENT_INTERVIEW_DATE_ERROR_MESSAGE;
    }

    if (isReviewEarlierInterview && !this.isInitInterviewDateStatus) {
      return LATE_INTERVIEW_DATE_ERROR_MESSAGE;
    }
  }

  getReviewDateErrorMessage(dateErrors: IDateErrors): string {
    const { isExpiredDate, isRequiredError, isReviewEarlierInterview } = dateErrors;

    if (isRequiredError) {
      return '';
    }

    if (isExpiredDate) {
      return CURRENT_REVIEW_DATE_ERROR_MESSAGE;
    }

    if (isReviewEarlierInterview) {
      return EARLY_REVIEW_DATE_ERROR_MESSAGE;
    }
  }

  public onPlanned(): void {
    this.isSubmitted = true;
    this.isInitInterviewDateStatus = false;

    if (this.assessmentForm.valid) {
      this.isShowAssessmentLoading = true;

      const date = new Date(this.assessmentForm.get('reviewDate').value);
      const plannedAssessment = {
        reviewDate: date.toISOString(),
        interviewerId: this.getInterviewerId(),
        interviewDate: this.getInterviewDate().utc().format(),
      };

      this.plan.emit({
        plannedAssessment,
        assessmentId: this.assessment.id,
        planningAssessmentsLength: this.planningAssessmentsLength,
        name: this.employee.name,
        candidateId: this.candidateId
      });
    } else {
      this.setDateErrors();
      this.interviewerError = this.getInterviewerError();
      this.plan.emit(null);
    }
  }

  private hasErrors(errors: IDateErrors): boolean {
    return Object
      .keys(errors)
      .some(error => errors[error]);
  }

  private getResponseInterviewDate(): Observable<void> {
    return this.interviewDate$
      .pipe(
        concatMap(({ id, value }) => this.assessmentService.setInterviewDate(id, value)),
        catchError((error) => {
          this.assessmentService.triggerError(error);

          return this.getResponseInterviewDate();
        }),
      );
  }

  private getResponseInterviewer(): Observable<void> {
    return this.interviewer$
      .pipe(
        tap(() => this.startChangingInterviewer.emit()),
        switchMap(({ id, value }) => this.assessmentService.setInterviewer(id, value)),
        catchError(() => this.getResponseInterviewer()),
        takeUntil(this.destroy),
      );
  }

  private getResponseReviewDate(): Observable<void> {
    return this.reviewDate$
      .pipe(
        switchMap(({ id, value }) => this.candidatesService.setReviewDate(id, value)),
        catchError(() => this.getResponseReviewDate()),
        takeUntil(this.destroy),
      );
  }

  private setDateErrors(): void {
    const reviewDateErrors = this.getDatesErrors('reviewDate');
    const interviewDateErrors = this.getDatesErrors('interviewDate');

    this.setReviewDateError(reviewDateErrors);
    this.setInterviewDateError(interviewDateErrors);
  }

  private setReviewDateError(reviewDateErrors: IDateErrors): void {
    this.reviewDateError = this.hasErrors(reviewDateErrors);
    this.reviewDateErrorMessage = this.getReviewDateErrorMessage(reviewDateErrors);
  }

  private setInterviewDateError(interviewDateErrors: IDateErrors): void {
    this.interviewDateError = this.hasErrors(interviewDateErrors);
    this.interviewDateErrorMessage = this.getInterviewDateErrorMessage(interviewDateErrors);
  }

  private getInterviewDate(): Moment {
    const { interviewDate, interviewTime } = this.assessmentForm.value;

    if (interviewDate && interviewTime) {
      const [hours, minutes] = interviewTime.split(':');

      return this.timeService.getTimezoneDate(interviewDate).hours(hours).minutes(minutes);
    }

    return null;
  }

  private getInterviewerId(): string {
    const { value } = this.assessmentForm.get('interviewer');
    const { id } = this.interviewers.find(interviewer => interviewer.name === value);

    return id;
  }

  private initForms(): void {
    const { reviewDate, interviewer, interviewDate, interviewTime } = this.getInterviewValues();

    this.interviewer = interviewer;
    this.interviewDate = interviewDate;
    this.assessmentForm = this.formBuilder.group(
      {
        reviewDate: [reviewDate, [Validators.required, getCurrentReviewDateValidator()]],
        interviewDate: [interviewDate, [Validators.required]],
        interviewTime: [interviewTime, [Validators.required]],
        interviewer: [interviewer, [Validators.required]],
      },
      {
        validators: [
          getCurrentInterviewDateValidator('interviewTime', 'interviewDate'),
          getLateReviewDateValidator()
        ]
      }
    );
  }

  private getInterviewValues(): IInterviewValues {
    const reviewDate = this.timeService.getTimezoneDate(this.reviewDate);
    const interviewer = this.assessment
      && this.assessment.interviewer
      && this.assessment.interviewer.name || '';
    const interviewDateTime = this.assessment && this.assessment.interviewDateTime;
    const interviewDate = this.getDateTime(interviewDateTime);
    const interviewTime = interviewDate.format('HH:mm');

    return { reviewDate, interviewer, interviewDate, interviewTime };
  }

  private setupInterviewers(control: AbstractControl): void {
    control.valueChanges
      .pipe(
        switchMap(value => iif(
          () => value.length >= 3,
          timer(INITIAL_DELAY)
            .pipe(
              switchMap(() => this.interviewsService.getInterviewers(value)),
              map(response => response.length
                ? response
                : null)
            ),
          of([]))
        ),
        takeUntil(this.destroy)
      )
      .subscribe(
        (interviewers: IInterviewerPreview[]) => {
          this.interviewers = this.getInterviewers(interviewers);
          this.changeDetectorRef.markForCheck();
        }
      );

    if (control.value) {
      const { id, name } = this.assessment.interviewer;

      this.interviewers = [{ id, name }];
    }
  }

  private getInterviewers(interviewers: IInterviewerPreview[]): ICommonOption[] {
    return interviewers && interviewers.map((interviewer) => {
      return {
        id: interviewer.id,
        name: `${interviewer.surname} ${interviewer.name}`
      };
    });
  }

  private getDatesErrors(controlName: string): IDateErrors {
    const groupErrors = this.assessmentForm.errors;
    const { errors } = this.assessmentForm.get(controlName);

    const isReviewEarlierInterview = groupErrors && groupErrors.lateInterviewDateError;
    const isRequiredError = errors && errors.required && this.isSubmitted;
    const isExpiredDate = controlName === 'reviewDate'
      ? errors && errors.currentReviewDateError
      : groupErrors && groupErrors.currentInterviewDateError;

    return { isExpiredDate: !!isExpiredDate, isRequiredError: !!isRequiredError, isReviewEarlierInterview: !!isReviewEarlierInterview };
  }

  private getDateTime(interviewDateTime: string): Moment {
    if (interviewDateTime) {
      return this.timeService.getTimezoneDate(interviewDateTime);
    }

    return this.timeService.getTimezoneDate(new Date()).hours(DEFAULT_HOURS).minutes(DEFAULT_MINUTES);
  }
}
