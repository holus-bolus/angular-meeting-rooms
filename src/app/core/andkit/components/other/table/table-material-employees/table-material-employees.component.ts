import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnChanges, OnInit, SimpleChanges, ChangeDetectorRef,
} from '@angular/core';
import { IEmployeeListRow, IEmployeeRow, IPaginationConfig, IUserRole } from '@interfaces/employee';
import { ISelectOption } from '@interfaces/filter';
import { EmployeeService } from '@services/employee.service';
import { switchMap, take } from 'rxjs/operators';
import { iif, of } from 'rxjs';

@Component({
  selector: 'andteam-table-material-employees',
  templateUrl: './table-material-employees.component.html',
  styleUrls: ['./table-material-employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableMaterialEmployeesComponent implements OnChanges, OnInit {
  @Input() rowData: IEmployeeRow[];
  @Input() columnDefs: string[];
  @Input() listType: string;
  @Input() isNoData: boolean;
  @Input() isSpinnerShown: boolean;
  @Input() isLoading: boolean;
  @Input() isPortalType: boolean;
  @Input() paginationConfig: IPaginationConfig;
  @Input() isPagination: boolean;
  @Input() totalPages: number;

  @Output() employeeClick = new EventEmitter<void>();
  @Output() sendPageNumber = new EventEmitter<number>();

  systemRoles: IUserRole[];
  rowDataEmployee: IEmployeeListRow[];

  @ViewChild('tbody') private tbody: ElementRef;

  constructor(private employeeService: EmployeeService, private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.employeeService.getUserRoles$()
      .pipe(
        take(1)
      ).subscribe((value) => {
        this.systemRoles = value;
        this.rowDataEmployee = this.getRowDataEmployee(this.rowData);
        this.changeDetectorRef.markForCheck();
      });
  }

  public ngOnChanges({ rowData }: SimpleChanges): void {
    if (!this.isLoading && this.tbody?.nativeElement) {
      this.tbody.nativeElement.scrollTop = 0;
    }

    if (rowData && rowData.currentValue && this.systemRoles) {
      this.rowDataEmployee = this.getRowDataEmployee(this.rowData);
    }
  }

  public onEmployeeClick():void {
    this.employeeClick.emit();
  }

  public onCheckOption(option: ISelectOption<string>, employee: IEmployeeListRow): void {
    of(option.checked).pipe(
      switchMap(checked =>
        iif(
          () => checked,
          this.employeeService.addUserRoles$(employee.externalId, option.label),
          this.employeeService.deleteUserRoles$(employee.externalId, option.label),
          )
      ),
      take(1)
    ).subscribe();
    this.updateRowDataEmployee(employee, option);
  }

  public onSendPageNumber(page: number): void {
    this.sendPageNumber.emit(page);
  }

  private getRowDataEmployee(employees: IEmployeeRow[]): IEmployeeListRow[] {
    return employees.map(employee => ({
      ...employee,
      userRolesOptions: this.getUserRolesOptions(employee),
    }));
  }

  private getUserRolesOptions(employee: IEmployeeRow): ISelectOption<string>[] {
    return this.systemRoles.map(({ text, value: id }) => ({
      label: id,
      value: text,
      checked: employee.userRoles.some(role => role === id),
      disabled: id === 'Employee',
    }));
  }

  private updateRowDataEmployee(employee: IEmployeeListRow, option: ISelectOption<string>): void {
    this.rowDataEmployee = this.rowDataEmployee.map((employeeRow) => {
      const sameEmployeeId = employeeRow.externalId === employee.externalId;

      if (sameEmployeeId) {
        const userRolesOptions = employeeRow.userRolesOptions.map((roleOption) => {
          const sameRoleOption = roleOption.value === option.value;

          return sameRoleOption
            ? { ...roleOption, checked: !roleOption.checked }
            : roleOption;
        });

        return { ...employeeRow, userRolesOptions };
      }

      return employeeRow;
    });
  }
}
