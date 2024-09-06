import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownButtonComponent } from '@andkit/components/buttons/dropdown-button/dropdown-button.component';

@NgModule({
  declarations: [DropdownButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [DropdownButtonComponent],
})
export class DropdownButtonModule { }
