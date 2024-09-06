import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectFeedbackResolve } from '@resolvers/project-feedback.resolve';
import { ProjectFeedbacksByProjectResolve } from '@resolvers/project-feedbacks.resolve-by-project';
import { ProjectFeedbacksByProjectComponent } from './project-feedbacks-by-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectFeedbacksByProjectComponent,
    resolve: {
      project: ProjectFeedbackResolve,
      data: ProjectFeedbacksByProjectResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectFeedbacksByProjectRoutingModule { }
