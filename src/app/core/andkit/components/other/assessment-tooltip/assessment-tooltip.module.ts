import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentTooltipComponent } from './assessment-tooltip.component';
import { HoverEventModule } from '@directives/hover-event/hover-event.module';

@NgModule({
  declarations: [AssessmentTooltipComponent],
  imports: [
    CommonModule,
    HoverEventModule
  ],
  exports: [AssessmentTooltipComponent]
})
export class AssessmentTooltipModule { }
