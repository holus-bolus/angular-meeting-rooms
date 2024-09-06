import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateTitleDirective } from './truncate-title.directive';

@NgModule({
  declarations: [TruncateTitleDirective],
  imports: [
    CommonModule
  ],
  exports: [TruncateTitleDirective]
})
export class TruncateTitleModule { }
