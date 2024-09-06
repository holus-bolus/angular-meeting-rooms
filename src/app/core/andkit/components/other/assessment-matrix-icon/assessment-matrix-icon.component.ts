import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import emptyDefaultSvg from '!!raw-loader!./icons/empty-default.svg';
import fullDefaultSvg from '!!raw-loader!./icons/full-default.svg';

@Component({
  selector: 'andteam-assessment-matrix-icon',
  templateUrl: './assessment-matrix-icon.component.html',
  styleUrls: ['./assessment-matrix-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentMatrixIconComponent {
  @Input() isFull: boolean;
  @Input() readonly emptyIcon = emptyDefaultSvg;
  @Input() readonly fullicon = fullDefaultSvg;
  @Input() onHover = false;
}
