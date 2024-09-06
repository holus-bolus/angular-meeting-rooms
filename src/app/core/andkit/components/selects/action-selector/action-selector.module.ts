import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionSelectorComponent } from './action-selector/action-selector.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ActionSelectorComponent],
  exports: [
    ActionSelectorComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ActionSelectorModule {
}
