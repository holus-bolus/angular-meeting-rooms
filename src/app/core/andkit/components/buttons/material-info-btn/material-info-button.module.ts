import { NgModule } from '@angular/core';
import { MaterialInfoBtnComponent } from '@andkit/components/buttons/material-info-btn/material-info-btn.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MaterialInfoBtnComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MaterialInfoBtnComponent]
})
export class MaterialInfoButtonModule { }
