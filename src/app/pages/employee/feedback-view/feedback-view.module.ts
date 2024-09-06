import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackViewRoutingModule } from './feedback-view-routing.module';
import { FeedbackViewComponent } from './feedback-view.component';
import { AndkitModule } from '@andkit/andkit.module';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { FeedbackScalesModalComponent } from './feedback-detail/feedback-scales-modal/feedback-scales-modal.component';
import { FeedbackChartComponent } from './feedback-chart/feedback-chart.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { TextLengthModule } from '@pipes/text-length/text-length.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { AskForFeedbackComponent } from './ask-for-feedback/ask-for-feedback.component';
import { AutoCompleteModule } from '@andkit/components/selects/search-autocomplete/search-autocomplete.module';
import { FeedbackAutocompleteEmployeeSearchComponent }
from './feedback-autocomplete-employee-search/feedback-autocomplete-employee-search.component';
import { ConfirmModalComponent } from '@andkit/components/modals/confirm-modal/confirm-modal.component';
import { FeedbackRequestSuccessModalComponent } from './feedback-request-success-modal/feedback-request-success-modal.component';
import { FeedbackAutocompleteTeammatesSearchComponent }
from './feedback-autocomplete-teammates-search/feedback-autocomplete-teammates-search.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FeedbackViewComponent,
    FeedbackDetailComponent,
    FeedbackScalesModalComponent,
    FeedbackChartComponent,
    AskForFeedbackComponent,
    FeedbackAutocompleteEmployeeSearchComponent,
    FeedbackRequestSuccessModalComponent,
    FeedbackAutocompleteTeammatesSearchComponent,
  ],
  imports: [
    AndkitModule,
    CommonModule,
    FeedbackViewRoutingModule,
    SafeHtmlModule,
    TextLengthModule,
    MatSliderModule,
    MatProgressBarModule,
    AutoCompleteModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AskForFeedbackComponent,
    FeedbackRequestSuccessModalComponent,
    ConfirmModalComponent,
  ],
  providers: [
    HttpClientModule,
  ],
  exports: [
    FeedbackScalesModalComponent,
  ],
})
export class FeedbackViewModule {
}
