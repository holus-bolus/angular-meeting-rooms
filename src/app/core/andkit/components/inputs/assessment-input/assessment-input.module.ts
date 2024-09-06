import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentInputComponent } from './assessment-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [AssessmentInputComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    SafeHtmlModule
  ],
  exports: [AssessmentInputComponent]
})
export class AssessmentInputModule { }
