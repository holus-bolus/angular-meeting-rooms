import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterExternalComponent } from '@andkit/components/other/footer-external/footer-external.component';
import { IconModule } from '@andkit/components/other/icon/icon.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [FooterExternalComponent],
  imports: [
    CommonModule,
    IconModule,
    SafeHtmlModule
  ],
  exports: [FooterExternalComponent]
})
export class FooterExternalModule { }
