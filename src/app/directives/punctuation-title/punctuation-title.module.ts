import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PunctuationTitleDirective } from './punctuation-title.directive';

@NgModule({
  declarations: [PunctuationTitleDirective],
  imports: [
    CommonModule
  ],
  exports: [PunctuationTitleDirective],
})
export class PunctuationTitleModule { }

