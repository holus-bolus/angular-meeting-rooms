import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import closeSvg from '!!raw-loader!@assets/images/close.svg';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  OBJECTIVE_VALIDATOR_LENGTH,
  TYPE_SELECT_OPTIONS,
  VALIDATOR_LENGTH,
} from '@pages/employee/objectives-card/objectives-const';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import {
  IObjective, OBJECTIVE_TYPES, TYPE_SELECT_OPTIONS_IDS, TYPE_SELECT_OPTIONS_NAME,
  TypeSelectOptions
} from '@interfaces/objective';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { CONFIRM_MODAL_WIDTH } from '@pages/employee/planned-vacations/planned-vacations.const';
import { touchValidateDeep } from '@pages/assessment/coordinator-cabinet/coordinator-cabinet';

@Component({
  selector: 'andteam-objectives-add-modal',
  templateUrl: './objectives-add-modal.component.html',
  styleUrls: ['./objectives-add-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ObjectivesAddModalComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<void>();

  public closeIcon: string = closeSvg;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public maxCommentMessageLength = VALIDATOR_LENGTH.COMMENT_MAX_LENGTH;
  public maxTextMessageLength = OBJECTIVE_VALIDATOR_LENGTH.MAX_LENGTH;
  public objectiveTypes = OBJECTIVE_TYPES;
  public noFirstWhitespaces: RegExp = /\S/;

  public currentForm = new FormGroup({});
  public objectiveControl: FormControl;
  public commentControl: FormControl;
  public typeControl: FormControl;
  public dateControl: FormControl;
  public formData: IObjective;
  public isDisabled: boolean;
  public typeOfObjectives = TYPE_SELECT_OPTIONS;
  public readonly dayInTime = 3600 * 1000 * 24;
  public readonly minDate = new Date(Date.now() + this.dayInTime);
  public readonly matSelectPanelClass = 'objective-panel-class';

  public readonly errorRequiredField = 'Required Field';

  private employeeId: string;
  private interviewerId: string;
  private nextAssessmentDate: string;

  private readonly objectiveStatusOpen = 2;

  constructor(
    private modalWindow: MatDialog,
    private modalWindowRef: MatDialogRef<ObjectivesAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      objectiveStaticData: IObjective,
      isDisabled: boolean,
      employeeId: string,
      interviewerId: string,
      nextAssessmentDate: string
    }
  ) {
    this.formData = data.objectiveStaticData;
    this.isDisabled = data.isDisabled;
    this.employeeId = data.employeeId;
    this.interviewerId = data.interviewerId;
    this.nextAssessmentDate = this.assignNextAssessmentDate(data.nextAssessmentDate);
  }

  public ngOnInit(): void {
    this.initForm();

    if (!this.isDisabled) {
      this.typeOfObjectives = this.typeOfObjectives
        .filter(item => item.id !== TYPE_SELECT_OPTIONS_IDS.NONE);
    }
  }

  public initForm(): void {
    this.objectiveControl = new FormControl(
      {
        value: this.formData ? this.formData.objective : '',
        disabled: this.isDisabled
      },
      [
        Validators.maxLength(OBJECTIVE_VALIDATOR_LENGTH.MAX_LENGTH),
        Validators.minLength(OBJECTIVE_VALIDATOR_LENGTH.MIN_LENGTH),
        Validators.required,
        Validators.pattern(this.noFirstWhitespaces)
      ]
    );
    this.commentControl = new FormControl(
      {
        value: this.formData ? this.formData.comment : '',
        disabled: this.isDisabled
      },
      [
        Validators.maxLength(VALIDATOR_LENGTH.COMMENT_MAX_LENGTH),
        Validators.pattern(this.noFirstWhitespaces)
      ]);
    this.typeControl = new FormControl(
      {
        value: this.formData ? this.formData.type : '',
        disabled: this.isDisabled
      },
      [Validators.required]
    );
    this.dateControl = new FormControl(
      {
        value: this.formData ? this.formData.dueDate : this.nextAssessmentDate,
        disabled: this.isDisabled
      },
      [Validators.required]
    );

    this.currentForm.addControl('objective', this.objectiveControl);
    this.currentForm.addControl('comment', this.commentControl);
    this.currentForm.addControl('objectiveType', this.typeControl);
    this.currentForm.addControl('dueDate', this.dateControl);
  }

  public showTextErrorMessage(control: FormControl): boolean {
    return (!control.value && control.touched)
      || control.value.length > this.maxTextMessageLength;
  }

  public hintTextMessageText(control: FormControl): string {
    return `Number of characters ${control.value.length}/${this.maxTextMessageLength}`;
  }

  public get showCommentErrorMessage(): boolean {
    return this.commentControl.value.length > this.maxCommentMessageLength;
  }

  public get hintCommentMessageText(): string {
    return `Number of characters ${this.commentControl.value.length}/${this.maxCommentMessageLength}`;
  }

  public get modalTitle(): string {
    let label = 'Objective';

    if (!this.isDisabled) {
      label = this.formData ? 'Edit Objective' : 'Add Objective';
    }

    return label;
  }

  public onClose(): void {
    if (this.isDisabled) {
      this.modalWindow.closeAll();
    } else {
      this.showConfirmPopup();
    }
  }

  public onSubmit(): void {
    touchValidateDeep(this.currentForm, 'touched');
    const formData = this.currentForm.value;

    if (this.currentForm.valid) {
      formData.employeeId = this.employeeId;
      formData.interviewerId = this.interviewerId;
      formData.objectiveStatus = this.objectiveStatusOpen;
      formData.objectiveType = this.objectiveTypes.filter(obj => obj.name === formData.objectiveType)[0].id;

      if (this.formData) {
        this.modalWindowRef.close({ id: this.formData.id, data: formData });
      } else {
        this.modalWindowRef.close({ data: formData });
      }
    }
  }

  private assignNextAssessmentDate(nextAssessmentDate: string = new Date().toISOString()): string {
    return new Date(nextAssessmentDate) < this.minDate ? null : nextAssessmentDate;
  }

  private findTypeValue(name: TYPE_SELECT_OPTIONS_NAME): TypeSelectOptions | string {
    const response = this.typeOfObjectives.find(type => type.name === name);

    if (this.isDisabled) {
      return response ? response.name : this.typeOfObjectives[0].name;
    }

    return response;
  }

  private showConfirmPopup(): void {
    const confirmDialog = this.modalWindow.open(ConfirmModalComponent, {
      width: CONFIRM_MODAL_WIDTH,
      data: {
        titleText: this.formData ? 'Cancel editing objective?' : 'Cancel adding objective?',
        subtitleText: this.formData ? 'Your changes won’t be saved' : 'Your objective won’t be added',
        cancelBtnText: 'No',
        confirmBtnText: 'Yes'
      }
    });

    const subscribeDialogConfirmCancel = confirmDialog.componentInstance.cancelEvent.subscribe(() => {
      confirmDialog.close();
    });

    const subscribeDialogEditCancel = confirmDialog.componentInstance.confirmEvent.subscribe(() => {
      confirmDialog.close();
      this.modalWindow.closeAll();
    });

    confirmDialog.afterClosed().subscribe(() => {
      subscribeDialogConfirmCancel.unsubscribe();
      subscribeDialogEditCancel.unsubscribe();
    });
  }
}
