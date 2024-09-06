import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IObjective, TYPE_OBJECTIVE_STATUS_NAME } from '@interfaces/objective';
import closeSvg from '!!raw-loader!@assets/images/close.svg';
import { FormControl, Validators } from '@angular/forms';
import { VALIDATOR_LENGTH } from '@pages/employee/objectives-card/objectives-const';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';

@Component({
  selector: 'andteam-objective-to-archive-modal',
  templateUrl: './objective-to-archive-modal.component.html',
  styleUrls: ['./objective-to-archive-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ObjectiveToArchiveModalComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<string>();

  public readonly closeIcon: string = closeSvg;
  public readonly confirmButtonType = BUTTON_TYPES.PRIMARY;
  public readonly noFirstWhitespaces: RegExp = /\S/;
  public readonly maxMessageLength = VALIDATOR_LENGTH.COMMENT_MAX_LENGTH;
  public readonly statusDoneName: TYPE_OBJECTIVE_STATUS_NAME = TYPE_OBJECTIVE_STATUS_NAME.DONE;

  public status: TYPE_OBJECTIVE_STATUS_NAME;
  public commentControl: FormControl;
  public hintMessageText: string;
  public isFormValid = true;
  public placeHolder: string;

  private objectiveStaticData: IObjective;

  constructor(
    private modalWindow: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      objectiveStaticData: IObjective,
      status: TYPE_OBJECTIVE_STATUS_NAME
    }
  ) {
    this.objectiveStaticData = data.objectiveStaticData;
    this.status = data.status;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onClose(): void {
    this.modalWindow.closeAll();
  }

  onSubmit(): void {
    if (this.commentControl.invalid) {
      this.isFormValid = false;
      this.hintMessageText = 'Required field';

      return;
    }
    this.confirmEvent.emit(this.commentControl.value);
  }

  public onKeyUpComment(): void {
    this.isFormValid = true;
    this.hintMessageText = `Number of characters ${this.commentControl.value.length}/${this.maxMessageLength}`;
  }

  public onClickComment(): void {
    this.isFormValid = true;
    this.hintMessageText = '';
  }

  private initForm(): void {
    this.commentControl = new FormControl(this.objectiveStaticData?.comment || '');
    if (this.status === TYPE_OBJECTIVE_STATUS_NAME.DONE) {
      this.placeHolder = 'Comment';
      this.commentControl.setValidators([
        Validators.maxLength(VALIDATOR_LENGTH.COMMENT_MAX_LENGTH),
        Validators.pattern(this.noFirstWhitespaces)
      ]);
    } else {
      this.placeHolder = 'Comment*';
      this.commentControl.setValidators([
        Validators.maxLength(VALIDATOR_LENGTH.COMMENT_MAX_LENGTH),
        Validators.minLength(VALIDATOR_LENGTH.COMMENT_MIN_LENGTH),
        Validators.required,
        Validators.pattern(this.noFirstWhitespaces)
      ]);
    }
  }
}
