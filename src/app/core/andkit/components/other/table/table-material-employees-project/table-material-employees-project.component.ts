import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
  OnChanges } from '@angular/core';
import { IEmployeeRow } from 'src/app/interfaces/employee';

@Component({
  selector: 'andteam-table-material-employees-project',
  templateUrl: './table-material-employees-project.component.html',
  styleUrls: ['./table-material-employees-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableMaterialEmployeesProjectComponent implements OnChanges {

  @Input() rowData: IEmployeeRow[];
  @Input() columnDefs: string[];
  @Input() isNoData: boolean;
  @Input() isSpinnerShown: boolean;
  @Input() isLoading: boolean;
  @Input() tableTitle: string;

  @Output() employeeClick = new EventEmitter<void>();
  @ViewChild('tbody') private tbody: ElementRef;

  public ngOnChanges(): void {
    if (!this.isLoading) {
      this.tbody.nativeElement.scrollTop = 0;
    }
  }

  public onEmployeeClick(): void {
    this.employeeClick.emit();
  }
}
