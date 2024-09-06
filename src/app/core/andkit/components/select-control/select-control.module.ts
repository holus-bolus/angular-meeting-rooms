import { ScrollModule } from './../../../../directives/scroll/scroll.module';
import { MaterialInfoButtonModule } from './../buttons/material-info-btn/material-info-button.module';
import { SafeHtmlModule } from './../../../../pipes/safe-html/safe-html.module';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectControlComponent } from './select-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectControlComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SafeHtmlModule,
    MaterialInfoButtonModule,
    ScrollModule
  ],
  exports: [
    SelectControlComponent
  ]
})
export class SelectControlModule { }
