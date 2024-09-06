import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlannedVacationsMainComponent } from '@pages/employee/planned-vacations/planned-vacations-main.component';
import { PendingChangesGuard } from '@guards/pending-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: PlannedVacationsMainComponent,
    canDeactivate: [PendingChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannedVacationsRoutingModule { }
