import { ONE_TO_ONE_TYPES, RISKS_OF_LEAVING, REQUIRED_FIELD } from './../one-to-one-const';
import { MAX_COMMENT_LENGTH, RISK_OF_LEAVING_INFO } from '../one-to-one-const';
import { takeUntil, filter, take } from 'rxjs/operators';
import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { IOneToOne, IOneToOnePostData } from '@interfaces/one-to-one';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ONE_TO_ONE_SELECT_OPTIONS,
  RISK_OF_LEAVING_SELECT_OPTIONS,
  ONE_TO_ONE_CONFIRM_MODAL_WINDOW_WIDTH,
  VALIDATOR_LENGTH,
  MAX_COMMENT_ROWS,
  ONE_WEEK_LENGTH
} from '@pages/employee/one-to-one/one-to-one-const';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { OneToOneConfirmModalComponent } from '@pages/employee/one-to-one/one-to-one-confirm-modal/one-to-one-confirm-modal.component';
import * as _moment from 'moment-timezone';
import { Moment } from 'moment-timezone/moment-timezone';
import { ICommonOption } from '@interfaces/filter';

import closeSvg from '!!raw-loader!@assets/images/close.svg';
import { BehaviorSubject, Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { isEmpty } from 'lodash';
import { CompanyService } from '@services/company.service';

const moment = _moment;

interface IAddOneToOneData {
  employeeId: string;
  oneToOneActionData: object;
  oneToOneStaticData?: IOneToOne;
  userSkillLvl: string;
  reasonsForLeaving: ICommonOption[];
}

@Component({
  selector: 'andteam-one-to-one-modal',
  templateUrl: './one-to-one-modal.component.html',
  styleUrls: ['./one-to-one-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OneToOneModalComponent implements OnInit, OnDestroy {

  public get isEditMode(): boolean {
    return Boolean(this.data?.oneToOneStaticData);
  }
  @Output() oneToOneAdd = new EventEmitter<{ oneToOneId: string, data: IOneToOnePostData }>();
  @Output() cancelEvent = new EventEmitter<void>();

  public currentForm: FormGroup;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public yellow = MaterialInfoBtnConst.YELLOW;
  public closeIcon: string = closeSvg;
  public nextInterviewDate: string | Date;
  public minStartDate: Date;
  public minPreviousDate: Date;
  public errorMessageText: string;
  public isShowReason: boolean;
  public isShowLangError = new BehaviorSubject(false);
  public isShowUpdateLangError = new BehaviorSubject(false);
  public riskOfLeavingList = RISK_OF_LEAVING_SELECT_OPTIONS;
  public oneToOneTypes = ONE_TO_ONE_SELECT_OPTIONS;
  public maxMessageLength = VALIDATOR_LENGTH.COMMENT_MAX_LENGTH;
  public maxUpdateMessageLength = VALIDATOR_LENGTH.UPDATE_COMMENT_MAX_LENGHT;
  public maxCommentRows = MAX_COMMENT_ROWS;
  public readonly risksInfo = RISK_OF_LEAVING_INFO;
  public readonly errorRequiredField = REQUIRED_FIELD;
  public disable = false;

  private readonly englishOnlyRegex = `^[A-Za-z0-9\\s!@#№$%^&*"()_+=\`~\\\\\\]\\[{}|'´;:/.,?><-]*$`;
  private readonly destroy$ = new Subject();
  private updatesForDelete: number[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAddOneToOneData,
    private modalWindow: MatDialog,
    private dialogRef: MatDialogRef<OneToOneModalComponent>,
    private fb: FormBuilder,
    private companyService: CompanyService,
  ) {
    this.disable = this.data?.oneToOneStaticData?.canEdit === false;
  }

  public hintMessageText(fieldName: string, maxLength: number): string {
    const str = this.currentForm.get(fieldName).value;
    if (!str.length) {
      return this.errorRequiredField;
    }

    if (str.length > maxLength) {
      return `Text exceeds ${maxLength} character limit`;
    }

    return `Number of characters ${str.length}/${maxLength}`;
  }

  public ngOnInit(): void {
    this.initBackdropClick();
    this.initMinStartDate();
    this.initForm();
    this.initRiskOfLeavingListener();
    this.initDateListener();
    this.patchForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getControl(name: string): AbstractControl {
    return this.currentForm.get(name);
  }

  public onClose(): void {
    this.modalWindow.open(OneToOneConfirmModalComponent, {
      width: ONE_TO_ONE_CONFIRM_MODAL_WINDOW_WIDTH,
      data: {
        oneToOneActionData: this.data.oneToOneActionData,
        isCancelAddingOneToOne: true
      }
    })
      .afterClosed()
      .pipe(
        take(1),
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.dialogRef.close());
  }

  public onCommentKeyUp(): void {
    this.currentForm.controls.comment?.errors?.hasOwnProperty('pattern')
      ? this.isShowLangError.next(true)
      : this.isShowLangError.next(false);
  }

  public onUpdateCommnetKeyUp(): void {
    this.currentForm.controls.update?.errors?.hasOwnProperty('pattern')
    ?  this.isShowUpdateLangError.next(true)
    : this.isShowUpdateLangError.next(false);
  }

  public onAddUpdate(): void {
    this.addCommentControl('update', 500);
  }

  public onDeleteUpdateComment(id: number | null = null): void {
    if (id == null) {
      this.currentForm.removeControl('update');
    } else {
      this.updatesForDelete.push(id);
      this.data.oneToOneStaticData.updates = this.data.oneToOneStaticData.updates.filter(el => el.id !== id);
    }
  }

  public onSubmit(): void {
    this.currentForm.enable();
    const { invalid, value } = this.currentForm;

    this.currentForm.markAllAsTouched();

    if (invalid) {
      return;
    }

    const formatedDate = new Date(value.date).toDateString();
    const postData = {
      ...value,
      employeeId: this.data.employeeId,
      date: formatedDate,
      nextInterviewDate: moment(value.nextInterviewDate)
        .set('hours', 9)
        .set('minutes', 0)
        .toISOString(true),
      updatesForDelete: this.updatesForDelete,
    };

    if (value.update !== null && !isEmpty(value.update)) {
      postData.update = { updateComment: value.update, oneToOneId: value.id };
    }

    this.dialogRef.close(postData);
  }

  private initBackdropClick(): void {
    this.dialogRef
      .backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.onClose.bind(this));
  }

  private initMinStartDate(): void {
    this.minStartDate = new Date();
    this.minStartDate.setDate(this.minStartDate.getDate() - ONE_WEEK_LENGTH);
  }

  private initForm(): void {
    this.currentForm = this.fb.group({
      date: [new Date(), Validators.required],
      oneToOneType: [null, Validators.required],
      nextInterviewDate: [''],
      nextInterviewType: [null, Validators.required],
      riskOfLeaving: [null, Validators.required],
      riskFiringReasonId: [null],
      comment: [''],
    });
    this.addCommentControl('comment', MAX_COMMENT_LENGTH);
  }

  private addCommentControl(name: string, length: number): void {
    this.currentForm.addControl(
      name, new FormControl('', [
        Validators.required,
        Validators.maxLength(length),
      ]),
    );
    if (this.companyService.mainLanguage === 'En') {
      this.currentForm.get(name).setValidators([
        Validators.required,
        Validators.maxLength(length),
        Validators.pattern(this.englishOnlyRegex)]);
    }
    this.currentForm.updateValueAndValidity();
  }

  private patchForm(): void {
    if (!this.isEditMode) {
      return;
    }

    const {
      interviewDate: date,
      nextInterviewDate,
      type,
      riskOfLeaving,
      riskFiringReason,
      comment,
      typeOfNext: nextInterviewType
    } = this.data.oneToOneStaticData;

    this.currentForm.patchValue({
      date,
      nextInterviewDate,
      comment,
      oneToOneType: ONE_TO_ONE_TYPES[type]?.id || null,
      nextInterviewType: ONE_TO_ONE_TYPES[nextInterviewType]?.id || null,
      riskOfLeaving: RISKS_OF_LEAVING[riskOfLeaving]?.id || null,
      riskFiringReasonId: riskFiringReason?.id || null
    });

    if (this.disable) {
      this.currentForm.get('date').disable();
      this.currentForm.get('oneToOneType').disable();
      this.currentForm.get('nextInterviewDate').disable();
      this.currentForm.get('nextInterviewType').disable();
      this.currentForm.get('riskOfLeaving').disable();
      this.currentForm.get('riskFiringReasonId').disable();
      this.currentForm.get('comment').disable();
    }
  }

  private initDateListener(): void {
    this.currentForm.get('date').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((date: Date) => this.getCurrentDate(date));
  }

  private getCurrentDate(date: Date): void {
    this.minPreviousDate = date;

    const nextDate = this.data.userSkillLvl.match(/S/)
      ? moment(date).add(6, 'month')
      : moment(date).add(3, 'month');

    this.nextInterviewDate = nextDate.toDate();
    this.currentForm.get('nextInterviewDate').patchValue(nextDate.toDate());
  }

  private initRiskOfLeavingListener(): void {
    this.currentForm.get('riskOfLeaving').valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: number) => this.toggleReasonVisibility(value));
  }

  private toggleReasonVisibility(riskId: number): void {
    const control = this.currentForm.get('riskFiringReasonId');

    this.isShowReason = riskId > 1;

    if (this.isShowReason) {
      control.setValidators(Validators.required);
    } else {
      control.clearValidators();
      control.patchValue('');
    }
    control.updateValueAndValidity();
  }
}
