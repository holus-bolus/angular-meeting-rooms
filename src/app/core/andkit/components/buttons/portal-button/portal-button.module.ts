import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalButtonComponent } from './portal-button.component';

@NgModule({
  declarations: [PortalButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [PortalButtonComponent]
})
export class PortalButtonModule { }
