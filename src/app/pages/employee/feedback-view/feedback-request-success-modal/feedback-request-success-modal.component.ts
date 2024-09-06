import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICommonOption } from '@interfaces/filter';

import envelopSvg from '!!raw-loader!@assets/images/envelop.svg';

@Component({
  selector: 'andteam-ask-for-feedback-successful',
  templateUrl: './feedback-request-success-modal.component.html',
  styleUrls: ['./feedback-request-success-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FeedbackRequestSuccessModalComponent implements OnInit {
  public requestedEmployees: ICommonOption[];
  public mailIcon = envelopSvg;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICommonOption[],
    private dialogRef: MatDialogRef<FeedbackRequestSuccessModalComponent>
  ) {}

  public ngOnInit():void {
    this.requestedEmployees = this.data;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
