import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndkitModule } from '@andkit/andkit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { FeedbackViewModule } from '../feedback-view/feedback-view.module';
import { FeedbackOnProjectViewRoutingModule } from './feedback-on-project-view-routing.module';
import { FeedbackOnProjectViewComponent } from './feedback-on-project-view.component';
import { FeedbackOnProjectGenerateComponent } from './feedback-on-project-generate/feedback-on-project-generate.component';
import { FeedbackOnProjectDetailComponent } from './feedback-on-project-detail/feedback-on-project-detail.component';

@NgModule({
  declarations: [
    FeedbackOnProjectViewComponent,
    FeedbackOnProjectGenerateComponent,
    FeedbackOnProjectDetailComponent,
  ],
  imports: [
    AndkitModule,
    CommonModule,
    FeedbackOnProjectViewRoutingModule,
    SafeHtmlModule,
    ReactiveFormsModule,
    FeedbackViewModule,
  ],
  entryComponents: [
    FeedbackOnProjectGenerateComponent,
    FeedbackOnProjectDetailComponent,
  ],
})
export class FeedbackOnProjectViewModule {
}
