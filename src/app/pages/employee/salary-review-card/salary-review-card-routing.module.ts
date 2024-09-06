import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaryReviewCardComponent } from './salary-review-card.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryReviewCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryReviewCardRoutingModule { }
