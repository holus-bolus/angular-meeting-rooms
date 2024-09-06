import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndkitLabelComponent } from './label.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AndkitLabelComponent,
  ],
  declarations: [AndkitLabelComponent]
})
export class LabelModule { }
