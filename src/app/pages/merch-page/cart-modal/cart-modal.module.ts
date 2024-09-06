import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModalComponent } from '@pages/merch-page/cart-modal/cart-modal.component';
import { AndkitModule } from '@andkit/andkit.module';
import { CartProductModule } from '@pages/merch-page/cart-product/cart-product.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [
    CartModalComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    CartProductModule,
    ReactiveFormsModule,
    SafeHtmlModule,
  ],
  exports: [
    CartModalComponent,
  ],
})
export class CartModalModule {}
