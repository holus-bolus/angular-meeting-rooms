import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalMultipleSelectComponent } from './portal-multiple-select.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchListModule } from '@andkit/components/other/search-list/search-list.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [PortalMultipleSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    SearchListModule,
    SafeHtmlModule,
  ],
  exports: [PortalMultipleSelectComponent]
})
export class PortalMultipleSelectModule { }
