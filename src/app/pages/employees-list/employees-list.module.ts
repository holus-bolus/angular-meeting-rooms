import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesListRoutingModule } from './employees-list.routing.module';
import { EmployeesListTableComponent } from './employees-list-table/employees-list-table.component';
import { EmployeesListFilterComponent } from './employees-list-filter/employees-list-filter.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AndkitModule } from '@andkit/andkit.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AndkitModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeesListRoutingModule,
    SafeHtmlModule,
  ],
  declarations: [EmployeesListComponent, EmployeesListTableComponent, EmployeesListFilterComponent]
})
export class EmployeesListModule {
}
