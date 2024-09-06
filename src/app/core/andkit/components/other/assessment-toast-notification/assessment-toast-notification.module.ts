import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentToastNotificationComponent } from './assessment-toast-notification.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [AssessmentToastNotificationComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  exports: [AssessmentToastNotificationComponent]
})
export class AssessmentToastNotificationModule { }
