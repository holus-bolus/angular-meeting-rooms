import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataToAnotherComponentService } from '@services/dataToAnotherComponent.service';
import { FeedbackService } from '@services/feedback.service';
import { BehaviorSubject, forkJoin, Subject } from 'rxjs';
import { EmployeeIdService } from '@services/employee-id.service';
import { IFeedbackData, IFeedbackEmployee, IUniversalFeedbackData } from '@interfaces/feedback.interface';
import { EMPLOYEE_ROUTE_NAME, LEAVE_FEEDBACK_ROUTE_NAME } from '@constants/routes-name';
import { IUserDetails } from '@interfaces/authentication';
import { UserService } from '@services/user.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AskForFeedbackComponent } from '@pages/employee/feedback-view/ask-for-feedback/ask-for-feedback.component';
import { FEEDBACK_ASK_MODAL_WIDTH } from '@pages/feedback/feedback-const';
import { EmployeeService } from '@services/employee.service';
import { IEmployeeTeammates } from '@interfaces/employee';
import { ICommonOption } from '@interfaces/filter';

import noFeedbacksSvg from '!!raw-loader!@assets/images/no-feedbacks.svg';
import noDataSvg from '!!raw-loader!@assets/images/no-data.svg';

@Component({
  selector: 'andteam-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackViewComponent implements OnInit, OnDestroy {
  public userFeedbacksData: IFeedbackData;
  public userTeammates: IEmployeeTeammates[];
  public hasData = true;
  public errorMessage = 'You can feedback yourself only once a month';
  public noDataMessage = 'Your feedback chart is empty';
  public noDataMessageSecond = 'Feedback yourself or wait for others feedbacks';
  public noDataMessageOther = 'Feedback chart is empty';
  public isCurrentUser: boolean;
  public canAskFeedbackExternal: boolean;
  public destroy$ = new Subject();
  public isShowLoader = false;
  public searchForTeammates = true;

  readonly noFeedbacksSvg = noFeedbacksSvg;
  readonly noDataSvg = noDataSvg;

  private userId: string;
  private availableProjects$ = new BehaviorSubject<ICommonOption[]>(null);

  constructor(
    private router: Router,
    private transmitData: DataToAnotherComponentService,
    private feedbackService: FeedbackService,
    private employeeService: EmployeeService,
    private employeeIdService: EmployeeIdService,
    private userService: UserService,
    private modalWindow: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.userId = this.employeeIdService.getEmployeeId();
    this.isShowLoader = true;
    forkJoin([
      this.feedbackService.getFeedbacksByUserId$(this.userId),
      this.feedbackService.getUniverslFeedbacksByUserId$(this.userId),
      this.userService.getUserInfo$(),
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe(([feedback, universalFeedbacks, user]: [IFeedbackData, IUniversalFeedbackData[], IUserDetails]) => {
      this.userFeedbacksData = feedback;

      const universalFeedbacksFiltered = universalFeedbacks
        .filter(f => f.createDate)
        .map(f => ({
          ...f,
          feedbackAverageMark: this.calculateAverageMark(f),
          feedbackDate: f.createDate,
        }));
      this.userFeedbacksData.feedbacks = [...this.userFeedbacksData.feedbacks, ...universalFeedbacksFiltered]
        .sort((f1, f2) => new Date(f2.feedbackDate).getTime() - new Date(f1.feedbackDate).getTime());
      this.canAskFeedbackExternal = feedback.canAskFeedbackExternal;
      this.isCurrentUser = user.externalId === this.userId;
      this.isShowLoader = false;

      if (this.userFeedbacksData.feedbacks.length === 0 && !this.userFeedbacksData.selfFeedbackScale) {
        this.hasData = false;
      }

      this.cd.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToFeedback(): void {
    this.transmitData.isChangeTitle = true;
    this.router.navigate([`${EMPLOYEE_ROUTE_NAME}/${this.userId}${LEAVE_FEEDBACK_ROUTE_NAME}`]);
  }

  public askFeedback(): void {
    this.isShowLoader = true;

    forkJoin([
      this.feedbackService.getFeedbacksProjects$(this.userId, 'true'),
      this.employeeService.getTeammatesAndEmployees(this.userId, '', this.searchForTeammates),
    ])
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe(([projects, teammates]: [ICommonOption[], IEmployeeTeammates[]]) => {
      this.availableProjects$.next(projects);

      teammates.map((teammate) => {
        teammate.photo = `data:image/jpeg;base64,${teammate.photo}`;
        teammate.position = '';

        if (!teammate.isEnabled) {
          teammate.disabled = true;
        }
      });

      this.userTeammates = teammates;
      this.isShowLoader = false;

      this.modalWindow.open(AskForFeedbackComponent, {
        disableClose: true,
        width: FEEDBACK_ASK_MODAL_WIDTH,
        data: {
          userId: this.userId,
          teammates: this.userTeammates,
          canAskFeedbackExternal: this.canAskFeedbackExternal,
          availableProjects: this.availableProjects$.value,
          disableClose: true,
        },
      });

      this.cd.markForCheck();
    });
  }

  public scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private calculateAverageMark(feedback: IUniversalFeedbackData): number {
    const questions = [
      feedback.question1,
      feedback.question2,
      feedback.question3,
      feedback.question4,
      feedback.question5,
      feedback.question6,
      feedback.question7,
    ].filter(q => q > 0);

    return questions.reduce((acc, q1) => { 
      acc += q1;
      return acc;
    }) / questions.length;
  }
}
