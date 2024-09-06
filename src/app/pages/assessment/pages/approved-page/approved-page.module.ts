import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovedPageComponent } from './approved-page.component';
import { ApprovedAssessmentModule } from '@pages/assessment/form-blocks/approved-assessment/approved-assessment.module';
import { TimezoneModule } from '@pipes/timezone/timezone.module';
import { FormComponentsModule } from '@pages/assessment/form-components/form-components.module';
import { ApprovedPageRoutingModule } from '@pages/assessment/pages/approved-page/approved-page-routing.module';
import { CandidateCommonInfoModule } from '@pages/assessment/coordinator-cabinet/candidate-common-info/candidate-common-info.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AndkitModule } from '@andkit/andkit.module';

@NgModule({
  declarations: [ApprovedPageComponent],
  imports: [
    AndkitModule,
    CommonModule,
    CandidateCommonInfoModule,
    ReactiveFormsModule,
    ApprovedAssessmentModule,
    FormComponentsModule,
    ApprovedPageRoutingModule,
    TimezoneModule
  ],
  exports: [ApprovedPageComponent]
})
export class ApprovedPageModule {
}
