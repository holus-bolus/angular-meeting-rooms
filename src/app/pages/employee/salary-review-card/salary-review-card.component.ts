import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, takeUntil, switchMap, finalize } from 'rxjs/operators';
import { IEmployeesReview, IReviewsHistory } from '@interfaces/candidate';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '@services/review.service';
import { MATRIX_MESSAGES } from '../employee';
import { EmployeeIdService } from '@services/employee-id.service';
import { SALARY_COUNT_PER_PAGE } from './salary-review-card';

import dateSvg from '!!raw-loader!./icons/date.svg';
import reviewsSvg from '!!raw-loader!./icons/reviews.svg';
import vectorYellowSvg from '!!raw-loader!@assets/images/vector-yellow.svg';

@Component({
  selector: 'andteam-salary-review-card',
  templateUrl: './salary-review-card.component.html',
  styleUrls: ['./salary-review-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalaryReviewCardComponent implements OnInit, OnDestroy {
  public isOpenCancelModal = false;
  public isHaveNextPage = false;
  public successCompleteMatrixMessage = MATRIX_MESSAGES.MAIN_EMPLOYEE_SUCCESS_MESSAGE;
  public errorCompleteMatrixMessage = MATRIX_MESSAGES.MAIN_EMPLOYEE_ERROR_MESSAGE;
  public total: number;
  public isShowLoader = false;
  public salaryReviews$: Observable<IEmployeesReview[]>;
  public reviewHistory$: Observable<IReviewsHistory>;

  public readonly date = dateSvg;
  public readonly reviews = reviewsSvg;
  public readonly vectorIcon = vectorYellowSvg;

  private reviewsOffset = 0;
  private allSalaryReviews: IEmployeesReview[];
  private employeeId: string;
  private salaryReviewsSubject = new BehaviorSubject<IEmployeesReview[]>([]);
  private update$ = new Subject<void>();
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private reviewsService: ReviewService,
    private employeeIdService: EmployeeIdService,
    private cd: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    const { matrix } = this.route.snapshot.queryParams;
    const employeeId = this.employeeIdService.getEmployeeId();

    if (matrix) {
      this.isOpenCancelModal = true;
    }

    this.employeeId = employeeId;
    this.salaryReviews$ = this.salaryReviewsSubject.asObservable();

    this.isShowLoader = true;
    this.reviewHistory$ = this.reviewsService.getReviewHistory(employeeId)
      .pipe(
        tap(({ salaryReviews, total }) => {
          this.total = total;
          this.allSalaryReviews = salaryReviews;
          this.showMoreReviews();
        }),
        takeUntil(this.destroy$),
        finalize(() => this.isShowLoader = false)
      );

    this.subscribeToEvents();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showMoreReviews(): void {
    this.reviewsOffset = this.reviewsOffset + SALARY_COUNT_PER_PAGE;
    this.setReviewsOnPage(this.reviewsOffset, this.allSalaryReviews);
  }

  public onCloseModal(): void {
    this.isOpenCancelModal = false;
    this.update$.next();
  }

  private subscribeToEvents(): void {
    this.update$
      .pipe(
        tap(() => this.isShowLoader = true),
        switchMap(() => this.reviewsService.getReviewHistory(this.employeeId)),
        takeUntil(this.destroy$)
      )
      .subscribe(({ salaryReviews, total }) => {
        this.allSalaryReviews = salaryReviews;
        this.total = total;
        this.setReviewsOnPage(this.reviewsOffset, this.allSalaryReviews);
        this.isShowLoader = false;

        this.cd.markForCheck();
      });
  }

  private setReviewsOnPage(reviewsOffset: number, newSalaryReviews: IEmployeesReview[]): void {
    const reviewsNextPage = newSalaryReviews.slice(0, reviewsOffset);

    this.salaryReviewsSubject.next(reviewsNextPage);
    this.isHaveNextPage = reviewsOffset < newSalaryReviews.length;
  }
}
