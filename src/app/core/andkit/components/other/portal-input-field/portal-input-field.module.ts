import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalInputFieldComponent } from './portal-input-field.component';
import { AutofocusModule } from '@directives/autofocus/autofocus.module';

@NgModule({
  declarations: [PortalInputFieldComponent],
  imports: [
    CommonModule,
    AutofocusModule,
  ],
  exports: [PortalInputFieldComponent]
})
export class PortalInputFieldModule {
}
