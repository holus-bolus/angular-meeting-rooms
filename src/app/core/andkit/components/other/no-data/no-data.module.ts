import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './no-data.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [
    NoDataComponent
  ],
  imports: [
    CommonModule,
    SafeHtmlModule,
  ],
  exports: [
    NoDataComponent
  ]
})
export class NoDataModule { }
