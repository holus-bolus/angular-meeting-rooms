import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FeedbackService } from '@services/feedback.service';
import { BehaviorSubject, forkJoin, Subject } from 'rxjs';
import { EmployeeIdService } from '@services/employee-id.service';
import { IUniversalFeedbackData } from '@interfaces/feedback.interface';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { IEmployeeTeammates } from '@interfaces/employee';
import { ICommonOption } from '@interfaces/filter';
import { IProject } from '@interfaces/userInfo.interface';
import { uniqBy } from 'lodash';
import { FeedbackOnProjectGenerateComponent } from './feedback-on-project-generate/feedback-on-project-generate.component';

import noFeedbacksSvg from '!!raw-loader!@assets/images/no-feedbacks.svg';
import noDataSvg from '!!raw-loader!@assets/images/no-data.svg';

@Component({
  selector: 'andteam-feedback-on-project-view',
  templateUrl: './feedback-on-project-view.component.html',
  styleUrls: ['./feedback-on-project-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackOnProjectViewComponent implements OnInit, OnDestroy {
  public universalFeedbacks: IUniversalFeedbackData[];
  public universalFeedbacksFiltered: IUniversalFeedbackData[];
  public userTeammates: IEmployeeTeammates[];
  public hasData = true;
  public noDataMessageSecond = 'Feedback yourself or wait for others feedbacks';
  public canAskFeedbackExternal: boolean;
  public destroy$ = new Subject();
  public isShowLoader = false;
  public searchForTeammates = true;
  public projectControl = new FormControl('');
  public availableProjects$ = new BehaviorSubject<ICommonOption[]>(null);
  public filteringProjects$ = new BehaviorSubject<IProject[]>(null);

  readonly noFeedbacksSvg = noFeedbacksSvg;
  readonly noDataSvg = noDataSvg;

  private userId: string;

  constructor(
    private feedbackService: FeedbackService,
    private employeeIdService: EmployeeIdService,
    private modalWindow: MatDialog,
    private cd: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.userId = this.employeeIdService.getEmployeeId();
    this.isShowLoader = true;
    forkJoin([
      this.feedbackService.getProjectFeedbacksByUserId$(),
      this.feedbackService.getFeedbacksProjects$(this.userId, 'false'),
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe(([universalFeedbacks, projects]: [IUniversalFeedbackData[], ICommonOption[]]) => {
      const availableProjects = projects.filter(p => p.name !== 'No common projects');
      this.availableProjects$.next(availableProjects);
      const filteredFeedbacks = universalFeedbacks
        .filter(f => f.createDate)
        .map(f => ({
          ...f,
          feedbackAverageMark: this.calculateAverageMark(f),
          feedbackDate: f.createDate,
        }));
      this.universalFeedbacks = filteredFeedbacks
        .sort((f1, f2) => new Date(f2.feedbackDate).getTime() - new Date(f1.feedbackDate).getTime());
      this.filteringProjects$.next(uniqBy(this.universalFeedbacks.map(f => f.project), 'id'));
      this.isShowLoader = false;
      this.universalFeedbacksFiltered = this.universalFeedbacks;
      if (this.universalFeedbacks.length === 0) {
        this.hasData = false;
      }
      this.cd.detectChanges();
    });
    this.projectControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: ICommonOption) => {
        if (value.id === null) {
          this.universalFeedbacksFiltered = this.universalFeedbacks;
        } else { 
          this.universalFeedbacksFiltered = this.universalFeedbacks.filter(uf => uf.projectId === value.id);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onOpenCreateForm(): void {
    this.modalWindow.open(FeedbackOnProjectGenerateComponent, {
      width: '525px',
      height: '352px',
      data: {
        availableProjects: this.availableProjects$.value,
        userId: this.userId,
      },
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
    ];

    return questions.reduce((acc, q1) => {
      acc += q1;

      return acc;
    }) / questions.filter(q2 => q2 > 0).length;
  }
}
