import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { SettingsMultiselectComponent } from '@andkit/components/other/settings-multiselect/settings-multiselect.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [SettingsMultiselectComponent],
  imports: [
    CommonModule,
    OuterClickModule,
    MatSelectModule,
    ReactiveFormsModule,
    SafeHtmlModule
  ],
  exports: [SettingsMultiselectComponent],
})
export class SettingsMultiselectModule { }
