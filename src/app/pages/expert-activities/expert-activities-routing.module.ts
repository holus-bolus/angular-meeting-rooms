import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpertActivitiesComponent } from '@pages/expert-activities/expert-activities.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertActivitiesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertActivitiesRoutingModule { }
