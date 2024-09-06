import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  IAssessment,
  ICandidate,
  ICurrencyOption,
  IReviewsResponse,
  ISalaryReview
} from '@interfaces/candidate';
import {
  AssessmentTabs,
  INTERVIEW_PLAN_MESSAGE,
  NO_EMPLOYEES_MESSAGE,
  NO_FILTERED_EMPLOYEES_MESSAGE,
  PLAN_MESSAGE,
  START_INDEX,
  TABS,
  touchValidateDeep
} from './coordinator-cabinet';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ICandidateDetails,
  IPlanned,
  IPlannedWithoutInterview,
  IToastNotification,
} from '@interfaces/assessment';
import { TabsService } from '@services/assessments/tabs.service';
import { OfficeService } from '@services/office.service';
import { CURRENCIES } from '@constants/currencies';
import { TimeService } from '@services/portal/time.service';
import { AssessmentService } from '@services/assessments/assessment.service';
import { CandidatesService } from '@services/assessments/candidates.service';
import { InterviewsService } from '@services/assessments/interviews.service';
import { REVIEW_STATES } from '@constants/candidates.constants';

import messageSvg from '!!raw-loader!./icons/message.svg';

@Component({
  selector: 'andteam-coordinator-cabinet',
  templateUrl: './coordinator-cabinet.component.html',
  styleUrls: ['./coordinator-cabinet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorCabinetComponent implements OnInit, OnDestroy {
  public tabs = TABS;
  public activeTab = 'approved';
  public noEmployeesMessage = NO_EMPLOYEES_MESSAGE;
  public noFilteredEmployeesMessage = NO_FILTERED_EMPLOYEES_MESSAGE;
  public activeDate: string;
  public sidebarCandidates: ICandidate[] = [];
  public allCandidates: ICandidate[];
  public technologies: string[] = [];
  public currencies: ICurrencyOption[] = [];
  public resourceManagers: string[] = [];
  public interviewers: string[] = [];
  public isToastNotification: boolean;
  public employee: ISalaryReview;
  public reviewDates: string[] = [];
  public activeCandidateIndex = 0;
  public employeeForm: FormControl;
  public planMessage: string;
  public addedReviewDate: string;
  public employeeName: string;
  public validationError: Observable<boolean>;
  public mainForm: FormGroup;
  public destroy$ = new Subject<void>();
  public candidateDetails$: Observable<ISalaryReview>;
  public isShowCandidateDetails: boolean;
  public isShowAssessmentLoading: boolean;
  public isShowLoader = true;
  public plannedAssessmentId: string;
  public searchField = '';

  readonly messageIcon = messageSvg;

  private candidateDetails = new BehaviorSubject<ISalaryReview>(null);
  private toastNotification = new Subject<IToastNotification>();

  constructor(
    private candidatesService: CandidatesService,
    private interviewsService: InterviewsService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private officeService: OfficeService,
    private tabsService: TabsService,
    private timeService: TimeService,
    private assessmentService: AssessmentService
  ) { }

  public ngOnInit(): void {
    this.setupActiveTab();

    this.employeeForm = new FormControl('');
    this.mainForm = new FormGroup({});

    this.candidateDetails$ = this.candidateDetails.asObservable();
    this.candidateDetails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((candidateDetails) => {
        this.isShowCandidateDetails = !!candidateDetails;
        this.mainForm.markAsUntouched();
        touchValidateDeep(this.mainForm, 'untouched');
      });

    this.validationError = this.mainForm.statusChanges
      .pipe(
        map(status => this.mainForm.touched && status === 'INVALID')
      );

    this.subscribeToEvents();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setActiveCandidateIndex(index: number): void {
    this.activeCandidateIndex = index;
  }

  public onSelectTab(key: string): void {
    this.employeeForm.setValue('');
    this.searchField = '';
    this.candidatesService.triggerClearFilters();
    this.activeCandidateIndex = START_INDEX;
    this.activeTab = key;
    this.tabsService.setTab(key);
    this.router.navigate([`/assessment/${key}`], { replaceUrl: true });
  }

  public onPlan(properties: IPlanned): void {
    if (!properties) {
      this.mainForm.markAsTouched();
      touchValidateDeep(this.mainForm, 'touched');

      return;
    }

    this.savePlannedInterview(properties);
  }

  public onPlanWithoutInterview({ candidateId, reviewDate, name }: IPlannedWithoutInterview): void {
    this.candidatesService.savePlannedReviewDate(candidateId, reviewDate)
      .pipe(
        switchMap(() => this.getCandidates(START_INDEX)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (allCandidatesInfo) => {
          if (allCandidatesInfo) {
            this.setupAllCandidates(allCandidatesInfo, candidateId);
          } else {
            this.allCandidates = null;
          }

          this.toastNotification.next({ name, message: PLAN_MESSAGE });
          this.activeCandidateIndex = START_INDEX;
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public onFadeOut(): void {
    this.isToastNotification = !this.isToastNotification;
  }

  public filterByDate(date: string): void {
    const queryParams = this.getQueryParams();
    const updatedQueryParams = { ...queryParams, date };

    this.activeDate = date;
    this.activeCandidateIndex = START_INDEX;
    this.employeeForm.setValue('');

    this.setupCandidateDetails(updatedQueryParams);
  }

  public setSearchField(value: string): void {
    this.searchField = value;
  }

  public onShowCandidateDetails(id: string): void {
    if (id) {
      of(null)
        .pipe(
          switchMap(() => this.candidatesService.getCandidateDetails<ISalaryReview>(id)),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (candidate) => {
            const officeTimezoneCandidate = this.getOfficeTimezoneCandidate(candidate);
            const queryParams = this.getQueryParams();

            this.updateUrlParams(queryParams, candidate.id);
            this.candidateDetails.next(officeTimezoneCandidate);
            this.changeDetectorRef.markForCheck();
          }
        );
    } else {
      this.candidateDetails.next(null);
    }
  }

  public onFilterCandidates(filters: Params): void {
    const allFilters = this.activeTab === AssessmentTabs.ready
      ? { ...filters, date: this.activeDate }
      : filters;

    this.setupCandidateDetails(allFilters);
  }

  public onUpdateCandidates(candidateId?: string): void {
    if (!candidateId) {
      this.activeCandidateIndex = 0;
    }

    const index = candidateId ? null : 0;

    this.setupCandidates(index, candidateId);
  }

  public onFormCreated(form: FormGroup): void {
    this.mainForm.setControl('child', form);
  }

  public onAddToConsideration(): void {
    if (this.mainForm.valid) {
      const candidate = this.sidebarCandidates[this.activeCandidateIndex];
      this.tabsService.addToConsideration(candidate.id)
        .pipe(
          tap(() => {
            this.addedReviewDate = candidate.reviewDate;
            this.employeeName = candidate.employee.name;
            this.isToastNotification = true;
            this.changeDetectorRef.markForCheck();
          }),
          switchMap(() =>  this.getCandidates(START_INDEX)),
          takeUntil(this.destroy$)
        )
        .subscribe((allCandidatesInfo) => {
          if (allCandidatesInfo) {
            this.setupAllCandidates(allCandidatesInfo);
          } else {
            this.allCandidates = null;
          }

          this.activeCandidateIndex = START_INDEX;
          this.changeDetectorRef.markForCheck();
        }
        );
    } else {
      this.mainForm.markAsTouched();
      touchValidateDeep(this.mainForm, 'touched');
    }
  }

  private setupActiveTab(): void {
    const [path, id] = this.getPathAndParams();

    this.activeTab = path;
    this.tabs = this.tabs.map(tab => ({ ...tab, active: tab.key === this.activeTab }));
    this.setupCandidates(0, id);
  }

  private getPathAndParams(): string[] {
    const childRoute = this.route.snapshot.firstChild;

    if (!childRoute) {
      return ['approved'];
    }

    return [childRoute.routeConfig.path, childRoute.firstChild && childRoute.firstChild.paramMap.get('id')];
  }

  private getQueryParams(): Params {
    return this.route.snapshot.queryParams;
  }

  private setupCandidateDetails(filters: Params): void {
    this.sidebarCandidates = this.getFilteredCandidates(filters);

    const id = this.sidebarCandidates.length
      ? this.sidebarCandidates[START_INDEX].id
      : null;

    this.updateUrlParams(filters, id);
    this.onShowCandidateDetails(id);
  }

  private updateUrlParams(queryParams: Params, id: string = ''): void {
    this.router.navigate([`/assessment/${this.activeTab}/${id}`], { queryParams, replaceUrl: true });
  }

  private getFilteredCandidates(filters: Params, candidates?: ICandidate[]): ICandidate[] {
    const allCandidates = candidates || this.allCandidates;

    return this.sidebarCandidates = allCandidates.filter((candidate) => {
      return Object.keys(filters).every((filter) => {
        switch (filter) {
          case 'technology':
            return candidate.technologies.includes(filters[filter]);
          case 'interviewer':
            return candidate.interviewers.includes(filters[filter]);
          case 'date':
            return this.hasCandidateCurrentDate(candidate, filters[filter]);
          default:
            return filter && filters[filter] === candidate.employee[filter];
        }
      });
    });
  }

  private hasCandidateCurrentDate(candidate: ICandidate, dateFilter: string): boolean {
    const selectedDay = new Date(dateFilter).getDate();
    const selectedMonth = new Date(dateFilter).getMonth();
    const candidateDay = new Date(candidate.reviewDate).getDate();
    const candidateMonth = new Date(candidate.reviewDate).getMonth();

    return selectedDay === candidateDay && selectedMonth === candidateMonth;
  }

  private subscribeToEvents(): void {
    this.tabsService.getTab()
      .pipe(
        tap((tab) => {
          this.activeTab = tab;
          this.isShowLoader = true;
          this.changeDetectorRef.markForCheck();
        }),
        switchMap(() =>  this.getCandidates(START_INDEX)),
        takeUntil(this.destroy$)
      )
      .subscribe((allCandidatesInfo) => {
        if (allCandidatesInfo) {
          this.setupAllCandidates(allCandidatesInfo);
        } else {
          this.allCandidates = null;
        }

        this.activeCandidateIndex = START_INDEX;
        this.changeDetectorRef.markForCheck();
      }
      );

    this.toastNotification.asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ message, name }) => {
          this.setupNotification(message, name);
          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private savePlannedInterview(properties: IPlanned): void {
    const { assessmentId, plannedAssessment, planningAssessmentsLength, candidateId, name } = properties;

    this.plannedAssessmentId = assessmentId;

    this.assessmentService.savePlannedInterview(assessmentId, plannedAssessment)
      .pipe(
        switchMap(() => {
          const currentCandidateId = planningAssessmentsLength === 1
            ? this.getAdditionalAssessmentCandidateId(candidateId)
            : this.getMainAssessmentCandidateId(candidateId);

          return this.getCandidates(START_INDEX, currentCandidateId);
        }),
        finalize(() => {
          this.isShowAssessmentLoading = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (allCandidatesInfo) => {
          if (allCandidatesInfo) {
            this.setupAllCandidates(allCandidatesInfo, allCandidatesInfo.review.id);
          } else {
            this.allCandidates = null;
          }

          this.toastNotification.next({ name, message: INTERVIEW_PLAN_MESSAGE });

          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private getMainAssessmentCandidateId(candidateId: string): string {
    const currentCandidateId = this.sidebarCandidates[this.activeCandidateIndex].id;

    return currentCandidateId === candidateId
      ? candidateId
      : currentCandidateId;
  }

  private getAdditionalAssessmentCandidateId(candidateId: string): string {
    const currentCandidateId = this.sidebarCandidates[this.activeCandidateIndex].id;

    return currentCandidateId === candidateId
      ? null
      : currentCandidateId;
  }

  private setupNotification(message: string, name: string): void {
    this.employeeName = name;
    this.planMessage = message;
    this.isToastNotification = true;
  }

  private setupCandidates(index: number, candidateId?: string): void {
    this.getCandidates(index, candidateId)
      .subscribe(
        (allCandidatesInfo) => {
          if (allCandidatesInfo) {
            this.setupAllCandidates(allCandidatesInfo, candidateId);
          } else {
            this.allCandidates = null;
          }

          this.changeDetectorRef.markForCheck();
        }
      );
  }

  private getCandidates(index: number, candidateId?: string): Observable<ICandidateDetails> {
    return this.getTabsCandidates()
      .pipe(
        tap(({ currencies= [] }) => {
          this.currencies = currencies.map(currency => ({ name: CURRENCIES[currency], id: currency }));
        }),
        switchMap((allCandidates) => {
          const { reviews } = allCandidates;
          const candidates = this.getCheckedCandidates(reviews);

          return candidates.length
            ? this.getCandidateDetails(candidateId ? candidateId : candidates[index].id, allCandidates, candidates)
            : of(null);
        }),
        finalize(() => {
          this.isShowLoader = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      );
  }

  private getCandidateDetails(candidateId: string, allCandidates: IReviewsResponse, sidebarCandidates: ICandidate[])
    : Observable<ICandidateDetails> {
    const { reviews, filtersSource } = allCandidates;

    return forkJoin([
      of({ reviews, sidebarCandidates, filtersSource }),
      this.candidatesService.getCandidateDetails<ISalaryReview>(candidateId)
    ])
      .pipe(
        map(([checkedCandidates, review]) => ({ review, allCandidates: checkedCandidates }))
      );
  }

  private setupAllCandidates(allCandidatesInfo: ICandidateDetails, candidateId?: string): void {
    const {
      allCandidates: { reviews, sidebarCandidates, filtersSource: { technologies, resourceManagers, interviewers, reviewDates } },
      review: candidate
    } = allCandidatesInfo;
    const officeTimezoneCandidate = this.getOfficeTimezoneCandidate(candidate);

    let params = this.getQueryParams();

    this.candidateDetails.next(officeTimezoneCandidate);
    this.allCandidates = reviews;
    this.technologies = technologies;
    this.resourceManagers = resourceManagers;
    this.interviewers = interviewers;

    if (this.activeTab === 'ready') {
      this.reviewDates = reviewDates;
      this.activeDate = this.getActiveDate(candidate);

      params = { ...params, date: this.activeDate };

      this.sidebarCandidates = this.getFilteredCandidates(params, sidebarCandidates);
    } else {
      this.sidebarCandidates = sidebarCandidates;
    }

    if (candidateId) {
      this.activeCandidateIndex = this.sidebarCandidates.findIndex(currentCandidate => currentCandidate.id === candidateId);
    }

    this.updateUrlParams(params, candidate.id);
  }

  private getActiveDate({ reviewDate }: ISalaryReview): string {
    const currentReviewDate = new Date(reviewDate);

    const day = currentReviewDate.getDate();
    const year = currentReviewDate.getFullYear();
    const month = currentReviewDate.getMonth() + 1;

    const doubleDigitDayValue = this.getDoubleDigitValue(day.toString());
    const doubleDigitMonthValue = this.getDoubleDigitValue(month.toString());

    const mappedDate = `${year}-${doubleDigitMonthValue}-${doubleDigitDayValue}`;

    return this.reviewDates.find(date => date.includes(mappedDate));
  }

  private getDoubleDigitValue(value: string): string {
    return +value < 10
      ? `0${value}`
      : value;
  }

  private getOfficeTimezoneCandidate(candidate: ISalaryReview): ISalaryReview {
    const mappedAssessments = candidate.assessments.length
      ? this.getAssessments(candidate)
      : [];

    return {
      ...candidate,
      assessments: mappedAssessments,
    };

  }

  private getAssessments(candidate: ISalaryReview): IAssessment[] {
    return candidate.assessments.map((assessment) => {
      const interviewDate = assessment.interviewDateTime;

      return interviewDate
        ? { ...assessment, interviewDateTime: this.timeService.getTimezoneDate(interviewDate) }
        : assessment;
    });
  }

  private getTabsCandidates(): Observable<IReviewsResponse> {
    switch (this.activeTab) {
      case AssessmentTabs.approved:
        return this.candidatesService.getCandidates(REVIEW_STATES.APPROVED);
      case AssessmentTabs.interview:
        return this.candidatesService.getInterviewedCandidates<IReviewsResponse>();
      case AssessmentTabs.preparation:
        return this.candidatesService.getCandidates(REVIEW_STATES.PREPARATION);
      case AssessmentTabs.ready:
        return this.candidatesService.getCandidates(REVIEW_STATES.READY);
      default:
        return this.candidatesService.getCandidates(REVIEW_STATES.APPROVED);
    }
  }

  private getCheckedCandidates(candidates: ICandidate[]): ICandidate[] {
    const params = this.getQueryParams();

    return Object.keys(params).length
      ? this.getFilteredCandidates(params, candidates)
      : candidates;
  }
}
