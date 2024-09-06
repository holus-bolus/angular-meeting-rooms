import { NgModule } from '@angular/core';
import {
  SubmittedOvertimesTableComponent,
} from '@pages/overs-test/submitted-overtimes-table/submitted-overtimes-table.component';
import { CommonModule } from '@angular/common';
import { AndkitModule } from '@andkit/andkit.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  SubmittedOvertimesSearchModule,
} from '@pages/overs-test/submitted-overtimes-search/submitted-overtimes-search.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    SubmittedOvertimesTableComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SubmittedOvertimesSearchModule,
    ReactiveFormsModule,
    SafeHtmlModule,
    MatRadioModule,
  ],
  exports: [
    SubmittedOvertimesTableComponent,
  ],
})
export class SubmittedOvertimesTableModule {
}
