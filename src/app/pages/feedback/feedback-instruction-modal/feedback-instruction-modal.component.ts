import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';

@Component({
  selector: 'andteam-feedback-instruction-modal',
  templateUrl: './feedback-instruction-modal.component.html',
  styleUrls: ['./feedback-instruction-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FeedbackInstructionModalComponent {
  readonly closeIcon = closeSmallSvg;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { 
    isMyFeedbackInstruction?: boolean, 
    isExternal?: boolean,
    isProject: boolean,
   }) {
  }
}
