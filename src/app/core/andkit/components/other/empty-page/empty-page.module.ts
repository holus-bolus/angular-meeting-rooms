import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyPageComponent } from './empty-page.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [EmptyPageComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  exports: [
    EmptyPageComponent
  ]
})
export class EmptyPageModule { }
