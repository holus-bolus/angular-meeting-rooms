import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BUTTON_PRIMARY } from '@constants/buttons';

import successSvg from '!!raw-loader!../../icons/success.svg';
import errorSvg from '!!raw-loader!../../icons/error.svg';

@Component({
  selector: 'andteam-employee-matrix-modal',
  templateUrl: './employee-matrix-modal.component.html',
  styleUrls: ['./employee-matrix-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeMatrixModalComponent {
  @Input() public isSuccessModal: boolean;
  @Input() public buttonName: string;
  @Input() public mainMessage: string;
  @Input() public additionalMessage: string;
  @Input() public interviewerTips: string[];
  @Input() public matrixLink: string;
  @Input() public matrixErrors: string;
  @Input() public isLoading = false;
  @Input() public isOpenCancelModal: boolean;
  @Input() public isModalContainsLink: boolean;

  @Output() public cancel = new EventEmitter<void>();

  public isShowCloseIcon = false;

  readonly successIcon = successSvg;
  readonly errorIcon = errorSvg;
  readonly buttonPrimary = BUTTON_PRIMARY;

  public onCancel(): void {
    this.cancel.emit();
  }
}
