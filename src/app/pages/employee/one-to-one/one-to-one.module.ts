import { SelectControlModule } from '@andkit/components/select-control/select-control.module';
import { DateTimePickerModule } from '@andkit/components/date-time-picker/date-time-picker.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneToOneRoutingModule } from './one-to-one-routing.module';
import { OneToOneMainComponent } from './one-to-one-main.component';
import { OneToOneInstructionModalComponent } from './one-to-one-instruction-modal/one-to-one-instruction-modal.component';
import { OneToOneListComponent } from './one-to-one-list/one-to-one-list.component';
import { OneToOneRowComponent } from './one-to-one-list/one-to-one-row/one-to-one-row.component';
import { OneToOneViewModalComponent } from './one-to-one-view-modal/one-to-one-view-modal.component';
import { OneToOneModalComponent } from './one-to-one-modal/one-to-one-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AndkitModule } from '@andkit/andkit.module';
import { OneToOneService } from '@services/one-to-one.service';
import { OneToOneConfirmModalComponent } from './one-to-one-confirm-modal/one-to-one-confirm-modal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AndkitInputModule } from '@andkit/components/other/andkit-input-select/andkit-input.module';
import { OneToOneNotFoundComponent } from './one-to-one-not-found/one-to-one-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePickerModule } from '@andkit/components/pickers/time-picker/time-picker.module';

@NgModule({
  declarations: [
    OneToOneMainComponent,
    OneToOneInstructionModalComponent,
    OneToOneListComponent,
    OneToOneRowComponent,
    OneToOneViewModalComponent,
    OneToOneModalComponent,
    OneToOneConfirmModalComponent,
    OneToOneNotFoundComponent,
  ],
  imports: [
    CommonModule,
    OneToOneRoutingModule,
    MatDialogModule,
    MatButtonModule,
    SafeHtmlModule,
    AndkitModule,
    MatAutocompleteModule,
    AndkitInputModule,
    FormsModule,
    ReactiveFormsModule,
    TimePickerModule,
    DateTimePickerModule,
    SelectControlModule
  ],
  providers: [
    OneToOneService
  ]
})
export class OneToOneModule { }
