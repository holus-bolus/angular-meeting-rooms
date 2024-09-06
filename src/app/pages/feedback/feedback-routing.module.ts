import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from '@pages/feedback/feedback.component';
import { FeedbackResolve } from '@resolvers/feedback.resolve';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    resolve: {
      data: FeedbackResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {
}
