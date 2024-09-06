import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ACTION_OPTION_ADD_UPDATE,
  ACTION_OPTION_DELETE,
  ACTION_OPTION_EDIT,
  ACTION_OPTION_OPEN,
  IActionSelectorOption,
} from '@andkit/components/selects/action-selector/action-selector.config';
import { ILabel } from '@interfaces/label';
import { IOneToOne } from '@interfaces/one-to-one';
import { INTERVIEWER_POSITIONS, RISKS_OF_LEAVING } from '@pages/employee/one-to-one/one-to-one-const';

@Component({
  selector: 'andteam-one-to-one-row',
  templateUrl: './one-to-one-row.component.html',
  styleUrls: ['./one-to-one-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneToOneRowComponent implements OnInit {
  @Input() public oneToOne: IOneToOne;
  @Input() public currentDate: number;
  @Output() oneToOneAction = new EventEmitter<{ action: IActionSelectorOption, id: string }>();

  public iconType = 'more_vert';
  public menuItems: IActionSelectorOption[] = [];
  public label: ILabel;
  public isLabelDisabled = false;
  public interviewerPosition: {
    name: string,
    label: string
  };

  constructor() { }

  public ngOnInit(): void {
    this.label = RISKS_OF_LEAVING[this.oneToOne.riskOfLeaving];
    if (this.oneToOne.interviewer.position) {
      this.interviewerPosition = INTERVIEWER_POSITIONS[this.oneToOne.interviewer.position];
    }
    if (this.oneToOne.canEdit) {
      this.menuItems.push(ACTION_OPTION_OPEN, ACTION_OPTION_EDIT);
    } else if (this.oneToOne.isLastOneToOne === true) {
      this.menuItems.push(ACTION_OPTION_OPEN, ACTION_OPTION_ADD_UPDATE);
    } else {
      this.menuItems.push(ACTION_OPTION_OPEN);
    }
  }

  public onViewOneToOne(): void {
    this.oneToOneAction.emit({ action: ACTION_OPTION_OPEN, id: this.oneToOne.id });
  }

  public onSelectMenuOption(action: IActionSelectorOption): void {
    this.oneToOneAction.emit({ action, id: this.oneToOne.id });
  }
}
