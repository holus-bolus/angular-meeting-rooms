import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPLOYEE_ROUTE_NAME, EMPLOYEE_SALARY_REVIEW, LEAVE_FEEDBACK_ROUTE_NAME, ONE_TO_ONE } from '@constants/routes-name';
import { IManager, IUserInfo } from '@interfaces/userInfo.interface';
import { IBreadcrumb } from '@interfaces/breadcrumb';
import { ILabel } from '@interfaces/label';
import { ICelebrationsButtons, ICelebrationsButtonsRequest } from '@interfaces/send-card';
import { IQuestionnaireResults, ISurveyButton } from '@interfaces/survey';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { IActivities } from '@interfaces/expert-activities.interface';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

import noAvatarSvg from '!!raw-loader!@assets/images/no-avatar.svg';
import feedbackIconSvg from '!!raw-loader!@assets/images/feedback-icon.svg';
import dateSvg from '!!raw-loader!@assets/images/date.svg';
import vacationSvg from '!!raw-loader!@assets/images/vacation.svg';

@Component({
  selector: 'andteam-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnDestroy{
  public get breadcrumbsList(): IBreadcrumb[] {
    return this.userInfo.resourceManagerHierarchy
      .map((manager: IManager) => ({
        link: [EMPLOYEE_ROUTE_NAME, manager.id],
        name: manager.name,
        isWork: manager.isWork,
      }));
  }
  @Input() userInfo: IUserInfo;
  @Input() currentUserId: string;
  @Input() isSalaryReviewTab: boolean;
  @Input() isLabelDisabled: boolean;
  @Input() riskOfLeaving: ILabel;
  @Input() celebrationsButtons: ICelebrationsButtonsRequest[];
  @Input() surveyButton: ISurveyButton[];
  @Input() surveyQuestions;
  @Input() questionnaireResults: IQuestionnaireResults;
  @Output() buttonId = new EventEmitter<ICelebrationsButtons>();
  @Output() questionnaire = new EventEmitter<void>();
  @Output() surveyResults = new EventEmitter<void>();

  public maxItemsVisible = 1;
  public isActivitiesUpdate$ = new BehaviorSubject<boolean>(false);

  readonly defaultAvatar = noAvatarSvg;
  readonly dateSvg = dateSvg;
  readonly feedbackIcon = feedbackIconSvg;
  readonly vacationSvg = vacationSvg;

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private expertActivitiesService: ExpertActivitiesService,
  ) { }

  public goSalaryReviewTab(): void {
    this.router.navigate([`../${EMPLOYEE_SALARY_REVIEW}`], { relativeTo: this.activatedRoute });
  }

  public goToFeedbackPage(): void {
    this.router.navigate([`../${LEAVE_FEEDBACK_ROUTE_NAME}`], { relativeTo: this.activatedRoute });
  }

  public goToOneToOnePage(): void {
    this.router.navigate([`../${ONE_TO_ONE}`], { relativeTo: this.activatedRoute });
  }

  public openSurveyWindow(condition: boolean): void {
    condition
      ? this.surveyResults.emit()
      : this.questionnaire.emit();
  }

  public openEventSendWindow({ celebrationId, shortName, defaultText }: ICelebrationsButtons): void {
    this.buttonId.emit({ celebrationId, shortName, defaultText });
  }

  public updateExpertActivities(activities: IActivities[]): void {
    const activitiesIds = activities.filter(({ isActive }) => isActive).map(({ id }) => id);

    this.expertActivitiesService.updateExpertActivities(activitiesIds, this.userInfo.externalId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.userInfo.expertActivities = activities;
        this.isActivitiesUpdate$.next(true);
      });
  }

  public onFadeOut(): void {
    this.isActivitiesUpdate$.next(false);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
