import { NgModule } from '@angular/core';
import { CartProductComponent } from '@pages/merch-page/cart-product/cart-product.component';
import { CommonModule } from '@angular/common';
import { AndkitModule } from '@andkit/andkit.module';
import { ColorSelectModule } from '@pages/merch-page/color-select/color-select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectControlModule } from '@andkit/components/select-control/select-control.module';
import { QuantitySelectModule } from '@pages/merch-page/quantity-select/quantity-select.module';

@NgModule({
  declarations: [
    CartProductComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    ColorSelectModule,
    ReactiveFormsModule,
    SelectControlModule,
    QuantitySelectModule,
  ],
  exports: [
    CartProductComponent,
  ],
})
export class CartProductModule {
}
