import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordinatesMainComponent } from '@pages/employee/coordinates/coordinates-main.component';

const routes: Routes = [
  {
    path: '',
    component: CoordinatesMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatesRoutingModule { }
