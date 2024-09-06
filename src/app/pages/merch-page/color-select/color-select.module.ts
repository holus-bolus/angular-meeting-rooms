import { NgModule } from '@angular/core';
import { ColorSelectComponent } from '@pages/merch-page/color-select/color-select.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ColorSelectComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    ColorSelectComponent,
  ]
})
export class ColorSelectModule {}
