import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentMatrixIconComponent } from './assessment-matrix-icon.component';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [AssessmentMatrixIconComponent],
  imports: [
    CommonModule,
    SafeHtmlModule
  ],
  exports: [AssessmentMatrixIconComponent]
})
export class AssessmentMatrixIconModule { }
