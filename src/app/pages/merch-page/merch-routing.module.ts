import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchComponent } from '@pages/merch-page/merch/merch.component';
import { MyOrdersComponent } from '@pages/merch-page/my-orders/my-orders.component';
import { MerchPageComponent } from '@pages/merch-page/merch-page.component';

const routes: Routes = [
  {
    path: '',
    component: MerchPageComponent,
    pathMatch: 'full',
    redirectTo: 'catalog',
  },
  {
    path: 'catalog',
    component: MerchComponent,
  },
  {
    path: 'orders',
    component: MyOrdersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchRoutingModule {
}
