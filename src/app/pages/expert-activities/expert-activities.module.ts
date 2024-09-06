import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertActivitiesRoutingModule } from './expert-activities-routing.module';
import { ExpertActivitiesComponent } from './expert-activities.component';
import { FooterModule } from '@andkit/components/other/footer/footer.module';
import { ExpertActivitiesFilterComponent } from './expert-activities-filter/expert-activities-filter.component';
import { ExpertActivitiesTableComponent } from './expert-activities-table/expert-activities-table.component';
import { ExpertActivitiesModalComponent } from './expert-activities-modal/expert-activities-modal.component';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MatTableModule } from '@angular/material/table';
import { SelectModule } from '@andkit/components/selects/select/select.module';
import { ChipsAutocompleteModule } from '@andkit/components/selects/chips-autocomplete/chips-autocomplete.module';
import { ExpertActivitiesService } from '@services/expert-activities.service';
import { AutoCompleteModule } from '@andkit/components/selects/autocomplete/autocomplete.module';
import { PaginationModule } from '@andkit/components/other/pagination/pagination.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';
import { AndkitModule } from '@andkit/andkit.module';
import { ProgressSpinnerModule } from '@andkit/components/other/progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [
    ExpertActivitiesComponent,
    ExpertActivitiesFilterComponent,
    ExpertActivitiesTableComponent,
    ExpertActivitiesModalComponent
  ],
  imports: [
    CommonModule,
    ExpertActivitiesRoutingModule,
    FooterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    SafeHtmlModule,
    MatTableModule,
    SelectModule,
    ChipsAutocompleteModule,
    AutoCompleteModule,
    PaginationModule,
    ModalModule,
    MatDialogModule,
    AndkitModule,
    ProgressSpinnerModule,
  ],
  entryComponents: [ExpertActivitiesModalComponent],
  providers: [
    ExpertActivitiesService
  ]
})
export class ExpertActivitiesModule { }
