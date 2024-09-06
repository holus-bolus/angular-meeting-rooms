import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate.component';
import { RouterModule } from '@angular/router';
import { LinkModule } from '@pipes/link/link.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [CandidateComponent],
  imports: [
    AndkitModule,
    CommonModule,
    RouterModule,
    LinkModule,
    SafeHtmlModule,
  ],
  exports: [CandidateComponent]
})
export class CandidateModule {
}
