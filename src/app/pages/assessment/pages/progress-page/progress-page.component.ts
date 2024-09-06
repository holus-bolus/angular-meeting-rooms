import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  IAssessment,
  ICurrencyOption,
  IEmployeeCandidate,
  ISalaryReview,
  ISalaryPayload
} from '@interfaces/candidate';
import { catchError, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Moment } from 'moment-timezone/moment-timezone';
import {
  DEFAULT_CURRENCY,
  DEFAULT_CURRENCY_OPTION,
} from '@pages/assessment/pages/progress-page/progress-page';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';
import { ASSESSMENT_PAGES, MAX_LENGTH_COMMENT } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { SalaryService } from '@services/assessments/salary.service';
import { DATE_PIECES } from '@constants/moment.constant';
import { CURRENCIES } from '@constants/currencies';
import { AssessmentService } from '@services/assessments/assessment.service';
import {
  CURRENT_REVIEW_DATE_ERROR_MESSAGE,
  REQUIRED_ERROR_MESSAGE
} from '@pages/assessment/pages/approved-page/approved-page';
import { getCurrentReviewDateValidator } from '@validators/current-review-date.validator';
import { TimeService } from '@services/portal/time.service';
import { Observable, Subject } from 'rxjs';
import { CandidatesService } from '@services/assessments/candidates.service';
import { LanguageService } from '@services/assessments/language.service';
import { ILanguages, ILanguagesLevels } from '@interfaces/languages';

import dateIconSvg from '!!raw-loader!../../icons/date-icon.svg';

@Component({
  selector: 'andteam-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrls: ['./progress-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() type: ASSESSMENT_PAGES;
  @Input() candidateDetails: Observable<ISalaryReview>;
  @Input() currencies: ICurrencyOption[];

  @Output() formCreated = new EventEmitter<FormGroup>();
  @Output() updateCandidates = new EventEmitter<string>();

  public isPreparation: boolean;
  public employee: IEmployeeCandidate;
  public reviewId: string;
  public managerComment: string;
  public reviewDateError$: Observable<boolean>;
  public reviewDateErrorMessage$: Observable<string>;
  public destroy$ = new Subject();
  public interviewDates: string[];
  public candidateId$: Observable<string>;
  public coordinatorCommentControl: FormControl;
  public reviewDateControl: FormControl;
  public salaryControl: FormControl;
  public reviewDate$ = new Subject<Moment>();
  public preparationForm: FormGroup;
  public assessmentsFormArray: FormArray;
  public salaryForm: FormGroup;
  public salary$ = new Subject<ISalaryPayload>();
  public assessments: IAssessment[];
  public minReviewDate: Moment;
  public isShowReviewDate: boolean;
  public maxLengthComment = MAX_LENGTH_COMMENT;
  public selectType = COMPONENT_TYPES.LANGUAGE_LEVEL;
  public selectedCurrency = DEFAULT_CURRENCY_OPTION;
  public date: Date;
  public getAllLanguagesList$: Observable<ILanguages[]>;
  public languagesLevelsList$: Observable<ILanguagesLevels[]>;

  readonly dateIcon = dateIconSvg;

  constructor(
    private candidatesService: CandidatesService,
    private salaryService: SalaryService,
    private assessmentService: AssessmentService,
    private changeDetectorRef: ChangeDetectorRef,
    private timeService: TimeService,
    private languageService: LanguageService,
  ) { }

  public ngOnInit(): void {
    this.initControls();

    this.reviewDateError$ = this.reviewDateControl.statusChanges
      .pipe(map(() => this.reviewDateControl.invalid && this.reviewDateControl.touched));
    this.reviewDateErrorMessage$ = this.reviewDateError$
      .pipe(map(() => this.reviewDateControl.touched ? this.getReviewDateErrorMessage() : null));

    this.isPreparation = this.type === 'preparation';
    this.subscribeToChanges();
    this.formCreated.emit(this.preparationForm);

    this.candidateId$ = this.candidateDetails.pipe(
      tap((candidate: ISalaryReview) => this.managerComment = candidate.managerComment),
      map((candidate: ISalaryReview) => candidate.id)
    );

    this.getAllLanguagesList$ = this.languageService.getLanguagesList$();
    this.languagesLevelsList$ = this.languageService.getLanguagesLevelsList$();
  }

  public ngAfterViewInit(): void {
    this.subscribeToCandidateChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onUpdateCandidates(candidateId: string): void {
    this.updateCandidates.emit(candidateId);
  }

  public onChangeReviewDate(date: Moment): void {
    this.reviewDateControl.markAsTouched();

    if (this.reviewDateControl.valid) {
      this.reviewDate$.next(date);
    }
  }

  public onChangeSalary(salary: ISalaryPayload): void {
    this.salary$.next(salary);
  }

  public onFormCreated(control: FormControl): void {
    this.assessmentsFormArray.push(control);
  }

  public onChangeInterviewDate(interviewDate: string, currentIndex: number): void {
    const maxInterviewDate = this.getLatestDate(interviewDate, currentIndex);

    this.minReviewDate = this.assessmentService.getMinReviewDate(maxInterviewDate);
  }

  private getLatestDate(interviewDate: string, index: number): Moment {
    this.interviewDates[index] = interviewDate;

    const [mainInterviewDate, additionalInterviewDate] = this.interviewDates
      .map(date => this.timeService.getTimezoneDate(date));

    if (!additionalInterviewDate) {
      return mainInterviewDate;
    }

    return mainInterviewDate >= additionalInterviewDate
      ? mainInterviewDate
      : additionalInterviewDate;
  }

  private getReviewDateErrorMessage(): string {
    const { errors } = this.reviewDateControl;

    const isRequiredError = errors && errors.required;
    const isExpiredDate = errors && errors.currentReviewDateError;

    if (isRequiredError) {
      return REQUIRED_ERROR_MESSAGE;
    }

    if (isExpiredDate) {
      return CURRENT_REVIEW_DATE_ERROR_MESSAGE;
    }
  }

  private subscribeToCandidateChanges(): void {
    this.candidateDetails
      .pipe(
        filter(review => !!review),
        takeUntil(this.destroy$),
      )
      .subscribe((review: ISalaryReview) => {
        const { id, assessments, salaryCurrency = DEFAULT_CURRENCY, employee } = review;

        this.employee = employee;
        this.reviewId = id;
        this.assessments = assessments;
        this.isShowReviewDate = this.type === ASSESSMENT_PAGES.PREPARATION
          || assessments.some((assessment: IAssessment) => assessment.interviewerMatrix && assessment.interviewerMatrix.isDone);
        this.selectedCurrency = { name: CURRENCIES[salaryCurrency], id: salaryCurrency };

        this.assessmentsFormArray.clear();
        this.updateControls(review);
        this.minReviewDate = this.assessments.length
          ? this.assessmentService.getMinReviewDateFromAssessments(this.assessments)
          : null;
        this.interviewDates = assessments.map((assessment: IAssessment) => {
          return assessment.interviewDateTime
            ? String(assessment.interviewDateTime)
            : null;
        });

        this.changeDetectorRef.markForCheck();
      });
  }

  private initControls(): void {
    this.coordinatorCommentControl = new FormControl('', Validators.maxLength(this.maxLengthComment));
    this.reviewDateControl = new FormControl('', [Validators.required, getCurrentReviewDateValidator()]);
    this.salaryControl = new FormControl(
      {
        salaryRequirement: '',
        salaryCurrency: DEFAULT_CURRENCY
      },
    );
    this.salaryForm = new FormGroup({
      salary: this.salaryControl,
      comment: new FormControl('', Validators.maxLength(this.maxLengthComment))
    });
    this.assessmentsFormArray = new FormArray([]);

    this.preparationForm = new FormGroup({
      salary: this.salaryForm,
      coordinatorComment: this.coordinatorCommentControl,
      reviewDate: this.reviewDateControl,
      assessments: this.assessmentsFormArray
    });
  }

  private updateControls(review: ISalaryReview): void {
    const {
      coordinatorComment,
      reviewDate,
      salaryRequirement,
      salaryCurrency,
      salaryComment,
    } = review;

    this.coordinatorCommentControl.setValue(coordinatorComment || '');
    this.reviewDateControl.setValue(reviewDate || '');
    this.reviewDateControl.markAsUntouched();
    this.salaryForm.setValue({
      salary: {
        salaryRequirement: salaryRequirement || '',
        salaryCurrency: salaryCurrency || DEFAULT_CURRENCY
      },
      comment: salaryComment || ''
    });
  }

  private subscribeToChanges(): void {
    this.subscribeToReviewDate();
    this.subscribeToSalary();
  }

  private subscribeToReviewDate(): void {
    this.reviewDateChanges().subscribe(
      () => {
        this.candidatesService.triggerClearFilters();
        this.updateCandidates.emit(this.reviewId);
      }
    );
  }

  private subscribeToSalary(): void {
    this.salaryChanges().subscribe();
  }

  private reviewDateChanges(): Observable<void> {
    return this.reviewDate$
      .pipe(
        switchMap((date: Moment) => {
          const reviewDate = date.add(DATE_PIECES.MINUTES, date.utcOffset()).toISOString();

          this.reviewDateControl.setValue(reviewDate);

          return this.candidatesService.setReviewDate(this.reviewId, reviewDate);
        }),
        catchError(() => this.reviewDateChanges()),
        takeUntil(this.destroy$)
      );
  }

  private salaryChanges(): Observable<void> {
    return this.salary$.asObservable()
      .pipe(
        switchMap((salary: ISalaryPayload) => {
          const salaryPayload: ISalaryPayload = {
            salaryCurrency: salary.salaryCurrency,
            salaryRequirement: salary.salaryRequirement
          };

          return this.salaryService.updateSalary(this.reviewId, salaryPayload);
        }),
        catchError(() => {
          return this.salaryChanges();
        }),
        takeUntil(this.destroy$)
      );
  }
}
