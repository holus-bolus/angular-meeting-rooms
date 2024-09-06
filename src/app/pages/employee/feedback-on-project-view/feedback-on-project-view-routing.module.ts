import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackOnProjectViewComponent } from '@pages/employee/feedback-on-project-view/feedback-on-project-view.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackOnProjectViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackOnProjectViewRoutingModule { }
