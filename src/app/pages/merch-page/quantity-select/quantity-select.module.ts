import { NgModule } from '@angular/core';
import { QuantitySelectComponent } from '@pages/merch-page/quantity-select/quantity-select.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    QuantitySelectComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    QuantitySelectComponent,
  ]
})
export class QuantitySelectModule {}
