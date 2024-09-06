import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { IEmployeeCandidate } from '@interfaces/candidate';
import { ICancelEvent } from '@interfaces/assessment';
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '@constants/buttons';
import { TabsService } from '@services/assessments/tabs.service';
import { IRequestError } from '@interfaces/error';
import { TimeService } from '@services/portal/time.service';
import { COMPONENT_TYPES } from '@constants/types/componentTypes.constants';

import dateIconSvg from '!!raw-loader!./icons/date-icon.svg';

const MAX_CANCEL_LENGTH = 999;
const MAX_LENGTH_ERROR_MESSAGE = '0 Text exceeds 999 character limit';

@Component({
  selector: 'andteam-assessment-cancel',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelModalComponent implements OnInit, OnDestroy {
  public cancelForm: FormGroup;
  public isDisabled = true;
  public isAssessment = true;
  public datePlaceholder = 'dd.mm.yyyy';
  public commentPlaceholder = 'Put your comment';
  public maxLengthErrorMessage = MAX_LENGTH_ERROR_MESSAGE;
  public maxCancelLength = MAX_CANCEL_LENGTH;
  public componentType = COMPONENT_TYPES.ASSESSMENT;

  readonly buttonPrimary = BUTTON_PRIMARY;
  readonly buttonSecondary = BUTTON_SECONDARY;
  readonly dateIcon = dateIconSvg;

  @Input() employee: IEmployeeCandidate;
  @Input() candidateId: string;

  @Output() confirm = new EventEmitter<ICancelEvent>();
  @Output() cancel = new EventEmitter<void>();
  @Output() updateCandidates = new EventEmitter<void>();
  private destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder,
              private tabsService: TabsService,
              private changeDetectorRef: ChangeDetectorRef,
              private timeService: TimeService) {
  }

  public ngOnInit(): void {
    this.cancelForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.maxLength(this.maxCancelLength)]],
      date: ['']
    });
    this.cancelForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((validationStatus: string) => {
        this.isDisabled = validationStatus === 'INVALID';
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onConfirm(): void {
    if (this.cancelForm.invalid) {
      return;
    }

    const { comment, date } = this.cancelForm.value;
    const payload = {
      newReviewDate: date ? this.timeService.getTimezoneDate(date).utc().format() : null,
      cancelReviewComment: comment,
    };

    this.isDisabled = true;

    this.tabsService.cancelInterview(this.candidateId, payload)
      .pipe(
        catchError((error: IRequestError) => {
          this.isDisabled = false;
          this.changeDetectorRef.markForCheck();
          throw new Error(error.message);
        })
      )
      .subscribe(
        () => {
          this.isDisabled = false;
          this.changeDetectorRef.markForCheck();
          this.updateCandidates.emit();
        }
      );
  }

  public onCancel(): void {
    this.cancel.emit();
  }
}
