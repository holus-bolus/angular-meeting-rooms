import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page.component';
import { FooterModule } from '@andkit/components/other/footer/footer.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { ExternalHeaderModule } from '@andkit/components/other/external-header/external-header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    FooterModule,
    SafeHtmlModule,
    ExternalHeaderModule,
    RouterModule
  ],
  exports: [NotFoundPageComponent]
})
export class NotFoundPageModule { }
