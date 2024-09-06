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

import { FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS, FEEDBACK_AVAILABILITY_TYPE_SECRET } from '@pages/feedback/feedback-const';
import { IFeedback, IUniversalFeedbackData } from '@interfaces/feedback.interface';
import { MatRadioChange } from '@angular/material/radio';
import { FeedbackService } from '@services/feedback.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { COLLAPSED_FEEDBACK_MAX_HEIGHT, FEEDBACK_TYPES, HIGH_RATING_MARK } from './../../../feedback/feedback-const';

import incognitoSvg from '!!raw-loader!@assets/images/incognito.svg';
import clientSvg from '!!raw-loader!@assets/images/client.svg';


@Component({
  selector: 'andteam-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public userFeedback: IFeedback | IUniversalFeedbackData;
  @Input() isLastFeedback: boolean;
  @ViewChild('comment') public comment: ElementRef;
  @ViewChild('improve') public improve: ElementRef;

  public incognitoSvg = incognitoSvg;
  public clientSvg = clientSvg;
  public scaleData: string[][];
  public employeePhoto: string;
  public feedbackType = {
    secret: FEEDBACK_AVAILABILITY_TYPE_SECRET.id,
    anonymous: FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS.id,
  };
  public feedbackTypes = FEEDBACK_TYPES;
  public feedbackTypeChip: string;

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
    this.feedbackTypeChip = this.feedbackTypes.find(ft => ft.value === this.userFeedback.positionType).name;
    if (this.userFeedback?.feedbackScale) {
      this.scaleData = Object.entries(this.userFeedback.feedbackScale);
    } else {
      this.userFeedback = this.userFeedback as IUniversalFeedbackData;
      const questions = [
        ['question1', this.userFeedback.question1],
        ['question2', this.userFeedback.question2],
        ['question3', this.userFeedback.question3],
        ['question4', this.userFeedback.question4],
        ['question5', this.userFeedback.question5],
        ['question6', this.userFeedback.question6],
        ['question7', this.userFeedback.question7],
      ];
      this.scaleData = questions.filter(q => q[1]>0).map(q => [q[0].toString(), q[1].toString()]);
    }


    if (this.userFeedback.employee && this.userFeedback.employee.photoUrl) {
      this.employeePhoto = this.userFeedback.employee.photoUrl;
    }
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

  public onRadioButtonChange($event: MatRadioChange, feedbackId: string, isExternal: boolean): void {
    const feedbackValue = {
      id: feedbackId,
      value: $event.value
    };

    isExternal
      ? this.feedbackService.setExternalFeedbackValue$(feedbackValue)
          .pipe(
            takeUntil(this.destroy$)
          ).subscribe(() => {})
      : this.feedbackService.setFeedbackValue$(feedbackValue)
          .pipe(
            takeUntil(this.destroy$)
          ).subscribe(() => {});
  }

  private isNeedToCollapse(block: ElementRef): boolean {
    return block?.nativeElement.offsetHeight > COLLAPSED_FEEDBACK_MAX_HEIGHT;
  }
}
