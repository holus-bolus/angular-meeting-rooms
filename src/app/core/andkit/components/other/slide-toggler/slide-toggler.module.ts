import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SlideTogglerComponent } from './slide-toggler.component';

@NgModule({
  declarations: [SlideTogglerComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
  ],
  exports: [SlideTogglerComponent]
})
export class SlideTogglerModule { }
