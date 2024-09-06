import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OvertimeComponent } from './overtime.component';

const routes: Routes = [
  {
    path: '',
    component: OvertimeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvertimeRoutingModule {
}
