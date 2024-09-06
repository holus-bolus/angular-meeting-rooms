import { Component, Input, OnInit } from '@angular/core';

import doneSvg from '!!raw-loader!../icons/done.svg';
import notDoneSvg from '!!raw-loader!../icons/not-done.svg';
import unknownSvg from '!!raw-loader!../icons/unknown.svg';

@Component({
  selector: 'andteam-objective-card',
  templateUrl: './objective-card.component.html',
  styleUrls: ['./objective-card.component.scss']
})
export class ObjectiveCardComponent implements OnInit {
  @Input() public isDone: boolean;
  @Input() public title: string;
  @Input() public description: string;

  public icon: string;

  readonly doneIcon = doneSvg;
  readonly notDoneIcon = notDoneSvg;
  readonly unknownIcon = unknownSvg;

  public ngOnInit(): void {
    if (this.isDone === undefined) {
      this.icon = this.unknownIcon;
    } else {
      this.icon = this.isDone ? this.doneIcon : this.notDoneIcon;
    }
  }
}
