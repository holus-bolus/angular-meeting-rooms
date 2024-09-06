import { NgModule } from '@angular/core';
import { CustomDatePipe } from './custom-date.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [CustomDatePipe],
  exports: [CustomDatePipe],
  providers: [DatePipe],
})
export class CustomDatePipeModule {}
