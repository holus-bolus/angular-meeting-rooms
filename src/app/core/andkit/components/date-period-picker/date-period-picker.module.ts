import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatDividerModule } from '@angular/material/divider';
import { DatePeriodPickerComponent } from './date-period-picker.component';

@NgModule({
  declarations: [
    DatePeriodPickerComponent,
  ],
  imports: [
    OverlayModule,
    PortalModule,
    MatDividerModule,
    CommonModule,
    OverlayModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SafeHtmlModule,
    MatIconModule,
  ],
  exports: [
    DatePeriodPickerComponent,
  ],
})
export class DatePeriodPickerModule { }
