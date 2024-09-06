import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalInputComponent } from './portal-input.component';
import { NumberOnlyModule } from '@directives/number-only/number-only.module';
import { TimesModule } from '@directives/times/times.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';
import { InputMaskModule } from '@directives/input-mask/input-mask.module';

@NgModule({
  declarations: [PortalInputComponent],
  imports: [
    CommonModule,
    NumberOnlyModule,
    TimesModule,
    SafeHtmlModule,
    InputMaskModule
  ],
  exports: [PortalInputComponent]
})
export class PortalInputModule { }
