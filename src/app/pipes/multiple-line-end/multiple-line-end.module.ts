import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MultiplyEndOfWordPipe } from './multiple-line-end.pipe';

@NgModule({
  declarations: [MultiplyEndOfWordPipe],
  imports: [
    CommonModule
  ],
  exports: [MultiplyEndOfWordPipe],
})
export class MultiplyEndOfWordPipeModule {}
