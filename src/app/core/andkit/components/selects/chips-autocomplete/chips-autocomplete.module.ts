import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsAutocompleteComponent } from './chips-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SearchListModule } from '@andkit/components/other/search-list/search-list.module';
import { ChipModule } from '@andkit/components/other/chip/chip.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [ChipsAutocompleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ChipModule,
    SearchListModule,
    SafeHtmlModule,
  ],
  exports: [ChipsAutocompleteComponent]
})
export class ChipsAutocompleteModule { }
