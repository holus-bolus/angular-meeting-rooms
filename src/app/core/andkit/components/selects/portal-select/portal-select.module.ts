import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalSelectComponent } from './portal-select.component';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [PortalSelectComponent],
  imports: [
    CommonModule,
    OuterClickModule,
    SafeHtmlModule
  ],
  exports: [PortalSelectComponent]
})
export class PortalSelectModule { }
