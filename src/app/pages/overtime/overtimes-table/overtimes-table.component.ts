import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IOverviewShortForTable } from '@interfaces/overview.interface';
import { MENU_ACTIONS, TableMenuAction } from '@andkit/components/other/table/table.config';
import { IOvertimeValues } from '@interfaces/overtime.interface';

@Component({
  selector: 'andteam-overtimes-table',
  templateUrl: './overtimes-table.component.html',
  styleUrls: ['./overtimes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OvertimesTableComponent {
  public isDeleteMenu = MENU_ACTIONS.DELETE;

  @Input() tableHead: string[];
  @Input() dataSource: IOverviewShortForTable[] = [];

  @Output() triggerAction = new EventEmitter<any>();

  constructor() { }

  public getSumAndHours(over: IOvertimeValues): string {
    return over.sum ? `${over.sum} ${over.currency}` : `${over.hours} hours`;
  }

  public onTriggerAction(item: IOvertimeValues, action: string): void {
    this.triggerAction.emit({ item, action } as TableMenuAction);
  }
}
