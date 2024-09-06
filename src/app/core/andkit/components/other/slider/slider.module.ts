import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideItemDirective } from './slide-item.directive';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [SliderComponent, SlideItemDirective],
  imports: [
    CommonModule,
    FormsModule,
    SafeHtmlModule,
    ReactiveFormsModule
  ],
  exports: [SliderComponent, SlideItemDirective]
})
export class SliderModule { }
