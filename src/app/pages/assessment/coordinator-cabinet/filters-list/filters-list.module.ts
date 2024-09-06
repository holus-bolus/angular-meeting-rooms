import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersListComponent } from './filters-list.component';
import { ButtonModule } from '../../../../core/andkit/components/buttons/button/button.module';
import {
  AssessmentAutocompleteModule
} from '../../../../core/andkit/components/selects/assessment-autocomplete/assessment-autocomplete.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OuterClickModule } from '../../../../directives/outer-click/outer-click.module';

@NgModule({
  declarations: [FiltersListComponent],
  imports: [
    CommonModule,
    ButtonModule,
    AssessmentAutocompleteModule,
    ReactiveFormsModule,
    OuterClickModule
  ],
  exports: [FiltersListComponent]
})
export class FiltersListModule { }
