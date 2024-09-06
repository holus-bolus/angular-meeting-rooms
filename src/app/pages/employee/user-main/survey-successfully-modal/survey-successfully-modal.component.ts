import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';

import envelopSvg from '!!raw-loader!@assets/images/envelop.svg';

@Component({
  selector: 'andteam-survey-successfully-modal',
  templateUrl: './survey-successfully-modal.component.html',
  styleUrls: ['./survey-successfully-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveySuccessfullyModalComponent {
  public envelopeIcon = envelopSvg;
  public confirmButtonType = BUTTON_TYPES.SUBMIT;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SurveySuccessfullyModalComponent>
  ) { }

  public onClose(): void {
    this.dialogRef.close();
  }
}
