import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [TimePickerComponent],
  imports: [
    CommonModule,
    AmazingTimePickerModule
  ],
  exports: [TimePickerComponent],
})
export class TimePickerModule { }
