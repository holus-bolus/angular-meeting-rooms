import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { SearchAutocompleteComponent } from './search-autocomplete.component';
import { MaterialInfoButtonModule } from '@andkit/components/buttons/material-info-btn/material-info-button.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    SafeHtmlModule,
    MaterialInfoButtonModule
  ],
  exports: [SearchAutocompleteComponent],
  declarations: [SearchAutocompleteComponent],
  providers: []
})

export class AutoCompleteModule { }
