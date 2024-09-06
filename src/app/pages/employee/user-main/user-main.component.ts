import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject, throwError } from 'rxjs';
import { ITechnologies, IUserInfo } from '@interfaces/userInfo.interface';
import { EmployeeService } from '@services/employee.service';
import { catchError, map, switchMap, switchMapTo, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute, Data } from '@angular/router';
import { UserService } from '@services/user.service';
import { IUserDetails } from '@interfaces/authentication';
import { RISKS_OF_LEAVING } from '@pages/employee/one-to-one/one-to-one-const';
import { MatDialog } from '@angular/material/dialog';
import { SendCardModalComponent } from '@pages/employee/user-main/send-card-modal/send-card-modal.component';
import { SEND_CARD_MODAL_HEIGHT, SEND_CARD_MODAL_WIDTH } from '@pages/employee/user-main/user-main.const';
import { SurveyModalComponent } from '@pages/employee/user-main/survey-modal/survey-modal.component';
import { SurveyResultsModalComponent } from '@pages/employee/user-main/survey-results-modal/survey-results-modal.component';
import {
  SURVEY_RESULTS_WINDOW_WIDTH,
  SURVEY_WINDOW_WIDTH
} from '@pages/employee/user-main/survey-modal/survey-const';
import { IQuestion, IQuestionnaireResults, ISurveyButton } from '@interfaces/survey';
import { ICelebrationsButtons, ICelebrationsButtonsRequest } from '@interfaces/send-card';
import { ExpertActivitiesService } from '@services/expert-activities.service';

@Component({
  selector: 'andteam-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMainComponent implements OnInit, OnDestroy {
  public userData$: Observable<IUserInfo>;
  public celebrationsButtons$: Observable<ICelebrationsButtonsRequest[]>;
  public userId: string;
  public currentUserId$: Observable<string>;
  public eventCardName: string;
  public isSalaryReviewTab$: BehaviorSubject<boolean>;
  public isToastNotification$ = new BehaviorSubject<boolean>(false);
  public isShowLoader$ = new BehaviorSubject<boolean>(false);
  public labelRiskOfLeaving = RISKS_OF_LEAVING;
  public buttonSurvey$ = new BehaviorSubject<ISurveyButton[]>(null);
  public surveyQuestionsData: IQuestion[];
  public surveyId: string;

  private destroy$ = new Subject();

  constructor(
    private modalWindow: MatDialog,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private userService: UserService,
    private expertActivitiesService: ExpertActivitiesService
  ) { }

  public ngOnInit(): void {
    this.isShowLoader$.next(true);
    this.route.parent.paramMap
      .pipe(
        switchMap((value: Data) => this.employeeService.getUserInfo$(value.params.id)),
        tap((user: IUserInfo) => {
          this.userId = user.externalId;
        }),
        map((value: IUserInfo) => ({
          ...value,
          ...value.technologies.sort((a: ITechnologies, b: ITechnologies) => Number(b.main) - Number(a.main))
        })),
        tap(userData => this.userData$ = of(userData)),
        switchMap(() => this.getUserInfoAndCelebrationsButtons(this.userId)),
        tap((data: { externalId: string, celebrationsButtons: ICelebrationsButtonsRequest[] }) => {
          this.currentUserId$ = of(data.externalId);
          this.celebrationsButtons$ = of(data.celebrationsButtons);
        }),
        takeUntil(this.destroy$),
      ).subscribe(
        () => {
          this.expertActivitiesService.updateActivities(this.userId);
          this.isShowLoader$.next(false);
        },
        () => this.isShowLoader$.next(false)
      );

    this.isSalaryReviewTab$ = this.employeeService.isShowSalaryTab$;
  }

  public openQuestionnaireDialogWindow(): void {
    this.isShowLoader$.next(true);
    this.employeeService.getSurveyQuestions(this.surveyId).pipe(
      takeUntil(this.destroy$),
      map((value) => {
        this.surveyQuestionsData = value;
      })
    ).subscribe(() => {
      this.isShowLoader$.next(false);
      const addDialogRef = this.modalWindow.open(SurveyModalComponent, {
        width: SURVEY_WINDOW_WIDTH,
        disableClose: true,
        data: {
          questions: this.surveyQuestionsData,
          surveyId: this.surveyId
        }
      });

      addDialogRef.componentInstance.afterSubmit.pipe(
        switchMapTo(this.route.data.pipe(
          switchMap(value => this.employeeService.getSurveyButton(value.employeeCard.employee.externalId)),
          takeUntil(this.destroy$),
        ))
      )
        .subscribe((survey: ISurveyButton[]) => {
          this.buttonSurvey$.next(survey);
          survey.map((item: ISurveyButton) => {
            this.surveyId = item.id;
          });
        });
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openSurveyResultsDialogWindow(): void {
    this.isShowLoader$.next(true);
    this.employeeService.getSurveyResults(this.surveyId)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((results: IQuestionnaireResults) => {
        this.isShowLoader$.next(false);
        this.modalWindow.open(SurveyResultsModalComponent, {
          width: SURVEY_RESULTS_WINDOW_WIDTH,
          data: results
        });
      });
  }

  public openEventSendWindow(eventData: ICelebrationsButtons): void {
    this.isShowLoader$.next(true);
    this.employeeService.getCelebrationsCards$(eventData.celebrationId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => {
          return throwError(error);
        })
      )
      .subscribe((value: string[]) => {
        this.isShowLoader$.next(false);
        const addDialogRef = this.modalWindow.open(SendCardModalComponent, {
          width: SEND_CARD_MODAL_WIDTH,
          height: SEND_CARD_MODAL_HEIGHT,
          data: {
            cards: value,
            shortName: eventData.shortName,
            defaultText: eventData.defaultText,
            userId: [this.userId],
            celebrationId: eventData.celebrationId
          }
        });

        addDialogRef.componentInstance.afterPostCardSend
          .subscribe((data: string) => {
            if (data) {
              this.eventCardName = data;
              this.isToastNotification$.next(true);
            }
          });
      });
  }
  public onFadeOut(): void {
    this.isToastNotification$.next(false);
  }

  private getUserInfoAndCelebrationsButtons(
    employeeId: string
  ): Observable<{ externalId: string, celebrationsButtons: ICelebrationsButtonsRequest[] }> {
    return forkJoin([
      this.userService.getUserInfo$().pipe(
        map((value: IUserDetails) => value.externalId)
      ),
      this.employeeService.getCelebrationsButtons$(employeeId)
    ]).pipe(map(([externalId, celebrationsButtons]: [string, ICelebrationsButtonsRequest[]]) => ({ externalId, celebrationsButtons })));
  }
}
