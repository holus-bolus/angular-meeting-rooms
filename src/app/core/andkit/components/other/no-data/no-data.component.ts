import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import noDataSvg from '!!raw-loader!@assets/images/no-data.svg';

@Component({
  selector: 'andteam-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoDataComponent {
  @Input() noDataMessage: string;
  @Input() noDataMessageSecond: string;
  @Input() wikiMessage: string;
  @Input() noDataIcon = noDataSvg;
  @Input() linkOnWiki: string;
  @Input() titleOfWiki: string;
  @Input() titleOfLink: string;
  @Input() isLink = false;
}
