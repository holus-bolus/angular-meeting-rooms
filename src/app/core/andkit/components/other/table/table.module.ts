import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { ChipsAutocompleteModule } from '@andkit/components/selects/chips-autocomplete/chips-autocomplete.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MenuModule } from '@andkit/components/other/menu/menu.module';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoDataModule } from '@andkit/components/other/no-data/no-data.module';
import { PaginationModule } from '@andkit/components/other/pagination/pagination.module';
import { PortalInputFieldModule } from '@andkit/components/other/portal-input-field/portal-input-field.module';
import { PortalInputModule } from '@andkit/components/inputs/portal-input/portal-input.module';
import { PortalMultiselectModule } from '@andkit/components/selects/portal-multiselect/portal-multiselect.module';
import { PortalSelectModule } from '@andkit/components/selects/portal-select/portal-select.module';
import { ProgressSpinnerModule } from '@andkit/components/other/progress-spinner/progress-spinner.module';
import { RouterModule } from '@angular/router';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TableComponent } from './table.component';
import { TableMaterialEmployeesComponent } from './table-material-employees/table-material-employees.component';
import { TableMaterialEmployeesProjectComponent } from './table-material-employees-project/table-material-employees-project.component';
import { TableMaterialProjectsComponent } from './table-material-projects/table-material-projects.component';

@NgModule({
  imports: [
    ButtonModule,
    ChipsAutocompleteModule,
    CommonModule,
    MatTableModule,
    MenuModule,
    NgxPaginationModule,
    NoDataModule,
    PaginationModule,
    PortalInputFieldModule,
    PortalInputModule,
    PortalMultiselectModule,
    PortalSelectModule,
    ProgressSpinnerModule,
    RouterModule,
    SafeHtmlModule,
  ],
  exports: [TableComponent],
  declarations: [
    TableComponent,
    TableMaterialEmployeesComponent,
    TableMaterialEmployeesProjectComponent,
    TableMaterialProjectsComponent,
  ]
})
export class TableModule { }
