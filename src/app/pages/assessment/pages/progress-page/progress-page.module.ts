import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressPageComponent } from './progress-page.component';
import { ProgressPageRoutingModule } from '@pages/assessment/pages/progress-page/progress-page-routing.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { FormComponentsModule } from '@pages/assessment/form-components/form-components.module';
import { AssessmentsModule } from '@pages/assessment/form-blocks/assessments/assessments.module';
import { CandidateCommonInfoModule } from '@pages/assessment/coordinator-cabinet/candidate-common-info/candidate-common-info.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguagesModule } from '@pages/assessment/form-blocks/languages/languages.module';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [ProgressPageComponent],
  imports: [
    AndkitModule,
    AssessmentsModule,
    CandidateCommonInfoModule,
    CommonModule,
    FormComponentsModule,
    LanguagesModule,
    ProgressPageRoutingModule,
    ReactiveFormsModule,
    SafeHtmlModule,
  ],
  exports: [ProgressPageComponent]
})
export class ProgressPageModule {
}
