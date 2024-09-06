import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';

@Component({
  selector: 'andteam-objectives-archive-info-modal',
  templateUrl: './objectives-archive-info-modal.component.html',
  styleUrls: ['./objectives-archive-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ObjectivesArchiveInfoModalComponent {
  readonly closeIcon = closeSmallSvg;
}
