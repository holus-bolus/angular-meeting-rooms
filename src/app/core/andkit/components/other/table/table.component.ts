import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnChanges, SimpleChanges, OnInit,
} from '@angular/core';
import { TableOptions } from './table.config';
import { IPaginationConfig } from '@interfaces/employee';

const EMPLOYEES = 'employees';

@Component({
  selector: 'andteam-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnChanges, OnInit {
  public noDataMessage = 'Employee List is empty';
  public isPortalType = false;
  public isPagination: boolean;
  public isNoDataComponent: boolean;
  public isEmployees: boolean;
  public isProjects: boolean;
  public isProjectInfo: boolean;

  @Input() data: any[];
  @Input() columnDefs: string[];
  @Input() tableOptions: TableOptions;
  @Input() paginationConfig: IPaginationConfig;
  @Input() listType: string;
  @Input() isSpinnerShown: boolean;
  @Input() isLoading: boolean;
  @Input() tableTitle: string;
  @Input() totalItemsCount: number;
  @Input() totalPages: number;

  @Output() sendPageNumber = new EventEmitter<number>();
  @Output() clickCell = new EventEmitter<string>();
  @Output() employeeClick = new EventEmitter<void>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      const haveData = !!(this.data && this.data.length);

      this.isPagination = this.listType === EMPLOYEES && haveData;
      this.isNoDataComponent = this.listType === EMPLOYEES && !haveData;
    }
  }

  public ngOnInit(): void  {
    this.isEmployees = this.listType === 'employees';
    this.isProjects = this.listType === 'projects';
    this.isProjectInfo = this.listType === 'projectInfo';
  }

  public onCellClicked(event: any): void  {
    this.clickCell.emit(event);
  }

  public onSendPageNumber(page: number): void  {
    this.sendPageNumber.emit(page);
  }

  public onEmployeeClick(): void  {
    this.employeeClick.emit();
  }
}
