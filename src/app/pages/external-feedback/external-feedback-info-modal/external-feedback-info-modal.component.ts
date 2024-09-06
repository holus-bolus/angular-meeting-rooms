import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, ChangeDetectionStrategy, Inject, ViewEncapsulation } from '@angular/core';
import { IFeedbackSkill } from '@interfaces/feedback.interface';

import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';


@Component({
  selector: 'andteam-external-feedback-info-modal',
  templateUrl: './external-feedback-info-modal.component.html',
  styleUrls: ['./external-feedback-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ExternalFeedbackInfoModalComponent {
  readonly closeIcon = closeSmallSvg;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { skill: IFeedbackSkill },
  ) { }
}
