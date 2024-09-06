import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrInterviewComponent } from './hr-interview.component';

const routes: Routes = [
  {
    path: '',
    component: HrInterviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrInterviewRoutingModule { }
