import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchPageComponent } from '@pages/merch-page/merch-page.component';
import { MerchRoutingModule } from '@pages/merch-page/merch-routing.module';
import { MerchModule } from '@pages/merch-page/merch/merch.module';
import { MyOrdersModule } from '@pages/merch-page/my-orders/my-orders.module';

@NgModule({
  declarations: [
    MerchPageComponent,
  ],
  imports: [
    CommonModule,
    MerchRoutingModule,
    MerchModule,
    MyOrdersModule,
  ],
  exports: [

  ],
})
export class MerchPageModule {
}
