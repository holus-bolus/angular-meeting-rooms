import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import emptyPageSvg from '!!raw-loader!@assets/images/empty-page.svg';

@Component({
  selector: 'andteam-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EmptyPageComponent {
  @Input() errorMessage: string;

  public emptyPageIcon = emptyPageSvg;

  constructor() { }
}
