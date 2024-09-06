import { CONFIRM_MODAL_TITLES } from './../one-to-one-const';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Inject
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import cautionSvg from '!!raw-loader!@assets/images/caution.svg';

@Component({
  selector: 'andteam-one-to-one-confirm-modal',
  templateUrl: './one-to-one-confirm-modal.component.html',
  styleUrls: ['./one-to-one-confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OneToOneConfirmModalComponent implements OnInit {

  public cautionSvg: SafeHtml;
  public cancelButtonType = BUTTON_TYPES.PREVIOUS;
  public confirmButtonType = BUTTON_TYPES.PRIMARY;
  public modalTitles: { title: string; subtitle: string };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { oneToOneActionData: { action: { name: string; } } },
    private dialogRef: MatDialogRef<OneToOneConfirmModalComponent>,
    private sanitizer: DomSanitizer,
  ) {
    dialogRef.disableClose = true;
  }

  public ngOnInit(): void {
    this.cautionSvg = this.sanitizer.bypassSecurityTrustHtml(cautionSvg as any);
    this.getTitlesText();
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public cancelConfirm(): void {
    this.dialogRef.close(false);
  }

  public getTitlesText(): void {
    const { action } = this.data.oneToOneActionData;
    this.modalTitles = CONFIRM_MODAL_TITLES[action.name.replace(' ', '') .toLowerCase()];
  }
}
