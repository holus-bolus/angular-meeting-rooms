import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OversComponent } from '@pages/overs-test/overs.component';

const routes: Routes = [
  {
    path: '',
    component: OversComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class OversRoutingModule {
}
