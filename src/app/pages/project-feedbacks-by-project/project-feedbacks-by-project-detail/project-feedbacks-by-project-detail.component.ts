import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IUniversalFeedbackData } from '@interfaces/feedback.interface';
import { Subject } from 'rxjs';
import { COLLAPSED_FEEDBACK_MAX_HEIGHT, HIGH_RATING_MARK } from '@pages/feedback/feedback-const';
import { IProject } from '@interfaces/userInfo.interface';
import { FeedbackService } from '@services/feedback.service';
import { MatRadioChange } from '@angular/material/radio';

import infoSvg from '!!raw-loader!@assets/images/info.svg';

@Component({
  selector: 'andteam-project-feedbacks-by-project-detail',
  templateUrl: './project-feedbacks-by-project-detail.component.html',
  styleUrls: ['./project-feedbacks-by-project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFeedbacksByProjectDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() userFeedback: IUniversalFeedbackData;
  @Input() project: IProject;
  @Input() isLastFeedback: boolean;
  @Input() hasAccessToExtendedFilter: boolean;
  @ViewChild('comment') public comment: ElementRef;
  @ViewChild('improve') public improve: ElementRef;

  public infoIcon = infoSvg;
  public scaleData: string[][];

  public isCommentCollapsed = false;
  public isImproveCollapsed = false;
  public isCommentLong = false;
  public isImproveLong = false;

  private destroy$ = new Subject();

  public get highRating(): boolean {
    return this.userFeedback.feedbackAverageMark >= HIGH_RATING_MARK;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private feedbackService: FeedbackService,
  ) { }

  public ngOnInit(): void {
    this.userFeedback = this.userFeedback as IUniversalFeedbackData;
    const questions = [
      ['question1', this.userFeedback.question1],
      ['question2', this.userFeedback.question2],
      ['question3', this.userFeedback.question3],
      ['question4', this.userFeedback.question4],
      ['question5', this.userFeedback.question5],
      ['question6', this.userFeedback.question6],
    ];
    this.scaleData = questions.filter(q => q[1] > 0).map(q => [q[0].toString(), q[1].toString()]);
    this.userFeedback.feedbackAverageMark = questions.reduce((acc, q) => {
      acc += Number(q[1]);

      return acc;
    },                                                       0) / questions.length;
  }

  public ngAfterViewInit(): void {
    this.isCommentLong = this.isNeedToCollapse(this.comment);
    this.isCommentCollapsed = this.isCommentLong;

    this.isImproveLong = this.isNeedToCollapse(this.improve);
    this.isImproveCollapsed = this.isImproveLong;

    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public commentToggle(): void {
    this.isCommentCollapsed = !this.isCommentCollapsed;
  }

  public improveToggle(): void {
    this.isImproveCollapsed = !this.isImproveCollapsed;
  }

  public onRadioButtonChange($event: MatRadioChange): void {
    const feedbackValue = {
      feedbackId: this.userFeedback.id,
      value: $event.value,
    };

    this.feedbackService.setProjectFeedbackValue$(feedbackValue).subscribe();
  }

  private isNeedToCollapse(block: ElementRef): boolean {
    return block?.nativeElement.offsetHeight > COLLAPSED_FEEDBACK_MAX_HEIGHT;
  }
}
