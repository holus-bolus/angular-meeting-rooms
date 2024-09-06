import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndkitModule } from '@andkit/andkit.module';
import { ConfirmModalModule } from '@andkit/components/modals/confirm-modal/confirm-modal.module';

import { SalaryInvoiceComponent } from './salary-invoice.component';
import { SalaryInvoiceRoutingModule } from './salary-invoice.routing.module';


@NgModule({
  declarations: [
    SalaryInvoiceComponent,
  ],
  exports: [
    SalaryInvoiceComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    SalaryInvoiceRoutingModule,
    ConfirmModalModule,
  ],
})
export class SalaryInvoiceModule { }
