import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompletePortalComponent } from './autocomplete-portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [AutocompletePortalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    SafeHtmlModule
  ],
  exports: [AutocompletePortalComponent]
})
export class AutocompletePortalModule { }
