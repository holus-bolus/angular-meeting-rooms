import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloseScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { AutoCompleteComponent } from './autocomplete.component';

export function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close();
}

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
    RouterModule
  ],
  exports: [AutoCompleteComponent],
  declarations: [AutoCompleteComponent],
  providers: [
    { provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY, deps: [Overlay], useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY, }
  ]
})

export class AutoCompleteModule { }
