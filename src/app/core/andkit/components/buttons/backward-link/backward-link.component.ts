import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

import arrowBackSvg from '!!raw-loader!../../../../../../assets/images/arrow-back.svg';

@Component({
  selector: 'andteam-backward-link',
  templateUrl: './backward-link.component.html',
  styleUrls: ['./backward-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackwardLinkComponent {
  @Output() public goBack = new EventEmitter<void>();

  readonly backIcon = arrowBackSvg as any;

  public goToBack(): void {
    this.goBack.emit();
  }
}
