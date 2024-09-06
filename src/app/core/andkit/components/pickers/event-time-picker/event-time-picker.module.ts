import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTimePickerComponent } from './event-time-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PortalSelectModule } from '@andkit/components/selects/portal-select/portal-select.module';
import { PortalInputModule } from '@andkit/components/inputs/portal-input/portal-input.module';

@NgModule({
  declarations: [EventTimePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortalInputModule,
    PortalSelectModule
  ],
  exports: [EventTimePickerComponent]
})
export class EventTimePickerModule { }
