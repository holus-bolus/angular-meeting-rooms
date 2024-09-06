import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalSelectModule } from '@andkit/components/selects/portal-select/portal-select.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { LinkModule } from '@pipes/link/link.module';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    PortalSelectModule,
    SafeHtmlModule,
    LinkModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule { }
