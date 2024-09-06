import { NgModule } from '@angular/core';
import {
  SubmittedOvertimesSearchComponent,
} from '@pages/overs-test/submitted-overtimes-search/submitted-overtimes-search.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AndkitModule } from '@andkit/andkit.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePickerModule } from '@andkit/components/pickers/date-picker/date-picker.module';

@NgModule({
  declarations: [
    SubmittedOvertimesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AndkitModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    DatePickerModule,
  ],
  exports: [
    SubmittedOvertimesSearchComponent,
  ],
})
export class SubmittedOvertimesSearchModule {
}
