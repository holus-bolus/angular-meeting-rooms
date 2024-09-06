import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import cautionSvg from '!!raw-loader!@assets/images/caution.svg';
import questionLogoSvg from '!!raw-loader!@assets/images/question-logo.svg';

@Component({
  selector: 'andteam-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ConfirmModalComponent implements OnInit {
  @Output() confirmEvent = new EventEmitter<void>(); //  ????
  @Output() cancelEvent = new EventEmitter<void>();
  @Output() closeParent = new EventEmitter<void>();

  public questionLogoSvg: SafeHtml;
  public cautionSvg: SafeHtml;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.SUBMIT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<any> // ????
  ) {
    dialogRef.disableClose = true;
  }

  public ngOnInit(): void {
    this.questionLogoSvg = this.sanitizer.bypassSecurityTrustHtml(questionLogoSvg as any);
    this.cautionSvg = this.sanitizer.bypassSecurityTrustHtml(cautionSvg as any);
  }

  public confirm(): void {
    this.confirmEvent.emit();
    this.dialogRef.close(true);
  }

  public cancelConfirm(): void {
    this.cancelEvent.emit();
    this.closeParent.emit();
    this.dialogRef.close(false);
  }
}
