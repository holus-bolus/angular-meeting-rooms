import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndkitInputSelectComponent } from '@andkit/components/other/andkit-input-select/andkit-input-select.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    SafeHtmlModule,
  ],
  declarations: [AndkitInputSelectComponent],
  exports: [AndkitInputSelectComponent]
})
export class AndkitInputModule {
}
