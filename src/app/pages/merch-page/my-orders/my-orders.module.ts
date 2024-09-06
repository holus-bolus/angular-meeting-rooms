import { NgModule } from '@angular/core';
import { MyOrdersComponent } from '@pages/merch-page/my-orders/my-orders.component';
import { CommonModule } from '@angular/common';
import { AndkitModule } from '@andkit/andkit.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [
    MyOrdersComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    MatTableModule,
    MatIconModule,
    SafeHtmlModule,
  ],
  exports: [
    MyOrdersComponent,
  ],
})
export class MyOrdersModule {}
