import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxRowsPipe } from './max-rows.pipe';

@NgModule({
  declarations: [MaxRowsPipe],
  imports: [
    CommonModule
  ],
  exports: [MaxRowsPipe]
})
export class MaxRowsModule { }
