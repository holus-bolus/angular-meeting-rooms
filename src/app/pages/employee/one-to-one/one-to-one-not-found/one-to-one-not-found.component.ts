import { Component, ChangeDetectionStrategy } from '@angular/core';
import noDataSvg from '@assets/images/no-data.svg';

@Component({
  selector: 'andteam-one-to-one-not-found',
  templateUrl: './one-to-one-not-found.component.html',
  styleUrls: ['./one-to-one-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneToOneNotFoundComponent {
  public noDataIcon = noDataSvg;
  public noDataText = 'There\'s no One to one for the employee yet';
}
