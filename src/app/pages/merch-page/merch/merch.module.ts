import { NgModule } from '@angular/core';
import { MerchComponent } from '@pages/merch-page/merch/merch.component';
import { AndkitModule } from '@andkit/andkit.module';
import { CommonModule } from '@angular/common';
import { CartModalModule } from '@pages/merch-page/cart-modal/cart-modal.module';
import { ColorSelectModule } from '@pages/merch-page/color-select/color-select.module';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MerchComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    CartModalModule,
    ColorSelectModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
  ],
})
export class MerchModule {
}
