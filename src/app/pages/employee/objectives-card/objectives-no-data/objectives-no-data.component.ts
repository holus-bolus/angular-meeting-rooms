import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import noDataSvg from '@assets/images/no-data.svg';
import { OBJECTIVE_NO_DATA_HR_LABEL, OBJECTIVE_NO_DATA_LABEL } from '../objectives-const';

@Component({
  selector: 'andteam-objectives-no-data',
  templateUrl: './objectives-no-data.component.html',
  styleUrls: ['./objectives-no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesNoDataComponent implements OnInit {
  @Input() public isRM = false;

  public label: string;
  public readonly noDataIcon = noDataSvg;

  public ngOnInit(): void {
    this.label = this.isRM ? OBJECTIVE_NO_DATA_HR_LABEL : OBJECTIVE_NO_DATA_LABEL;
  }
}
