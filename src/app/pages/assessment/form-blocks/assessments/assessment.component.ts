import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnDestroy,
  OnInit, Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ICommonOption } from '@interfaces/filter';
import { Observable, Subject } from 'rxjs';
import { ASSESSMENT_PAGES } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';
import { IAssessment } from '@interfaces/candidate';
import { MatrixService } from '@services/assessments/matrix.service';
import { InterviewsService } from '@services/assessments/interviews.service';
import { first, map, takeUntil } from 'rxjs/operators';

import checkedIconSvg from '!!raw-loader!../../icons/checkedIcon.svg';
import dateIconSvg from '!!raw-loader!../../icons/date-icon.svg';
import warningSvg from '!!raw-loader!../../icons/warning.svg';

@Component({
  selector: 'andteam-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssessmentComponent implements OnInit, OnDestroy {
  @Input() public assessment: IAssessment;
  @Input() public type: ASSESSMENT_PAGES;
  @Input() public reviewId: string;
  @Input() public reviewDate: string;
  @Input() public assessmentIndex: number;
  @Input() public candidateId: string;
  @Input() public minReviewDate: Date;

  @Output() public formCreated = new EventEmitter<FormControl>();
  @Output() public updateCandidates = new EventEmitter<string>();
  @Output() public changeInterviewDate = new EventEmitter<string>();

  public interviewerFeedback: FormControl;

  public interviewers: ICommonOption[];
  public isAssessment = true;
  public isPreparationPage: boolean;
  public isInterviewPage: boolean;
  public isSent: boolean;
  public isChangingInterviewer: boolean;
  public interviewerFeedbackError: Observable<boolean>;

  public destroy$ = new Subject();

  readonly checkedIcon = checkedIconSvg;
  readonly dateIcon = dateIconSvg;
  readonly warningIcon = warningSvg;

  constructor(
    private formBuilder: FormBuilder,
    private matrixService: MatrixService,
    private interviewsService: InterviewsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.isPreparationPage = this.type === 'preparation';
    this.isInterviewPage = this.type === 'interview';

    this.isSent = this.assessment.isInterviewerMatrixSend;

    const interviewerFeedback = this.assessment.interviewerFeedback || '';
    this.interviewerFeedback = new FormControl(interviewerFeedback, Validators.required);
    this.interviewerFeedbackError = this.interviewerFeedback.statusChanges
      .pipe(
        map(status => status === 'INVALID' && this.interviewerFeedback.touched),
        takeUntil(this.destroy$)
      );

    this.formCreated.emit(this.interviewerFeedback);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSendMatrix(): void {
    this.isSent = true;

    this.matrixService.sendMatrixToInterviewer(this.assessment.id)
      .pipe(
        first()
      )
      .subscribe({
        error: () => {
          this.isSent = false;
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  public onChangeInterviewDate(interviewDate: string): void {
    this.changeInterviewDate.emit(interviewDate);
  }

  public onChangingInterviewer(): void {
    this.isChangingInterviewer = true;
  }

  public onUpdateCandidates(candidateId: string): void {
    this.isChangingInterviewer = false;
    this.updateCandidates.emit(candidateId);
  }
}
