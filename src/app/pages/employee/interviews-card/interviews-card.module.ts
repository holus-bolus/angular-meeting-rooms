import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewsCardComponent } from './interviews-card.component';
import { InterviewCardRoutingModule } from './interview-card.routing.module';
import { InterviewsListComponent } from './interviews-list/interviews-list.component';
import { InterviewComponent } from './interview/interview.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from '@andkit/components/other/progress-spinner/progress-spinner.module';
import {PortalButtonModule} from '@andkit/components/buttons/portal-button/portal-button.module';
import {SafeHtmlModule} from '@pipes/safe-html/safe-html.module';
import {MatrixModalModule} from '@pages/employee/matrix-modal/matrix-modal.module';
import {AssessmentTooltipModule} from '@andkit/components/other/assessment-tooltip/assessment-tooltip.module';
import {IconModule} from '@andkit/components/other/icon/icon.module';
import {LinkModule} from '@pipes/link/link.module';
import {MaxRowsModule} from '@pipes/max-rows/max-rows.module';
import {CardModule} from '@andkit/components/other/card/card.module';
import {TimezoneModule} from '@pipes/timezone/timezone.module';
import {SlideTogglerModule} from '@andkit/components/other/slide-toggler/slide-toggler.module';
import {NoDataModule} from '@andkit/components/other/no-data/no-data.module';
import {InterviewersFeedbackModule} from '@andkit/components/inputs/interviewers-feedback/interviewers-feedback.module';
import { MultiplyEndOfWordPipeModule } from '@pipes/multiple-line-end/multiple-line-end.module';

@NgModule({
  declarations: [InterviewsCardComponent, InterviewsListComponent, InterviewComponent],
  imports: [
    CommonModule,
    InterviewCardRoutingModule,
    SafeHtmlModule,
    SlideTogglerModule,
    MatrixModalModule,
    NoDataModule,
    AssessmentTooltipModule,
    IconModule,
    InterviewersFeedbackModule,
    MaxRowsModule,
    ReactiveFormsModule,
    PortalButtonModule,
    CardModule,
    TimezoneModule,
    LinkModule,
    ProgressSpinnerModule,
    MultiplyEndOfWordPipeModule
  ],
  exports: [InterviewsCardComponent]
})
export class InterviewsCardModule { }
