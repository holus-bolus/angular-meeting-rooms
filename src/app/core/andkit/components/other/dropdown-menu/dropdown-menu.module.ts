import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownItemComponent } from './dropdown-item/dropdown-item.component';
import { OuterClickModule } from '@directives/outer-click/outer-click.module';

@NgModule({
  declarations: [DropdownMenuComponent, DropdownItemComponent],
  imports: [
    CommonModule,
    OuterClickModule
  ],
  exports: [DropdownMenuComponent, DropdownItemComponent],
})
export class DropdownMenuModule { }
