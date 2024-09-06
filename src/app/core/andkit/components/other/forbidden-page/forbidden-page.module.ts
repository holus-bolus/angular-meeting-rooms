import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenPageComponent } from './forbidden-page.component';
import { FooterModule } from '@andkit/components/other/footer/footer.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ExternalHeaderModule } from '@andkit/components/other/external-header/external-header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ForbiddenPageComponent],
  imports: [
    CommonModule,
    FooterModule,
    SafeHtmlModule,
    ExternalHeaderModule,
    RouterModule
  ],
  exports: [ForbiddenPageComponent],
})
export class ForbiddenPageModule { }
