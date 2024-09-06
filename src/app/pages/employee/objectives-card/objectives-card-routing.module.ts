import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectivesCardComponent } from './objectives-card.component';

const routes: Routes = [
  {
    path: '',
    component: ObjectivesCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectivesCardRoutingModule { }
