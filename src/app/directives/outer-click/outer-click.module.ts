import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OuterClickDirective } from './outer-click.directive';

@NgModule({
  declarations: [OuterClickDirective],
  imports: [
    CommonModule
  ],
  exports: [OuterClickDirective],
})
export class OuterClickModule { }
