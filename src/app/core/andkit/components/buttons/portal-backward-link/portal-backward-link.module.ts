import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalBackwardLinkComponent } from './portal-backward-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PortalBackwardLinkComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [PortalBackwardLinkComponent]
})
export class PortalBackwardLinkModule { }
