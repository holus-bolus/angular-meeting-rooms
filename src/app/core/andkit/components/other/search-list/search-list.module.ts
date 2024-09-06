import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListComponent } from './search-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';

@NgModule({
  declarations: [SearchListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    OuterClickModule,
  ],
  exports: [SearchListComponent],
})
export class SearchListModule { }
