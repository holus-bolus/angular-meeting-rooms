import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackViewComponent } from '@pages/employee/feedback-view/feedback-view.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackViewRoutingModule { }
