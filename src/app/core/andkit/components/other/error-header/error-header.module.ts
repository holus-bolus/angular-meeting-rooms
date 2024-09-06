import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHeaderComponent } from './error-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ErrorHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ErrorHeaderComponent],
})
export class ErrorHeaderModule { }
