import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlifyPipe } from './urlify.pipe';

@NgModule({
  declarations: [UrlifyPipe],
  exports: [
    UrlifyPipe
  ],
  imports: [
    CommonModule
  ]
})
export class UrlifyPipeModule { }
