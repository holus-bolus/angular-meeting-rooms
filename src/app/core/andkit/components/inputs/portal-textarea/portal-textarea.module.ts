import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalTextareaComponent } from './portal-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [PortalTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [PortalTextareaComponent]
})
export class PortalTextareaModule { }
