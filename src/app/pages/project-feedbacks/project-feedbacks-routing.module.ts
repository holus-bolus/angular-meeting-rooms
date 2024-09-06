import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectFeedbacksComponent } from './project-feedbacks.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectFeedbacksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectFeedbacksRoutingModule {
}
