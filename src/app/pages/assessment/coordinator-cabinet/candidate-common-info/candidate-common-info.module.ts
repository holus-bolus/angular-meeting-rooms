import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateCommonInfoComponent } from './candidate-common-info.component';
import { RouterModule } from '@angular/router';
import { CancelModalModule } from '@pages/assessment/coordinator-cabinet/cancel-modal/cancel-modal.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { CandidateModule } from '@pages/assessment/coordinator-cabinet/candidate/candidate.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [CandidateCommonInfoComponent],
  imports: [
    AndkitModule,
    CommonModule,
    CandidateModule,
    CancelModalModule,
    SafeHtmlModule,
    RouterModule
  ],
  exports: [CandidateCommonInfoComponent]
})
export class CandidateCommonInfoModule {
}
