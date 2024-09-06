import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { MaterialInfoButtonModule } from '@andkit/components/buttons/material-info-btn/material-info-button.module';
import { ScrollModule } from '@directives/scroll/scroll.module';
import { SelectNewComponent } from './select-new.component';

@NgModule({
  declarations: [SelectNewComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SafeHtmlModule,
    MaterialInfoButtonModule,
    ScrollModule
  ],
  exports: [SelectNewComponent]
})
export class SelectNewModule { }
