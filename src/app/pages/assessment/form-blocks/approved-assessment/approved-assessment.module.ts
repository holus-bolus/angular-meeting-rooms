import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovedAssessmentComponent } from './approved-assessment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { AndkitModule } from '@andkit/andkit.module';
import { ProgressSpinnerModule } from '@andkit/components/other/progress-spinner/progress-spinner.module';

@NgModule({
  declarations: [ApprovedAssessmentComponent],
  imports: [
    AndkitModule,
    CommonModule,
    ReactiveFormsModule,
    OuterClickModule,
    ProgressSpinnerModule
  ],
  exports: [ApprovedAssessmentComponent]
})
export class ApprovedAssessmentModule {
}
