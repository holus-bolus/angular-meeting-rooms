import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import controlArrowSvg from '!!raw-loader!../icons/control-arrow.svg';
import controlDoubleArrowSvg from '!!raw-loader!../icons/control-double-arrow.svg';

@Component({
  selector: 'andteam-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {
  @Input() currentDate = new Date();

  readonly controlArrow = controlArrowSvg as any;
  readonly controlArrows = controlDoubleArrowSvg as any;
}
