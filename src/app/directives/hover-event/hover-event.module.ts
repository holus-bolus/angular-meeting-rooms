import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverEventDirective } from './hover-event.directive';

@NgModule({
  declarations: [HoverEventDirective],
  imports: [
    CommonModule
  ],
  exports: [HoverEventDirective]
})
export class HoverEventModule { }
