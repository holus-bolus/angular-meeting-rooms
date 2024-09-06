import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalInputFileComponent } from './portal-input-file.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [PortalInputFileComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  exports: [PortalInputFileComponent]
})
export class PortalInputFileModule { }
