import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from '@andkit/components/other/progress-spinner/progress-spinner.module';
import { AndkitModule } from '@andkit/andkit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { FeedbackModule } from '@pages/feedback/feedback.module';
import { FeedbackOnProjectRoutingModule } from './feedback-on-project-routing.module';
import { FeedbackOnProjectComponent } from './feedback-on-project.component';

@NgModule({
  declarations: [
    FeedbackOnProjectComponent,
  ],
  imports: [
    AndkitModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    SafeHtmlModule,
    ModalModule,
    ButtonModule,
    ProgressSpinnerModule,
    FeedbackOnProjectRoutingModule,
    FeedbackModule,
  ],
})
export class FeedbackOnProjectModule { }
