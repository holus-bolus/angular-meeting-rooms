import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMenuComponent } from './edit-menu.component';
import { RouterModule } from '@angular/router';
import { DropdownButtonModule } from '@andkit/components/buttons/dropdown-button/dropdown-button.module';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';

@NgModule({
  declarations: [EditMenuComponent],
  imports: [
    CommonModule,
    DropdownButtonModule,
    OuterClickModule,
    RouterModule
  ],
  exports: [EditMenuComponent]
})
export class EditMenuModule { }
