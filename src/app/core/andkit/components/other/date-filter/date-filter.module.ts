import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFilterComponent } from './date-filter.component';

@NgModule({
  declarations: [DateFilterComponent],
  imports: [
    CommonModule
  ],
  exports: [DateFilterComponent]
})
export class DateFilterModule { }
