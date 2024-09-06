import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalMultiselectComponent } from './portal-multiselect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [PortalMultiselectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    OuterClickModule,
    SafeHtmlModule,
  ],
  exports: [PortalMultiselectComponent]
})
export class PortalMultiselectModule { }
