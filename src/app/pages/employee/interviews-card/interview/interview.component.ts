import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  Output,
  EventEmitter, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { linkType } from '@constants/types/linkType.constants';
import { InterviewsService } from '@services/assessments/interviews.service';
import { IEmployeeInterview } from '@interfaces/interview';
import { Subject } from 'rxjs';
import { InterviewersFeedbackService } from '@services/interviewers-feedback.service';

import errorInformSvg from '!!raw-loader!@assets/images/error-inform.svg';
import skypeSvg from '!!raw-loader!../../icons/skype.svg';

const MAX_INTERVIEWER_FEEDBACK_LENGTH = 999;

@Component({
  selector: 'andteam-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewComponent implements OnInit, OnDestroy {
  @Input() interview: IEmployeeInterview;
  @Input() isInterviewer: boolean;

  @Output() interviewFinished = new EventEmitter<void>();

  public feedbackCharactersLimit = 999;
  public isErrorsShow = false;
  public interviewerFeedback: FormControl;

  readonly skypeIcon = skypeSvg;
  readonly error = errorInformSvg;
  readonly maxLengthErrorMessage = `0  Text exceeds ${MAX_INTERVIEWER_FEEDBACK_LENGTH} character limit`;
  readonly linkType = linkType;

  private destroy$ = new Subject<void>();

  constructor (
    private interviewsService: InterviewsService,
    private interviewersFeedbackService: InterviewersFeedbackService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.interviewerFeedback = new FormControl(this.interview.comment, [
      Validators.required,
      Validators.maxLength(MAX_INTERVIEWER_FEEDBACK_LENGTH)
    ]);

    this.interviewerFeedback.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.interviewerFeedback.markAsDirty();
        this.changeDetectorRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public finishInterview(): void {
    const isMatrixesDone = this.interview.assessments.every(assessment => assessment.matrix && assessment.matrix.isDone);

    if (!isMatrixesDone || this.interviewerFeedback.invalid) {
      this.isErrorsShow = true;
      this.interviewerFeedback.markAsTouched();

      return;
    }

    this.interviewsService.finishInterview(this.interview.salaryReviewId)
      .pipe(take(1))
      .subscribe(() => {
        this.interviewFinished.emit();
      });
  }

  public onSaveFeedback(feedback: string): void {
    if (this.interviewerFeedback.errors && this.interviewerFeedback.errors.maxlength) {
      return;
    }

    this.interviewersFeedbackService.saveFeedback(this.interview.salaryReviewId, feedback)
      .pipe(take(1))
      .subscribe(() => {
        this.interviewerFeedback.markAsPristine();
        this.changeDetectorRef.markForCheck();
      });
  }
}
