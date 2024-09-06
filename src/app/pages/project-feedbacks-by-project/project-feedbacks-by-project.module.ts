import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { AndkitModule } from '@andkit/andkit.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { FeedbackViewModule } from '@pages/employee/feedback-view/feedback-view.module';
import { ProjectFeedbacksByProjectComponent } from './project-feedbacks-by-project.component';
import { ProjectFeedbacksByProjectDetailComponent } from './project-feedbacks-by-project-detail/project-feedbacks-by-project-detail.component';
import { ProjectFeedbacksByProjectRoutingModule } from './project-feedbacks-by-project-routing.module';

@NgModule({
  declarations: [
    ProjectFeedbacksByProjectComponent,
    ProjectFeedbacksByProjectDetailComponent,
  ],
  imports: [
    AndkitModule,
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    ProjectFeedbacksByProjectRoutingModule,
    SafeHtmlModule,
    ReactiveFormsModule,
    FeedbackViewModule,
  ],
  entryComponents: [
    ProjectFeedbacksByProjectDetailComponent,
  ],
})
export class ProjectFeedbacksByProjectModule {
}
