import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndkitModule } from '@andkit/andkit.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatRadioModule } from '@angular/material/radio';
import { PortalModule } from '@angular/cdk/portal';
import { ProjectFeedbacksRoutingModule } from './project-feedbacks-routing.module';
import { ProjectFeedbacksComponent } from './project-feedbacks.component';
import { ProjectFeedbackStatusFilterComponent } from './project-feedback-status-filter/project-feedback-status-filter.component';
import { ProjectFeedbackProjectFilterComponent } from './project-feedback-project-filter/project-feedback-project-filter.component';
import { ProjectFeedbackManagerFilterComponent } from './project-feedback-manager-filter/project-feedback-manager-filter.component';

@NgModule({
  declarations: [
    ProjectFeedbacksComponent,
    ProjectFeedbackStatusFilterComponent,
    ProjectFeedbackProjectFilterComponent,
    ProjectFeedbackManagerFilterComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    ProjectFeedbacksRoutingModule,
    SafeHtmlModule,
    MatTableModule,
    MatCheckboxModule,
    OverlayModule,
    PortalModule,
    MatRadioModule,
  ],
  entryComponents: [
    ProjectFeedbackStatusFilterComponent,
    ProjectFeedbackProjectFilterComponent,
    ProjectFeedbackManagerFilterComponent,
  ],
})
export class ProjectFeedbacksModule { }
