import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OvertimeTypesComponent } from '@pages/overs-test/overtime-types/overtime-types.component';
import { AndkitModule } from '@andkit/andkit.module';
import { SafeHtmlModule } from '@pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [
    OvertimeTypesComponent,
  ],
  imports: [
    CommonModule,
    AndkitModule,
    SafeHtmlModule,
  ],
  exports: [
    OvertimeTypesComponent,
  ],
})
export class OvertimeTypesModule { }
