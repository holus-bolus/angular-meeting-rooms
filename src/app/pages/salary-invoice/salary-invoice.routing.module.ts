import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SalaryInvoiceComponent } from './salary-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryInvoiceRoutingModule {
}
