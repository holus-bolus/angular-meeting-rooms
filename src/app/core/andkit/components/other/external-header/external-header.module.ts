import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalHeaderComponent } from '@andkit/components/other/external-header/external-header.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [ExternalHeaderComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  exports: [ExternalHeaderComponent]
})
export class ExternalHeaderModule { }
