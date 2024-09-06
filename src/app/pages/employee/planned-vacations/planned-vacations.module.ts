import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannedVacationsRoutingModule } from './planned-vacations-routing.module';
import { PlannedVacationsMainComponent } from './planned-vacations-main.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AndkitModule } from '@andkit/andkit.module';
import { PlannedVacationsService } from '@services/planned-vacations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MainMenuModule } from '@pages/main/main-menu/main-menu.module';
import { MatTableModule } from '@angular/material/table';
import { AndkitInputModule } from '@andkit/components/other/andkit-input-select/andkit-input.module';
import { AutoCompleteModule } from '@andkit/components/selects/search-autocomplete/search-autocomplete.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeVacationsListComponent } from './employee-vacations-list/employee-vacations-list.component';
import { MultiplyEndOfWordPipeModule } from '@pipes/multiple-line-end/multiple-line-end.module';
import { PendingChangesGuard } from '@guards/pending-changes.guard';

@NgModule({
    declarations: [
        PlannedVacationsMainComponent,
        EmployeeVacationsListComponent
    ],
    imports: [
        CommonModule,
        PlannedVacationsRoutingModule,
        SafeHtmlModule,
        AndkitModule,
        ReactiveFormsModule,
        MainMenuModule,
        MatTableModule,
        AndkitInputModule,
        AutoCompleteModule,
        MatDialogModule,
        MatButtonModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MultiplyEndOfWordPipeModule
    ],
    providers: [
        PendingChangesGuard,
        PlannedVacationsService
    ],
    entryComponents: [
        ConfirmModalComponent
    ]
})
export class VacationsModule { }
