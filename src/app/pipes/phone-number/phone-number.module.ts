import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberPipe } from './phone-number.pipe';



@NgModule({
  declarations: [
    PhoneNumberPipe
  ],
  exports: [
    PhoneNumberPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PhoneNumberModule { }
