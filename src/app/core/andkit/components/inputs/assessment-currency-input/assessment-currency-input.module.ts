import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentCurrencyInputComponent } from './assessment-currency-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencySelectComponent } from './currency-select/currency-select.component';
import { PortalSelectModule } from '@andkit/components/selects/portal-select/portal-select.module';
import { AssessmentInputModule } from '@andkit/components/inputs/assessment-input/assessment-input.module';

@NgModule({
  declarations: [AssessmentCurrencyInputComponent, CurrencySelectComponent],
  imports: [
    CommonModule,
    AssessmentInputModule,
    FormsModule,
    ReactiveFormsModule,
    PortalSelectModule
  ],
  exports: [AssessmentCurrencyInputComponent]
})
export class AssessmentCurrencyInputModule { }
