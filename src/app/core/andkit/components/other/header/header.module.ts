import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { PortalHeaderModule } from '@andkit/components/other/portal-header/portal-header.module';

@NgModule({
  imports: [
    CommonModule,
    PortalHeaderModule,
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
