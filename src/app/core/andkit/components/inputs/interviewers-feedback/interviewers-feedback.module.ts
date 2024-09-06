import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewersFeedbackComponent } from './interviewers-feedback.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { FeedbackTextareaComponent } from './feedback-textarea/feedback-textarea.component';
import { MatInputModule } from '@angular/material/input';
import { HoverEventModule } from '@directives/hover-event/hover-event.module';
import { AssessmentMatrixIconModule } from '@andkit/components/other/assessment-matrix-icon/assessment-matrix-icon.module';
import { AssessmentTooltipModule } from '@andkit/components/other/assessment-tooltip/assessment-tooltip.module';

@NgModule({
  declarations: [InterviewersFeedbackComponent, FeedbackTextareaComponent],
  imports: [
    CommonModule,
    SafeHtmlModule,
    MatInputModule,
    AssessmentTooltipModule,
    AssessmentMatrixIconModule,
    HoverEventModule
  ],
  exports: [InterviewersFeedbackComponent]
})
export class InterviewersFeedbackModule { }
