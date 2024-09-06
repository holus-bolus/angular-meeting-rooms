import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';

@Component({
  selector: 'andteam-objectives-active-info-modal',
  templateUrl: './objectives-active-info-modal.component.html',
  styleUrls: ['./objectives-active-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ObjectivesActiveInfoModalComponent {
  readonly closeIcon = closeSmallSvg;
}
