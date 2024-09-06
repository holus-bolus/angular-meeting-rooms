import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalTitleInputComponent } from './portal-title-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PortalTitleInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PortalTitleInputComponent]
})
export class PortalTitleInputModule { }
