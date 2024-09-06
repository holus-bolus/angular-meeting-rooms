import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from '@andkit/components/other/progress-spinner/progress-spinner.module';
import { AndkitModule } from '@andkit/andkit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalModule } from '@andkit/components/modals/modal/modal.module';
import { ButtonModule } from '@andkit/components/buttons/button/button.module';
import { MatRadioModule } from '@angular/material/radio';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FeedbackInstructionModalComponent } from './feedback-instruction-modal/feedback-instruction-modal.component';
import { FeedbackSkillComponent } from './feedback-skill/feedback-skill.component';
import { FeedbackOpinionComponent } from './feedback-opinion/feedback-opinion.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { FeedbackCancelModalComponent } from './feedback-cancel-modal/feedback-cancel-modal.component';

@NgModule({
  declarations: [
    FeedbackComponent,
    FeedbackInstructionModalComponent,
    FeedbackOpinionComponent,
    FeedbackSkillComponent,
    FeedbackCancelModalComponent,
    FeedbackModalComponent,
  ],
  imports: [
    AndkitModule,
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    SafeHtmlModule,
    ModalModule,
    ButtonModule,
    MatRadioModule,
    ProgressSpinnerModule,
    MatTooltipModule,
  ],
  exports: [
    FeedbackSkillComponent,
    FeedbackOpinionComponent,
    FeedbackCancelModalComponent,
  ],
  entryComponents: [FeedbackInstructionModalComponent],

})
export class FeedbackModule { }
