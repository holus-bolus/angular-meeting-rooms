import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';

@Component({
  selector: 'andteam-one-to-one-instruction-modal',
  templateUrl: './one-to-one-instruction-modal.component.html',
  styleUrls: ['./one-to-one-instruction-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OneToOneInstructionModalComponent {
  readonly closeIcon = closeSmallSvg;
}
