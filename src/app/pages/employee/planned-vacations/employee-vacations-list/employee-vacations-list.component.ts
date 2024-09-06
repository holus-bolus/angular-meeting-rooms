import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { EmployeeVacationsTitleList } from '@pages/employee/planned-vacations/planned-vacations.const';
import { IPlannedVacation } from '@interfaces/planned-vacations';

@Component({
  selector: 'andteam-employee-vacations-list',
  templateUrl: './employee-vacations-list.component.html',
  styleUrls: ['./employee-vacations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployeeVacationsListComponent {
  @Input() plannedVacationsList: IPlannedVacation;

  public titleList = EmployeeVacationsTitleList;
  public displayedColumnsList = [
    'year',
    'working-year',
    'absence-periods',
    'annual-norm',
    'accrued-days',
    'used-days',
    'remaining-days',
    'compensation-days',
    'reason'
  ];
  constructor() { }
}
