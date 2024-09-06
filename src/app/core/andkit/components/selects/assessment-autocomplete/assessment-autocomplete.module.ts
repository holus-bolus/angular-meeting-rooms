import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentAutocompleteComponent } from './assessment-autocomplete/assessment-autocomplete.component';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [AssessmentAutocompleteComponent],
  imports: [
    CommonModule,
    OuterClickModule,
    FormsModule,
    ReactiveFormsModule,
    SafeHtmlModule
  ],
  exports: [AssessmentAutocompleteComponent]
})
export class AssessmentAutocompleteModule { }
