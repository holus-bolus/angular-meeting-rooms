import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { BackwardLinkComponent } from '@andkit/components/buttons/backward-link/backward-link.component';

@NgModule({
  imports: [
    CommonModule,
    SafeHtmlModule,
    RouterModule
  ],
  exports: [
    BackwardLinkComponent
  ],
  declarations: [BackwardLinkComponent]
})
export class BackwardLinkModule { }
