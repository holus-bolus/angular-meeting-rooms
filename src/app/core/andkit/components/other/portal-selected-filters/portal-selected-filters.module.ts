import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalSelectedFiltersComponent } from './portal-selected-filters/portal-selected-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompletePortalModule } from '@andkit/components/selects/autocomplete-portal/autocomplete-portal.module';
import { ChipModule } from '@andkit/components/other/chip/chip.module';
import { ChipsAutocompleteModule } from '@andkit/components/selects/chips-autocomplete/chips-autocomplete.module';
import { SlideTogglerModule } from '@andkit/components/other/slide-toggler/slide-toggler.module';
import { PortalInputModule } from '@andkit/components/inputs/portal-input/portal-input.module';

@NgModule({
  declarations: [PortalSelectedFiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlideTogglerModule,
    ChipModule,
    ChipsAutocompleteModule,
    AutocompletePortalModule,
    PortalInputModule
  ],
  exports: [PortalSelectedFiltersComponent]
})
export class PortalSelectedFiltersModule { }