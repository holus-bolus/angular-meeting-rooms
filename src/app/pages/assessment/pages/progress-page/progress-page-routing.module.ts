import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressPageComponent } from './progress-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProgressPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressPageRoutingModule { }
