import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragScrollDirective } from './drag-scroll.directive';

@NgModule({
  declarations: [DragScrollDirective],
  exports: [
    DragScrollDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DragScrollModule { }
