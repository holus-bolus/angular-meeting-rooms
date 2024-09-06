import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedPageComponent } from './approved-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ApprovedPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovedPageRoutingModule { }
