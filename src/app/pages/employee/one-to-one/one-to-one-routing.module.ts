import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OneToOneMainComponent } from '@pages/employee/one-to-one/one-to-one-main.component';

const routes: Routes = [
  {
    path: '',
    component: OneToOneMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneToOneRoutingModule { }
