import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { FormsModule } from '@angular/forms';
import { DatesPeriodPickerComponent } from './dates-period-picker.component';

@NgModule({
  declarations: [DatesPeriodPickerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    SafeHtmlModule,
    FormsModule,
  ],
  exports: [DatesPeriodPickerComponent],
})
export class DatesPeriodPickerModule { }
