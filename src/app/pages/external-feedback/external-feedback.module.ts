import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalFeedbackComponent } from '@pages/external-feedback/external-feedback.component';
import { FeedbackModule } from '@pages/feedback/feedback.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AndkitModule } from '@andkit/andkit.module';
import { FooterExternalModule } from '@andkit/components/other/footer-external/footer-external.module';
import { ExternalHeaderModule } from '@andkit/components/other/external-header/external-header.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ProgressSpinnerModule } from '@andkit/components/other/progress-spinner/progress-spinner.module';
import { ExternalFeedbackInfoModalComponent } from './external-feedback-info-modal/external-feedback-info-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ExternalFeedbackComponent, ExternalFeedbackInfoModalComponent],
  imports: [
    CommonModule,
    FeedbackModule,
    MatTabsModule,
    MatDialogModule,
    AndkitModule,
    FooterExternalModule,
    ExternalHeaderModule,
    SafeHtmlModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  exports: [ExternalFeedbackComponent],
})
export class ExternalFeedbackModule { }
