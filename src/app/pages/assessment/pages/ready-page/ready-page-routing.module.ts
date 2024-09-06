import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadyPageComponent } from './ready-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ReadyPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadyPageRoutingModule { }
