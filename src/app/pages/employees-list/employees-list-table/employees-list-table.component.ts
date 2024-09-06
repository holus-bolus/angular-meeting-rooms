import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IEmployeeRow, IPaginationConfig } from '@interfaces/employee';

@Component({
  selector: 'andteam-employees-list-table',
  templateUrl: './employees-list-table.component.html',
  styleUrls: ['./employees-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListTableComponent implements OnInit {
  @Input() public employees: IEmployeeRow[];
  @Input() public paginationConfig: IPaginationConfig;
  @Input() public isSpinnerShown: boolean;
  @Input() public isLoading: boolean;
  @Input() public totalItemsCount: number;
  @Input() public totalPages: number;
  @Input() public isAdmin: boolean;

  @Output() public sendPageNumber: EventEmitter<number> = new EventEmitter<number>();

  public columnDefs: string[] = [];

  public ngOnInit(): void {
    this.createTableSettings();
  }

  public onSendPageNumber(event: number): void {
    this.sendPageNumber.emit(event);
  }

  public createTableSettings(): void {
    this.columnDefs = this.isAdmin ?
      ['employee', 'level', 'rm', 'role', 'location', 'userRoles'] : ['employee', 'level', 'rm', 'role', 'location'];
  }
}
