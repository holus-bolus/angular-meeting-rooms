import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackOnProjectComponent } from '@pages/feedback-on-project/feedback-on-project.component';
import { ProjectFeedbackResolve } from '@resolvers/project-feedback.resolve';

const routes: Routes = [
  {
    path: '',
    resolve: {
      project: ProjectFeedbackResolve,
    },
    component: FeedbackOnProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackOnProjectRoutingModule {
}
