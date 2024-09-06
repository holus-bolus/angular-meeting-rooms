import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewsCardComponent } from './interviews-card.component';

const routes: Routes = [
  {
    path: '',
    component: InterviewsCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewCardRoutingModule {}
