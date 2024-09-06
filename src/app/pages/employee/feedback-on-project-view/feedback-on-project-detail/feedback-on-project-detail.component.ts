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
import { COLLAPSED_FEEDBACK_MAX_HEIGHT, HIGH_RATING_MARK } from './../../../feedback/feedback-const';

import clientSvg from '!!raw-loader!@assets/images/client.svg';


@Component({
  selector: 'andteam-feedback-on-project-detail',
  templateUrl: './feedback-on-project-detail.component.html',
  styleUrls: ['./feedback-on-project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackOnProjectDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() userFeedback: IUniversalFeedbackData;
  @Input() isLastFeedback: boolean;
  @ViewChild('comment') public comment: ElementRef;
  @ViewChild('improve') public improve: ElementRef;

  public clientSvg = clientSvg;
  public scaleData: string[][];
  public position: string;

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

  private isNeedToCollapse(block: ElementRef): boolean {
    return block?.nativeElement.offsetHeight > COLLAPSED_FEEDBACK_MAX_HEIGHT;
  }
}
