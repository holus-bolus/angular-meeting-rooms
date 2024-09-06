import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { IEmployeeInterview, IInterviews } from '@interfaces/interview';
import { MATRIX_MESSAGES } from '@pages/employee/employee';
import { UserService } from '@services/user.service';
import { EmployeeIdService } from '@services/employee-id.service';
import { InterviewsService } from '@services/assessments/interviews.service';

const INTERVIEWER_MATRIX_TIPS = [
  'all rows of the column "Current level". Choose "-" in case you haven\'t asked about the topic,',
  'all rows of the column "Сomments" for the topics you\'ve asked about.'
];

@Component({
  selector: 'andteam-interviews-card',
  templateUrl: './interviews-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewsCardComponent implements OnInit, AfterViewInit {
  public hasNextPage = true;
  public isCurrent = true;
  public successCompleteMatrixMessage = MATRIX_MESSAGES.MAIN_EMPLOYEE_SUCCESS_MESSAGE;
  public interviewerSuccessTips = MATRIX_MESSAGES.ADDITIONAL_INTERVIEWER_SUCCESS_MESSAGE;
  public errorCompleteMatrixMessage = MATRIX_MESSAGES.MAIN_INTERVIEWER_ERROR_MESSAGE;
  public interviewerErrorTips = INTERVIEWER_MATRIX_TIPS;
  public totalItems: number;
  public interviews$: Observable<IEmployeeInterview[]>;
  public interviewsList: { [key: string]: IEmployeeInterview } = {};
  public isOpenMatrixModal = false;
  public isOpenFinishedInterviewModal = false;
  public isShowSpinner = true;
  public isInterviewer$: Observable<boolean>;

  private page$ = new BehaviorSubject(1);
  private employeeId: string;
  private pageSize$ = new Subject<number>();
  private active$ = new Subject<boolean>();
  private update$ = new Subject<void>();

  constructor(
     private route: ActivatedRoute,
     private interviewsService: InterviewsService,
     private userService: UserService,
     private employeeIdService: EmployeeIdService) { }

  public ngOnInit(): void {
    const { matrix } = this.route.snapshot.queryParams;
    const employeeId = this.employeeIdService.getEmployeeId();

    if (matrix) {
      this.isOpenMatrixModal = true;
    }

    this.employeeId = employeeId;

    this.interviews$ = combineLatest([this.active$, this.page$, this.update$])
      .pipe(
        switchMap(([isActive, page]) => this.interviewsService.getInterviews(this.employeeId, page, isActive)),
        tap(({ data, totalItems }: IInterviews) => {
          this.isShowSpinner = false;
          this.totalItems = totalItems;
          data.forEach((dataItem) => {
            this.interviewsList[dataItem.salaryReviewId] = dataItem;
          });
          this.hasNextPage = Boolean(totalItems - Object.keys(this.interviewsList).length);
        }),
        // tslint:disable-next-line:no-parameter-reassignment
        map(({ data }: IInterviews) => [...data] = Object.values(this.interviewsList)),
        finalize(() => this.isShowSpinner = false)
      );

    this.isInterviewer$ = this.userService.getUserInfo$()
      .pipe(
        map(({ externalId }) => externalId === this.employeeId)
      );
  }

  public ngAfterViewInit(): void {
    this.update$.next();
    this.active$.next(true);
    this.pageSize$.next(3);
  }

  public onShowMore(): void {
    this.page$.next(this.page$.value + 1);
  }

  public onToggleActive(isActive: boolean): void {
    this.isShowSpinner = true;
    this.isCurrent = isActive;
    this.active$.next(isActive);
    this.page$.next(1);
    this.interviewsList = {};
  }

  public onUpdate(): void {
    this.isOpenFinishedInterviewModal = true;
    this.page$.next(1);
    this.interviewsList = {};
    this.update$.next();
  }

  public onCloseMatrixModal(): void {
    this.isOpenMatrixModal = false;
    this.update$.next();
  }

  public onCloseFinishedInterviewModal(): void {
    this.isOpenFinishedInterviewModal = false;
  }
}
