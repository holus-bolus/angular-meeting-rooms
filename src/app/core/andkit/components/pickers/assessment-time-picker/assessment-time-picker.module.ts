import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentTimePickerComponent } from './assessment-time-picker.component';
import { HoverEventModule } from '@directives/hover-event/hover-event.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [AssessmentTimePickerComponent],
  imports: [
    CommonModule,
    HoverEventModule,
    SafeHtmlModule
  ],
  exports: [AssessmentTimePickerComponent]
})
export class AssessmentTimePickerModule { }
